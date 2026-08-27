import Image from "next/image";

/**
 * Editorial image frame: thin ring, soft shadow.
 *
 * No glow behind the picture. A blurred violet radial bleeding past the frame
 * is the one thing on a light page that reads unmistakably as ink soaking into
 * paper, and it was doing that on every service, technology and industry page.
 * The ring and the shadow already seat the image.
 */
export default function FramedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <div
        className="relative overflow-hidden aspect-[4/3] rounded-2xl ring-1 ring-[var(--border-strong)]"
        style={{ boxShadow: "0 30px 60px -32px rgba(20,16,40,0.4)" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </div>
  );
}
