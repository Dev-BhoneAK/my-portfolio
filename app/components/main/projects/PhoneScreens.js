import Image from "next/image";

// A project's screenshots as phones on a tinted stage. Below xs they scroll
// sideways, about one and a half at a time, like an app store listing. From
// xs up all three sit side by side, each at most 13rem wide.
export default function PhoneScreens({ name, screens }) {
  return (
    <ul
      aria-label={`${name} screenshots`}
      className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto rounded-2xl border border-line bg-surface p-4 xs:grid xs:grid-cols-[repeat(3,minmax(0,13rem))] xs:justify-center xs:gap-5 xs:overflow-visible xs:p-6 sm:p-8 lg:gap-4 xl:gap-5 xl:p-10"
    >
      {screens.map(({ src, alt, caption }) => (
        <li key={caption} className="w-[62%] shrink-0 snap-start xs:w-auto">
          <figure>
            {/* The bezel. Radii are percentages so the corners scale with
                the phone; after the slash is the vertical radius, which
                accounts for the phone's tall shape. */}
            <div className="rounded-[14%/6.64%] bg-device p-[2.5%] shadow-lg shadow-float ring-1 ring-device-edge">
              <Image
                src={src}
                alt={alt}
                placeholder="blur"
                sizes="(min-width: 1536px) 208px, (min-width: 1280px) 168px, (min-width: 1024px) 136px, (min-width: 640px) 208px, 52vw"
                className="aspect-[9/19.5] h-auto w-full rounded-[12.1%/5.59%]"
                // A style, not classes: next/image sizes the blur placeholder
                // from it. Cover trims the few pixels by which a screenshot
                // misses 9:19.5, from the bottom edge.
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-body">
              {caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
