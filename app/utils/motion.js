// Same entrance as the hero: a short fade up on its easing curve. The
// sections below the hero play it once as each entry scrolls in.
export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// The props for an entry that plays it once, as it scrolls into view.
export const revealOnScroll = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  variants: revealVariants,
};

// The first screen (the hero, or a case study's cover) runs the same
// entrance in CSS instead, so it plays as soon as the page paints rather than
// after JavaScript loads. Items start 80ms apart. Reduced motion keeps the
// fade and drops the movement, as framer-motion does.
export const revealClassName = "animate-fade-up motion-reduce:animate-fade-in";
export const revealDelay = (step) => ({ animationDelay: `${100 + step * 80}ms` });
