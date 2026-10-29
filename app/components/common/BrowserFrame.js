import Image from "next/image";

// A raw desktop screenshot in a browser window drawn in CSS: a bar with three
// dots above the image, in the phone bezels' color. Padding percentages
// follow the window's width, so the bar scales with it, down to a few pixels
// on a phone. Children sit over the image, like an annotated screen's markers.
export default function BrowserFrame({
  src,
  alt,
  sizes,
  priority = false,
  children,
}) {
  return (
    <div className="overflow-hidden rounded-md bg-device shadow-lg shadow-float ring-1 ring-device-edge sm:rounded-lg lg:rounded-xl">
      <div
        aria-hidden="true"
        className="flex items-center gap-[max(4px,0.6%)] px-[max(8px,1.3%)] py-[max(5px,1.05%)]"
      >
        <span className="aspect-square w-[max(5px,0.75%)] rounded-full bg-device-dot"></span>
        <span className="aspect-square w-[max(5px,0.75%)] rounded-full bg-device-dot"></span>
        <span className="aspect-square w-[max(5px,0.75%)] rounded-full bg-device-dot"></span>
      </div>
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
        {children}
      </div>
    </div>
  );
}
