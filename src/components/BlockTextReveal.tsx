// Block Text Reveal — Originkit
"use client"

import * as React from "react"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

/**
 * Block Text Reveal — text uncovered by coloured blocks.
 *
 * Ported from the Originkit/Framer component. Two additions for this site,
 * both required to use it on the hero (see the hero for why):
 *  - `as`: the tag is a constant "p" upstream; the hero needs an <h1> or the
 *    homepage loses its only top-level heading.
 *  - `start`: the drive is viewport-triggered and the hero sits above the
 *    trigger line, so it fires on mount — which is underneath the intro
 *    splash. Holding it until the splash clears is the difference between the
 *    animation being seen and not.
 */

type RevealType = "blocks" | "lines"
type Direction = "left" | "right" | "center"
type TriggerLine = "top" | "center" | "bottom"
type Align = "left" | "center" | "right"

const HTML_TAG = "p"
/** Blocks: how much of the sweep is covered at once, in lines. */
const BAND_LINES = 5
const COVER = 42
const STAGGER = 7
const VIEWPORT: TriggerLine = "center"

const normalizeReveal = (v: unknown): RevealType =>
    v === "lines" ? "lines" : "blocks"
const normalizeDirection = (v: unknown): Direction =>
    v === "right" || v === "rtl"
        ? "right"
        : v === "center"
          ? "center"
          : "left"

type FontValue = React.CSSProperties & { variant?: string }

interface TweenTransition {
    type?: "tween"
    duration?: number
    ease?: string | number[]
}
interface SpringTransition {
    type: "spring"
    duration?: number
    bounce?: number
    stiffness?: number
    damping?: number
    mass?: number
}
type TransitionValue = TweenTransition | SpringTransition

interface HighlightItem {
    text: string
    block: boolean
    rounded: number
    textColor: string
    color: string
}

interface Props {
    text: string
    font?: FontValue
    align?: Align
    textColor?: string
    blockColor?: string
    revealType?: RevealType
    direction?: Direction
    rounded?: number
    speed?: number
    transition?: TransitionValue
    highlight?: HighlightItem[]
    /** Element to render. Upstream this is the constant "p". */
    as?: React.ElementType
    /** Hold the reveal until this is true. */
    start?: boolean
    /** Scroll line that arms the reveal. Upstream this is a fixed "center",
     *  which never fires for a block sitting low in a tall hero. */
    trigger?: TriggerLine
    className?: string
    style?: React.CSSProperties
}

const PER_LINE_SPAN = 0.85
const BASE_DURATION_MS = 2200
const SPEED_DIVISOR = 25
const FRONT_SOFT = 0.45
const BLOCK_BLEED_X = 0.02
const BLOCK_TOP_LIFT = 0.05
const BLOCK_HEIGHT = 1.1
const LINE_PAD_X = 2
const HIGHLIGHT_V_EXTEND = 0.06
// Upstream 0.16em, which is wider than a word space at hero sizes — the
// highlight block then swallows the gaps and the line reads "MaximizeTechROI".
const HIGHLIGHT_H_EXTEND = 0.05

const MIN_WIDTH = 240
const MIN_HEIGHT = 80

const DEFAULT_TEXT =
    "Create meaningful digital experiences where every line unfolds with purpose, clarity, and a touch of motion."

const DEFAULT_FONT: FontValue = {
    variant: "Bold",
    fontSize: "60px",
    textAlign: "left",
    fontFamily: "Inter",
    fontWeight: 700,
    lineHeight: "1.3em",
    letterSpacing: "-0.03em",
}

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

const smootherstep = (t: number): number => {
    const x = clamp01(t)
    return x * x * x * (x * (x * 6 - 15) + 10)
}

const easeOutCubic = (t: number): number => {
    const x = clamp01(t)
    return 1 - Math.pow(1 - x, 3)
}

const px = (n: number): number =>
    Number.isFinite(n) ? Math.round(n * 1e3) / 1e3 : 0

const radiusPx = (w: number, h: number, pct: number): number =>
    (Math.max(0, Math.min(100, pct)) / 100) * (Math.min(w, h) / 2)

