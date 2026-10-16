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
