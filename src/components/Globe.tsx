// Globe — Originkit (adapted)
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
    Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshBasicMaterial,
    Color, Mesh, Group, InstancedMesh, Matrix4, Raycaster, Vector2,
    TubeGeometry, CatmullRomCurve3, Vector3, CanvasTexture,
    Sprite, SpriteMaterial,
} from "three";
import { geoEquirectangular, geoPath } from "d3-geo";

/**
 * Dotted rotating globe.
 *
 * Two changes from the upstream component, both needed to ship it:
 *  - Land geometry is served from our own /world-land.json instead of being
 *    fetched from raw.githubusercontent.com on every page load. GitHub raw is
 *    not a production CDN and a homepage should not depend on it.
 *  - The 110m dataset (74KB gzipped) replaces 50m (2.6MB). At this size the
 *    globe is drawn as dots off a land bitmap, so the extra detail is invisible.
 */

type Rgba = { r: number; g: number; b: number; a: number };

function parseColorToRgba(input: string): Rgba {
    if (!input || input.trim() === "") return { r: 0, g: 0, b: 0, a: 0 };
    const str = input.trim();
    const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i);
    if (m) {
        return {
            r: Math.max(0, Math.min(255, parseFloat(m[1]))) / 255,
            g: Math.max(0, Math.min(255, parseFloat(m[2]))) / 255,
            b: Math.max(0, Math.min(255, parseFloat(m[3]))) / 255,
            a: m[4] !== undefined ? Math.max(0, Math.min(1, parseFloat(m[4]))) : 1,
        };
    }
    const hex = str.replace(/^#/, "");
    const px = (i: number, n = 2) => parseInt(hex.substr(i, n).padEnd(2, hex[i]), 16) / 255;
    if (hex.length === 8) return { r: px(0), g: px(2), b: px(4), a: px(6) };
    if (hex.length === 6) return { r: px(0), g: px(2), b: px(4), a: 1 };
    if (hex.length === 4) return { r: px(0, 1), g: px(1, 1), b: px(2, 1), a: px(3, 1) };
    if (hex.length === 3) return { r: px(0, 1), g: px(1, 1), b: px(2, 1), a: 1 };
    return { r: 0, g: 0, b: 0, a: 1 };
}

const mapLinear = (v: number, a: number, b: number, c: number, d: number) =>
    b === a ? c : c + ((v - a) / (b - a)) * (d - c);

const mapSpeedUiToInternal = (ui: number) =>
    ui === 0 ? 0 : mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0, 0.9);
const mapDensityUiToSpacing = (ui: number) =>
    mapLinear(Math.max(1, Math.min(10, ui)), 1, 10, 24, 8);
const mapScaleUiToMultiplier = (ui: number) =>
    mapLinear(Math.max(1, Math.min(20, ui)), 1, 20, 0.2, 2);
const mapDotSizeUiToMultiplier = (ui: number) =>
    mapLinear(Math.max(1, Math.min(10, ui)), 1, 10, 0.1, 0.5);
const mapMarkerDotSizeUiToMultiplier = (ui: number) =>
    mapLinear(Math.max(0, Math.min(100, ui)), 0, 100, 0.1, 2.5);
const normalizeSmoothing = (ui: number) => Math.max(0, Math.min(1, ui / 10));
const mapDragSpeedUiToSensitivity = (ui: number) =>
    mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0.001, 0.02);

function latLngToPosition(lat: number, lng: number) {
    const la = lat * (Math.PI / 180);
    const ln = lng * (Math.PI / 180);
    return { x: Math.cos(la) * Math.sin(ln), y: Math.sin(la), z: Math.cos(la) * Math.cos(ln) };
}

/**
 * Classic teardrop map pin, drawn once to a canvas and reused as a sprite
 * texture for every office. A sprite (rather than a mesh) keeps the pin facing
 * the camera and standing upright wherever it sits on the sphere, which is how
 * a map pin is expected to read — a mesh would tilt away with the surface.
 */
function makePinTexture(color: string): CanvasTexture {
    const S = 128;
    const canvas = document.createElement("canvas");
    canvas.width = S; canvas.height = S;
    const ctx = canvas.getContext("2d")!;

    const cx = S / 2, cy = S * 0.37, r = S * 0.235, tipY = S * 0.93;
    // Tangent angle from the tip to the head, so the shoulders meet the circle
    // cleanly instead of showing a crease.
    const a = Math.asin(Math.min(1, r / (tipY - cy)));

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI / 2 + a, Math.PI / 2 - a + Math.PI * 2, false);
    ctx.lineTo(cx, tipY);
    ctx.closePath();
    ctx.fill();

    // Punch the hole that makes it read as a pin rather than a balloon.
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
    ctx.fill();

    const tex = new CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
}

