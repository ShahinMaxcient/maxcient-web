import Image from "next/image";

/**
 * The Maxcient "M" mark on its own (no wordmark), used as the accent before
 * section eyebrow labels in place of the old "//" prefix. Decorative, so it is
 * hidden from assistive tech.
 */
export default function BrandMark({ size = 13 }: { size?: number }) {
  return (
    <Image
      src="/maxcient-mark.png"
      alt=""
      aria-hidden
      width={Math.round((size * 38) / 30)}
      height={size}
      style={{
        display: "inline-block",
        width: "auto",
        height: size,
        verticalAlign: "-0.18em",
        marginRight: "0.6em",
      }}
    />
  );
}
