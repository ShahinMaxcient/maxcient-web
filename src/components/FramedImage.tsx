import Image from "next/image";

/** Editorial image frame: lavender glow behind, thin ring, soft shadow. */
export default function FramedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <div
        className="absolute -inset-4 pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 50% 45%, rgba(167,139,250,0.28), transparent 72%)", filter: "blur(6px)" }}
        aria-hidden
      />
      <div
        className="relative overflow-hidden aspect-[4/3] rounded-2xl ring-1 ring-[var(--border-strong)]"
        style={{ boxShadow: "0 30px 60px -32px rgba(20,16,40,0.4)" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </div>
  );
}
