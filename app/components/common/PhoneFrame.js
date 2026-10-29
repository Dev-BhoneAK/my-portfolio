import Image from "next/image";

// A raw phone screenshot in a bezel drawn in CSS. Radii are percentages so
// the corners scale with the phone; after the slash is the vertical radius,
// which accounts for the phone's tall shape.
export default function PhoneFrame({ src, alt, sizes, priority = false }) {
  return (
    <div className="rounded-[14%/6.64%] bg-device p-[2.5%] shadow-lg shadow-float ring-1 ring-device-edge">
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        sizes={sizes}
        priority={priority}
        className="aspect-[9/19.5] h-auto w-full rounded-[12.1%/5.59%]"
        // A style, not classes: next/image sizes the blur placeholder from
        // it. Cover trims the few pixels by which a screenshot misses 9:19.5,
        // from the bottom edge.
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
    </div>
  );
}
