import Image from "next/image";

// Every screenshot sits in the same 4:3 frame so rows line up no matter the
// image's own shape. Several images render side by side as phone screens,
// with the middle one raised.
export default function Screenshot({ name, description, images }) {
  return (
    <figure>
      <div className="flex aspect-[4/3] items-center justify-center gap-[4%] rounded-xl border border-line bg-surface p-6">
        {images.length === 1 ? (
          <Image
            src={images[0].src}
            alt={images[0].alt}
            placeholder="blur"
            sizes="(min-width: 1280px) 32vw, (min-width: 768px) 45vw, 100vw"
            className="h-full w-full"
            // A style, not a class: next/image sizes the blur placeholder
            // from style.objectFit, so this keeps the placeholder contained too.
            style={{ objectFit: "contain" }}
          />
        ) : (
          images.map(({ src, alt }, index) => (
            <Image
              key={alt}
              src={src}
              alt={alt}
              placeholder="blur"
              sizes="(min-width: 1280px) 9vw, (min-width: 768px) 12vw, 26vw"
              className={`rounded-[10px] border-[3px] border-device shadow-lg shadow-screen ${
                index === 1 ? "w-[31%] -translate-y-2" : "w-[27%] translate-y-2"
              }`}
            />
          ))
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        <span className="font-medium text-label">
          {name}
        </span>
        {" · "}
        {description}
      </figcaption>
    </figure>
  );
}
