import BrowserFrame from "@/app/components/common/BrowserFrame";

// A desktop project's screenshot: one browser window on the same stage as the
// phones, so the row keeps the list's rhythm, with its caption below.
export default function DesktopScreen({ screen: { src, alt, caption } }) {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4 xs:p-6 sm:p-8 xl:p-10">
      <BrowserFrame
        src={src}
        alt={alt}
        sizes="(min-width: 1536px) 668px, (min-width: 1280px) 536px, (min-width: 1024px) 432px, (min-width: 640px) 736px, 100vw"
      />
      <figcaption className="mt-3 text-center text-sm text-body">
        {caption}
      </figcaption>
    </figure>
  );
}