export interface Marker { lat: number; lng: number }
interface MarkerConfig { markers: Marker[]; color: string; size: number }
interface DotsConfig { color: string; size: number; density: number; allDots: boolean }

interface GlobeProps {
    speed?: number;
    smoothing?: number;
    dots?: DotsConfig;
    scale?: number;
    stopOnHover?: boolean;
    markerConfig?: MarkerConfig;
    direction?: "left" | "right";
    initialLatitude?: number;
    initialLongitude?: number;
    oceanColor?: string;
    graticuleColor?: string;
    showGrid?: boolean;
    dragSpeed?: number;
    gridWidth?: number;
    gridStep?: number;
    maxPixelRatio?: number;
    style?: CSSProperties;
}

export default function Globe({
    speed = 4,
    smoothing = 8,
    dots = { color: "#a78bfa", size: 4, density: 8, allDots: false },
    scale = 9,
    stopOnHover = true,
    markerConfig = { markers: [], color: "#ffffff", size: 26 },
    direction = "right",
    initialLatitude = 18,
    initialLongitude = -20,
    oceanColor = "rgba(0,0,0,0)",
    graticuleColor = "rgba(124,58,237,0.20)",
    showGrid = true,
    dragSpeed = 5,
    gridWidth = 1,
    gridStep = 15,
    maxPixelRatio = 2,
    style,
}: GlobeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    const dotColor = dots.color;
    const dotSize = dots.size;
    const density = dots.density;
    const allDots = dots.allDots;
    const smoothingN = normalizeSmoothing(smoothing);

    const baseRotationSpeed = mapSpeedUiToInternal(speed);
    const rotationSpeed = direction === "left" ? -baseRotationSpeed : baseRotationSpeed;
    const dotSpacing = mapDensityUiToSpacing(density);
    const dotSizeMultiplier = mapDotSizeUiToMultiplier(dotSize);
    const markerRadiusMultiplier = mapMarkerDotSizeUiToMultiplier(markerConfig.size);
    const scaleMultiplier = mapScaleUiToMultiplier(scale);

    const markersKey = JSON.stringify(markerConfig);
    const dotsKey = JSON.stringify(dots);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const w0 = container.clientWidth || 800;
        const h0 = container.clientHeight || 600;

        const scene = new Scene();
        const camera = new PerspectiveCamera(50, w0 / h0, 0.1, 1e3);
        const globeRadius = 1 * scaleMultiplier;
        camera.position.set(0, 0, 2.5 / scaleMultiplier);
        camera.lookAt(0, 0, 0);

        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w0, h0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
        renderer.outputColorSpace = "srgb";
        const canvas = renderer.domElement;
        Object.assign(canvas.style, {
            position: "absolute", inset: "0", width: "100%", height: "100%",
            display: "block", opacity: "0", transition: "opacity .6s ease",
        });
        container.appendChild(canvas);

        const oceanRgba = parseColorToRgba(oceanColor);
        const dotRgba = parseColorToRgba(dotColor);
        const graticuleRgba = parseColorToRgba(graticuleColor);

        const globeGroup = new Group();
        const initialLongitudeRad = (initialLongitude * Math.PI) / 180;
        const initialLatitudeRad = (initialLatitude * Math.PI) / 180;
        globeGroup.rotation.y = initialLongitudeRad;
        globeGroup.rotation.x = initialLatitudeRad;
        scene.add(globeGroup);

        const oceanMesh = new Mesh(
            new SphereGeometry(globeRadius, 48, 48),
            new MeshBasicMaterial({
                color: new Color(oceanRgba.r, oceanRgba.g, oceanRgba.b),
                transparent: true,
                opacity: oceanRgba.a,
            })
        );
        globeGroup.add(oceanMesh);

        if (showGrid && graticuleRgba.a > 0) {
            const gm = new MeshBasicMaterial({
                color: new Color(graticuleRgba.r, graticuleRgba.g, graticuleRgba.b),
                transparent: true, opacity: graticuleRgba.a,
            });
            const ring = (pts: Vector3[]) => {
                if (pts.length < 2) return;
                const tube = new TubeGeometry(new CatmullRomCurve3(pts), pts.length * 2, (gridWidth / 10) * 0.01, 6, false);
                globeGroup.add(new Mesh(tube, gm));
            };
            const latMax = Math.floor(75 / gridStep) * gridStep;
            for (let lat = -latMax; lat <= latMax; lat += gridStep) {
                const pts: Vector3[] = [];
                for (let i = 0; i <= 48; i++) {
                    const p = latLngToPosition(lat, (i / 48) * 360 - 180);
                    pts.push(new Vector3(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius));
                }
                ring(pts);
            }
            for (let lng = -180; lng < 180; lng += gridStep) {
                const pts: Vector3[] = [];
                for (let i = 0; i <= 48; i++) {
                    const p = latLngToPosition((i / 48) * 180 - 90, lng);
                    pts.push(new Vector3(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius));
                }
                ring(pts);
            }
        }

        let disposed = false;
        // Pins are faded out as they rotate to the far side — the sphere is
        // transparent, so without this they would show through from behind.
        const pinSprites: Sprite[] = [];
        let pinTexture: CanvasTexture | null = null;

        const loadWorldData = async () => {
            try {
                const res = await fetch("/world-land.json");
                if (!res.ok) throw new Error("land data " + res.status);
                const landFeatures = await res.json();
                if (disposed) return;

                const bw = 1024, bh = 512;
                const off = document.createElement("canvas");
                off.width = bw; off.height = bh;
                const ctx = off.getContext("2d", { willReadFrequently: true });
                if (!ctx) throw new Error("Canvas not supported");
                const projection = geoEquirectangular().fitSize([bw, bh], { type: "Sphere" } as never);
                const pathGenerator = geoPath().projection(projection).context(ctx);
                ctx.fillStyle = "#000"; ctx.fillRect(0, 0, bw, bh);
                ctx.fillStyle = "#fff"; ctx.beginPath();
                landFeatures.features.forEach((f: unknown) => pathGenerator(f as never));
                ctx.fill();
                const pixels = ctx.getImageData(0, 0, bw, bh).data;
                const isOnLand = (lng: number, lat: number) => {
                    const x = Math.round(((lng + 180) / 360) * bw) % bw;
                    const y = Math.max(0, Math.min(bh - 1, Math.round(((90 - lat) / 180) * bh)));
                    return pixels[(y * bw + x) * 4] > 128;
                };

                const coords: number[][] = [];
                const baseStep = dotSpacing * 0.08;
                for (let lat = -90; lat <= 90; lat += baseStep) {
                    const cosLat = Math.cos((Math.abs(lat) * Math.PI) / 180);
                    const lngStep = cosLat > 0.01 ? baseStep / Math.max(0.3, cosLat) : 360;
                    for (let lng = -180; lng < 180; lng += lngStep) {
                        if (allDots || isOnLand(lng, lat)) coords.push([lng, lat]);
                    }
                }

                if (coords.length > 0 && !disposed) {
                    const inst = new InstancedMesh(
                        new SphereGeometry(0.01 * dotSizeMultiplier, 4, 4),
                        new MeshBasicMaterial({
                            color: new Color(dotRgba.r, dotRgba.g, dotRgba.b),
                            transparent: dotRgba.a < 1, opacity: dotRgba.a,
                        }),
                        coords.length
                    );
                    const mtx = new Matrix4();
                    for (let i = 0; i < coords.length; i++) {
                        const p = latLngToPosition(coords[i][1], coords[i][0]);
                        mtx.makeScale(1, 1, 1);
                        mtx.setPosition(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius);
                        inst.setMatrixAt(i, mtx);
                    }
                    inst.instanceMatrix.needsUpdate = true;
                    globeGroup.add(inst);
                }

                if (markerConfig.markers?.length && !disposed) {
                    pinTexture = makePinTexture(markerConfig.color);
                    // Height relative to the globe, so the pins keep their
                    // proportions at any `scale`. `size` still tunes them.
                    const pinHeight = globeRadius * 0.17 * markerRadiusMultiplier;
                    for (const mk of markerConfig.markers) {
                        if (typeof mk?.lat !== "number" || typeof mk?.lng !== "number") continue;
                        const p = latLngToPosition(mk.lat, mk.lng);
                        const sprite = new Sprite(new SpriteMaterial({
                            map: pinTexture,
                            transparent: true,
                            // Drawn over the dot field rather than z-fighting with
                            // it; the far side is handled by the opacity fade.
                            depthTest: false,
                            depthWrite: false,
                        }));
                        // Anchor the tip (not the centre) to the coordinate.
                        sprite.center.set(0.5, 0.05);
                        sprite.scale.set(pinHeight, pinHeight, 1);
                        sprite.position.set(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius);
                        sprite.renderOrder = 10;
                        globeGroup.add(sprite);
                        pinSprites.push(sprite);
                    }
                }

                if (disposed) return;
                renderer.render(scene, camera);
                canvas.style.opacity = "1";
            } catch {
                setError("globe unavailable");
            }
        };

        const pinWorldPos = new Vector3();
        const rotation = { x: initialLongitudeRad, y: initialLatitudeRad };
        const targetRotation = { x: initialLongitudeRad, y: initialLatitudeRad };
        const velocity = { x: 0, y: 0 };
        let isDragging = false, isHovering = false;
        let lastX = 0, lastY = 0, raf: number | null = null;
        const lerpFactor = smoothingN === 0 ? 1 : mapLinear(smoothingN, 0, 1, 0.4, 0.03);
        const velocityDecay = mapLinear(smoothingN, 0, 1, 0.7, 0.96);

        const animate = () => {
            const threshold = 0.0001;
            if (!isDragging && rotationSpeed !== 0 && (!stopOnHover || !isHovering)) {
                targetRotation.x += rotationSpeed * 0.01;
            }
            if (!isDragging && smoothingN > 0) {
                if (Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold) {
                    targetRotation.x += velocity.x;
                    targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y + velocity.y));
                    velocity.x *= velocityDecay; velocity.y *= velocityDecay;
                } else { velocity.x = 0; velocity.y = 0; }
            }
            rotation.x += (targetRotation.x - rotation.x) * lerpFactor;
            rotation.y += (targetRotation.y - rotation.y) * lerpFactor;
            rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y));
            globeGroup.rotation.y = rotation.x;
            globeGroup.rotation.x = rotation.y;

            if (pinSprites.length > 0) {
                globeGroup.updateMatrixWorld();
                for (const s of pinSprites) {
                    s.getWorldPosition(pinWorldPos);
                    // +z faces the camera. Hold full opacity across the visible
                    // face, then fade out through the rim.
                    const nz = pinWorldPos.z / globeRadius;
                    const o = Math.max(0, Math.min(1, (nz + 0.15) / 0.35));
                    const mat = s.material as SpriteMaterial;
                    mat.opacity = o;
                    s.visible = o > 0.01;
                }
            }

            renderer.render(scene, camera);
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        const onDown = (e: MouseEvent) => {
            isDragging = true; velocity.x = 0; velocity.y = 0;
            lastX = e.clientX; lastY = e.clientY;
            const onMove = (me: MouseEvent) => {
                const s = mapDragSpeedUiToSensitivity(dragSpeed);
                const dx = me.clientX - lastX, dy = me.clientY - lastY;
                targetRotation.x += dx * s;
                targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y + dy * s));
                velocity.x = dx * s * 0.3; velocity.y = dy * s * 0.3;
                lastX = me.clientX; lastY = me.clientY;
            };
            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
                isDragging = false;
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        };
        canvas.addEventListener("mousedown", onDown);

        const raycaster = new Raycaster();
        const mouse = new Vector2();
        const onMouseMove = (e: MouseEvent) => {
            if (!stopOnHover) return;
            const r = canvas.getBoundingClientRect();
            mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
            mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            isHovering = raycaster.intersectObject(oceanMesh).length > 0;
        };
        canvas.addEventListener("mousemove", onMouseMove);

        const ro = new ResizeObserver(() => {
            const w = container.clientWidth || 800, h = container.clientHeight || 600;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderer.render(scene, camera);
        });
        ro.observe(container);

        loadWorldData();

        return () => {
            disposed = true;
            if (raf !== null) cancelAnimationFrame(raf);
            canvas.removeEventListener("mousedown", onDown);
            canvas.removeEventListener("mousemove", onMouseMove);
            ro.disconnect();
            for (const s of pinSprites) (s.material as SpriteMaterial).dispose();
            pinTexture?.dispose();
            renderer.dispose();
            if (canvas.parentNode === container) container.removeChild(canvas);
        };
    }, [
        speed, smoothing, dotsKey, scale, stopOnHover, markersKey, direction,
        initialLatitude, initialLongitude, oceanColor, graticuleColor, showGrid, dragSpeed,
        allDots, density, dotSize, dotColor, rotationSpeed, dotSpacing,
        dotSizeMultiplier, markerRadiusMultiplier, scaleMultiplier,
        markerConfig, dots, maxPixelRatio, gridWidth, gridStep,
    ]);

    // A failed globe must never leave a hole in the hero — it just goes away.
    if (error) return null;

    return <div ref={containerRef} style={{ ...style, position: "relative", width: "100%", height: "100%" }} />;
}
