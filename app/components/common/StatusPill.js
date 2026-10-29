// Marks unfinished work, on a project's row and its case study's cover. It's
// the hero's availability pill with an accent dot: the one pulsing item in a
// list of shipped projects.
export default function StatusPill({ children }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-subtle px-3 pb-1 pt-1.5 text-sm font-medium leading-none text-control">
      <span aria-hidden="true" className="relative -mt-0.5 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
      </span>
      {children}
    </p>
  );
}
