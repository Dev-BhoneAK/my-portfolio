import PhoneFrame from "@/app/components/common/PhoneFrame";

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
            <PhoneFrame
              src={src}
              alt={alt}
              sizes="(min-width: 1536px) 208px, (min-width: 1280px) 168px, (min-width: 1024px) 136px, (min-width: 640px) 208px, 52vw"
            />
            <figcaption className="mt-3 text-center text-sm text-body">
              {caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