const DEFAULT_HIGHLIGHT_TRANSITION: TweenTransition = {
    type: "tween",
    duration: 0.4,
    ease: "easeOut",
}

const highlightMsFrom = (t: TransitionValue | undefined): number =>
    Math.max(0, (t?.duration ?? DEFAULT_HIGHLIGHT_TRANSITION.duration ?? 0.4) * 1000)

interface WordToken {
    text: string
    breaks: number
}

function parseWords(text: string): WordToken[] {
    const out: WordToken[] = []
    const lines = String(text ?? "").split(/\r?\n/)
    for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split(/\s+/)
        for (const part of parts) if (part) out.push({ text: part, breaks: 0 })
        if (i < lines.length - 1 && out.length > 0) out[out.length - 1].breaks += 1
    }
    return out
}

interface WordRect {
    x: number
    y: number
    w: number
    yText: number
    hText: number
    hLine: number
    line: number
}

interface LineRect {
    line: number
    minX: number
    maxX: number
    yText: number
    hText: number
    topBox: number
    hLine: number
}

interface Measurement {
    rects: WordRect[]
    lines: LineRect[]
    lineCount: number
    sig: string
}

interface LiveParams {
    revealType: RevealType
    direction: Direction
    bandLines: number
    cover: number
    stagger: number
    speed: number
    viewport: TriggerLine
    highlightMs: number
}

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function BlockTextReveal({
    text = DEFAULT_TEXT,
    font = DEFAULT_FONT,
    align = "left",
    textColor = "#FFFFFF",
    blockColor = "#FFFFFF",
    revealType: revealTypeProp = "lines",
    direction: directionProp = "left",
    rounded = 0,
    speed = 50,
    transition,
    highlight = [],
    as,
    start = true,
    trigger,
    className,
    style,
}: Props) {
    const revealType = normalizeReveal(revealTypeProp)
    const direction = normalizeDirection(directionProp)
    const highlightMs = highlightMsFrom(transition)
    const isStatic = false

    const bandLines = BAND_LINES
    const cover = COVER
    const stagger = STAGGER
    const viewport = VIEWPORT

    const isLines = revealType === "lines"
    const splitLines = isLines && direction === "center"

    const hostRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLElement | null>(null)
    const wordElsRef = useRef<(HTMLElement | null)[]>([])
    const strutElsRef = useRef<(HTMLElement | null)[]>([])
    const blockElsRef = useRef<(HTMLElement | null)[]>([])
    const lineBlockElsRef = useRef<(HTMLElement | null)[]>([])
    const lineBlockBElsRef = useRef<(HTMLElement | null)[]>([])
    const highlightElsRef = useRef<(HTMLElement | null)[]>([])

    const [measurement, setMeasurement] = useState<Measurement | null>(null)

    const measureRef = useRef<Measurement | null>(null)
    measureRef.current = measurement

    const paramsRef = useRef<LiveParams>({
        revealType, direction, bandLines, cover, stagger, speed, viewport, highlightMs,
    })
    paramsRef.current = {
        revealType, direction, bandLines, cover, stagger, speed, viewport, highlightMs,
    }

    const progressRef = useRef(isStatic ? 1 : 0)

    const words = useMemo(() => parseWords(text), [text])

    const fontKey = JSON.stringify(font ?? {})
    const highlightKey = JSON.stringify(highlight ?? [])

    const highlightItems = useMemo<HighlightItem[]>(() => {
        const raw = (highlight ?? []) as HighlightItem[]
        return raw.filter(
            (item) => item && typeof item.text === "string" && item.text.trim()
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightKey])

    const highlightMap = useMemo(() => {
        const map = new Map<number, HighlightItem>()
        if (highlightItems.length === 0 || words.length === 0) return map
        const hay = words.map((w) => w.text)
        for (const item of highlightItems) {
            const tokens = item.text.trim().split(/\s+/).filter(Boolean)
            if (tokens.length === 0) continue
            for (let i = 0; i <= hay.length - tokens.length; i++) {
                let ok = true
                for (let j = 0; j < tokens.length; j++) {
                    if (hay[i + j] !== tokens[j]) { ok = false; break }
                }
                if (ok) for (let j = 0; j < tokens.length; j++) map.set(i + j, item)
            }
        }
        return map
    }, [highlightItems, words])

    const wordsKeyRef = useRef<WordToken[] | null>(null)
    if (wordsKeyRef.current !== words) {
        wordsKeyRef.current = words
        wordElsRef.current = []
        strutElsRef.current = []
        blockElsRef.current = []
        highlightElsRef.current = []
        lineBlockElsRef.current = []
        lineBlockBElsRef.current = []
    }

    const measure = () => {
        const host = textRef.current
        if (!host || typeof window === "undefined") return
        const els = wordElsRef.current
        if (els.length === 0) return

        for (let i = 0; i < highlightElsRef.current.length; i++) {
            const el = highlightElsRef.current[i]
            const item = highlightMap.get(i)
            if (!el || !item) continue
            el.style.borderRadius = `${px(
                radiusPx(el.offsetWidth, el.offsetHeight, item.rounded ?? 0)
            )}px`
        }

        const baseCS = window.getComputedStyle(host)
        const rects: WordRect[] = []
        let lineIdx = -1
        let lineBaseline = Number.NaN

        for (let i = 0; i < els.length; i++) {
            const el = els[i]
            if (!el) continue
            const strut = strutElsRef.current[i]
            const baseline = el.offsetTop + (strut ? strut.offsetTop : 0)
            if (!Number.isFinite(lineBaseline) || baseline - lineBaseline > 0.5) {
                lineIdx += 1
                lineBaseline = baseline
            }

            const cs = highlightMap.has(i) ? window.getComputedStyle(el) : baseCS
            const fontSizePx = parseFloat(cs.fontSize)
            const lineHeightPx = parseFloat(cs.lineHeight)
            const safeFont =
                Number.isFinite(fontSizePx) && fontSizePx > 0 ? fontSizePx : el.offsetHeight
            const safeLine =
                Number.isFinite(lineHeightPx) && lineHeightPx > 0 ? lineHeightPx : el.offsetHeight

            rects.push({
                x: el.offsetLeft,
                y: el.offsetTop,
                w: el.offsetWidth,
                yText: el.offsetTop + Math.max(0, (safeLine - safeFont) / 2),
                hText: safeFont,
                hLine: safeLine,
                line: Math.max(0, lineIdx),
            })
        }

        if (rects.length === 0) return

        const lineCount = Math.max(1, lineIdx + 1)
        const lines: LineRect[] = []
        for (let li = 0; li < lineCount; li++) {
            let minX = Number.POSITIVE_INFINITY
            let maxX = Number.NEGATIVE_INFINITY
            let top = Number.POSITIVE_INFINITY
            let bottom = Number.NEGATIVE_INFINITY
            let topBox = Number.POSITIVE_INFINITY
            let hLine = 0
            let has = false
            for (const r of rects) {
                if (r.line !== li) continue
                has = true
                minX = Math.min(minX, r.x)
                maxX = Math.max(maxX, r.x + r.w)
                top = Math.min(top, r.yText)
                bottom = Math.max(bottom, r.yText + r.hText)
                topBox = Math.min(topBox, r.y)
                hLine = Math.max(hLine, r.hLine)
            }
            if (!has || !Number.isFinite(minX) || !Number.isFinite(maxX)) continue
            lines.push({
                line: li, minX, maxX, yText: top,
                hText: Math.max(1, bottom - top),
                topBox, hLine: Math.max(1, hLine),
            })
        }

        const sig = rects
            .map((r) =>
                `${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.yText)},${Math.round(r.w)},${Math.round(r.hText)},${Math.round(r.hLine)},${r.line}`
            )
            .join("|")
        if (measureRef.current?.sig === sig) return
        setMeasurement({ rects, lines, lineCount, sig })
    }

    const measureFnRef = useRef(measure)
    measureFnRef.current = measure

    useIsomorphicLayoutEffect(() => {
        measureFnRef.current()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words, align, fontKey, highlightKey, revealType])

    useEffect(() => {
        const el = textRef.current
        if (!el || typeof ResizeObserver === "undefined") return
        let raf = 0
        const observer = new ResizeObserver(() => {
            if (raf) cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => { raf = 0; measureFnRef.current() })
        })
        observer.observe(el)
        return () => { observer.disconnect(); if (raf) cancelAnimationFrame(raf) }
    }, [])

    useEffect(() => {
        const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts
        if (!fonts?.ready) return
        let alive = true
        fonts.ready.then(() => { if (alive) measureFnRef.current() })
        return () => { alive = false }
    }, [fontKey])

    const applyProgress = (p: number) => {
        const m = measureRef.current
        const cfg = paramsRef.current
        if (!m) return
        const { rects, lines, lineCount } = m

        if (cfg.revealType === "lines") {
            const delayStep = PER_LINE_SPAN * (Math.max(0, cfg.stagger) / 100)
            const timeline = PER_LINE_SPAN + delayStep * Math.max(0, lineCount - 1)
            const enterEnd = Math.min(0.98, Math.max(0.02, cfg.cover / 100))
            const exitDuration = Math.max(1e-5, 1 - enterEnd)
            const factor = Math.max(0.1, cfg.speed / SPEED_DIVISOR)
            const base = BASE_DURATION_MS / factor
            const highlightSpan = Math.max(1e-4, cfg.highlightMs / base)
            const split = cfg.direction === "center"
            const leadFromRight = split || cfg.direction === "right"

            const paint = (el: HTMLElement | null, origin: string, hide: boolean, sx: number) => {
                if (!el) return
                if (hide) { el.style.visibility = "hidden"; return }
                el.style.visibility = "visible"
                el.style.transformOrigin = origin
                el.style.transform = `scaleX(${px(sx)})`
            }

            for (const lr of lines) {
                const a = lineBlockElsRef.current[lr.line]
                const b = lineBlockBElsRef.current[lr.line]
                if (!a) continue
                const local = clamp01(
                    (p * timeline - lr.line * delayStep) / Math.max(1e-4, PER_LINE_SPAN)
                )
                const boxWidth = lr.maxX - lr.minX + LINE_PAD_X * 2
                const panelWidth = split ? boxWidth / 2 : boxWidth
                const entering = local < enterEnd
                const sx = entering
                    ? easeOutCubic(local / Math.max(1e-5, enterEnd))
                    : Math.max(0, 1 - easeOutCubic((local - enterEnd) / exitDuration))
                const hide = panelWidth * sx <= 1
                paint(a, entering === leadFromRight ? "100% 50%" : "0% 50%", hide, sx)
                paint(b, entering ? "0% 50%" : "100% 50%", hide, sx)
            }

            for (let i = 0; i < rects.length; i++) {
                const el = wordElsRef.current[i]
                const local = clamp01(
                    (p * timeline - rects[i].line * delayStep) / Math.max(1e-4, PER_LINE_SPAN)
                )
                const revealed = local >= enterEnd
                if (el) el.style.opacity = revealed ? "1" : "0"

                const hEl = highlightElsRef.current[i]
                if (hEl) {
                    const hProgress = revealed
                        ? easeOutCubic(clamp01((local - enterEnd) / highlightSpan))
                        : 0
                    hEl.style.opacity = String(px(hProgress))
                }
            }
            return
        }

        const band = Math.max(1, Math.min(Math.round(cfg.bandLines), lineCount))
        const soft = Math.max(0.35, band * FRONT_SOFT)
        const front = p * (lineCount + band + soft)
        const dir = cfg.direction
        const factor = Math.max(0.1, cfg.speed / SPEED_DIVISOR)
        const base = BASE_DURATION_MS / factor
        const highlightSoft = Math.max(1e-4, (cfg.highlightMs * (lineCount + band + soft)) / base)

        for (let i = 0; i < rects.length; i++) {
            const r = rects[i]
            const range = lines[r.line]
            let u = 0
            if (range) {
                const span = Math.max(1, range.maxX - range.minX)
                const fx = clamp01((r.x + r.w / 2 - range.minX) / span)
                u = dir === "right" ? 1 - fx : dir === "center" ? Math.abs(fx - 0.5) * 2 : fx
            }
            const pos = r.line + u
            const lead = smootherstep((front - pos) / soft)
            const trail = smootherstep((front - band - pos) / soft)

            const blockEl = blockElsRef.current[i]
            if (blockEl) {
                const v = Math.max(0, lead - trail)
                blockEl.style.opacity = String(px(v))
                blockEl.style.transform = `scaleY(${px(0.94 + 0.06 * v)})`
            }

            const el = wordElsRef.current[i]
            if (el) el.style.opacity = String(px(trail))

            const hEl = highlightElsRef.current[i]
            if (hEl) {
                const hTrail = smootherstep((front - band - pos) / highlightSoft)
                hEl.style.opacity = String(px(hTrail))
            }
        }
    }

    const applyRef = useRef(applyProgress)
    applyRef.current = applyProgress

    const setProgress = (p: number) => {
        progressRef.current = p
        applyRef.current(p)
    }
    const setProgressRef = useRef(setProgress)
    setProgressRef.current = setProgress

    useIsomorphicLayoutEffect(() => {
        applyRef.current(progressRef.current)
    })

    const durationMs = (): number => {
        const cfg = paramsRef.current
        const factor = Math.max(0.1, cfg.speed / SPEED_DIVISOR)
        const base = BASE_DURATION_MS / factor
        if (cfg.revealType !== "lines") return base
        const lineCount = measureRef.current?.lineCount ?? 1
        const delayStep = PER_LINE_SPAN * (Math.max(0, cfg.stagger) / 100)
        const timeline = PER_LINE_SPAN + delayStep * Math.max(0, lineCount - 1)
        return base * (timeline / PER_LINE_SPAN)
    }
    const durationRef = useRef(durationMs)
    durationRef.current = durationMs

    const lineCount = measurement?.lineCount ?? 1

    useEffect(() => {
        if (isStatic) return
        if (typeof window === "undefined") return
        // Held until the caller says go (the hero waits for the intro splash).
        if (!start) { setProgressRef.current(0); return }

        let raf = 0
        let armed = true
        setProgressRef.current(0)

        const play = () => {
            const duration = Math.max(1, durationRef.current())
            const t0 = performance.now()
            const tick = (now: number) => {
                const t = clamp01((now - t0) / duration)
                setProgressRef.current(t)
                if (t < 1) raf = requestAnimationFrame(tick)
                else raf = 0
            }
            raf = requestAnimationFrame(tick)
        }

        const check = () => {
            if (!armed) return
            const el = hostRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const vh = window.innerHeight || 0
            const line = trigger ?? viewport
            const triggerY = line === "top" ? 0 : line === "bottom" ? vh : vh / 2
            if (rect.top <= triggerY) {
                armed = false
                window.removeEventListener("scroll", check)
                window.removeEventListener("resize", check)
                play()
            }
        }

        check()
        window.addEventListener("scroll", check, { passive: true })
        window.addEventListener("resize", check)
        return () => {
            armed = false
            window.removeEventListener("scroll", check)
            window.removeEventListener("resize", check)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [isStatic, revealType, viewport, trigger, speed, stagger, lineCount, start])

    const Tag = (as ?? HTML_TAG) as React.ElementType

    return (
        <div
            ref={hostRef}
            style={{
                minWidth: MIN_WIDTH,
                minHeight: MIN_HEIGHT,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "visible",
                cursor: "default",
                ...style,
            }}
        >
            <Tag
                ref={textRef as React.Ref<HTMLElement>}
                className={className}
                style={{
                    margin: 0,
                    width: "100%",
                    color: textColor,
                    textAlign: align,
                    position: "relative",
                    ...font,
                }}
            >
                {isLines && measurement && (
                    <span aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}>
                        {measurement.lines.map((lr) => {
                            const vExtend = lr.hText * HIGHLIGHT_V_EXTEND
                            return (
                                <span
                                    key={`line-${lr.line}`}
                                    style={{
                                        position: "absolute",
                                        left: px(lr.minX - LINE_PAD_X),
                                        top: px(lr.topBox - vExtend),
                                        width: px(lr.maxX - lr.minX + LINE_PAD_X * 2),
                                        height: px(lr.hLine + vExtend * 2),
                                    }}
                                >
                                    <span
                                        ref={(el) => { lineBlockElsRef.current[lr.line] = el }}
                                        style={{
                                            position: "absolute", top: 0, bottom: 0, left: 0,
                                            width: splitLines ? "calc(50% + 0.5px)" : "100%",
                                            background: blockColor,
                                            borderRadius: 0,
                                            transition: "none",
                                            willChange: "transform",
                                            backfaceVisibility: "hidden",
                                        }}
                                    />
                                    {splitLines && (
                                        <span
                                            ref={(el) => { lineBlockBElsRef.current[lr.line] = el }}
                                            style={{
                                                position: "absolute", top: 0, bottom: 0, left: "50%", right: 0,
                                                background: blockColor,
                                                borderRadius: 0,
                                                transition: "none",
                                                willChange: "transform",
                                                backfaceVisibility: "hidden",
                                            }}
                                        />
                                    )}
                                </span>
                            )
                        })}
                    </span>
                )}

                {!isLines && measurement && (
                    <span aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
                        {measurement.rects.map((r, i) => {
                            const w = r.w * (1 + BLOCK_BLEED_X)
                            const h = r.hText * BLOCK_HEIGHT
                            return (
                                <span
                                    key={`block-${i}`}
                                    ref={(el) => { blockElsRef.current[i] = el }}
                                    style={{
                                        position: "absolute",
                                        left: px(r.x - r.w * (BLOCK_BLEED_X / 2)),
                                        top: px(r.yText - r.hText * BLOCK_TOP_LIFT),
                                        width: px(w),
                                        height: px(h),
                                        background: blockColor,
                                        borderRadius: px(radiusPx(w, h, rounded)),
                                        transformOrigin: "50% 50%",
                                        transition: "none",
                                        willChange: "opacity, transform",
                                    }}
                                />
                            )
                        })}
                    </span>
                )}

                {words.map((word, i) => {
                    const item = highlightMap.get(i)
                    const breaks: React.ReactNode[] = []
                    for (let b = 0; b < word.breaks; b++) breaks.push(<br key={`br-${i}-${b}`} />)
                    return (
                        <React.Fragment key={`word-${i}`}>
                            <span
                                ref={(el) => { wordElsRef.current[i] = el }}
                                style={{
                                    display: "inline-block",
                                    verticalAlign: "baseline",
                                    lineHeight: "inherit",
                                    position: "relative",
                                    zIndex: item ? 4 : 1,
                                    color: item?.textColor ?? textColor,
                                    transition: "none",
                                }}
                            >
                                <span
                                    ref={(el) => { strutElsRef.current[i] = el }}
                                    aria-hidden="true"
                                    style={{ display: "inline-block", width: 0, height: 0 }}
                                />
                                {item?.block && (
                                    <span
                                        aria-hidden="true"
                                        ref={(el) => { highlightElsRef.current[i] = el }}
                                        style={{
                                            position: "absolute",
                                            left: `-${HIGHLIGHT_H_EXTEND}em`,
                                            right: `-${HIGHLIGHT_H_EXTEND}em`,
                                            top: `-${HIGHLIGHT_V_EXTEND}em`,
                                            bottom: `-${HIGHLIGHT_V_EXTEND}em`,
                                            background: item.color,
                                            zIndex: -1,
                                            pointerEvents: "none",
                                            transition: "none",
                                            opacity: 0,
                                        }}
                                    />
                                )}
                                {word.text}
                            </span>
                            {/* A real space, not just a CSS margin: without a
                                whitespace text node the words concatenate for
                                screen readers and search engines. */}
                            {" "}
                            {breaks}
                        </React.Fragment>
                    )
                })}
            </Tag>
        </div>
    )
}

BlockTextReveal.displayName = "Block Text Reveal"
