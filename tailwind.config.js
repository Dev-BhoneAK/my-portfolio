// Every color is a CSS variable from app/globals.css, where each theme is one
// block of values. This replaces Tailwind's palette instead of extending it,
// so a raw class like text-slate-500 doesn't exist and can't bypass a theme.
// Opacity modifiers (bg-accent/50) don't work on variables; add a token.
const token = (name) => `var(--color-${name})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xs": "420px",
      xs: "640px",
      sm: "768px",
      md: "896px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      page: token("page"),
      surface: token("surface"),
      subtle: token("subtle"),
      line: {
        DEFAULT: token("line"),
        strong: token("line-strong"),
        hover: token("line-hover"),
      },
      heading: token("heading"),
      label: token("label"),
      control: token("control"),
      body: token("body"),
      muted: token("muted"),
      highlight: token("highlight"),
      accent: {
        DEFAULT: token("accent"),
        hover: token("accent-hover"),
      },
      marker: {
        DEFAULT: token("marker"),
        line: token("marker-line"),
        bullet: token("marker-bullet"),
      },
      action: {
        DEFAULT: token("action"),
        hover: token("action-hover"),
        glow: token("action-glow"),
      },
      "on-action": token("on-action"),
      focus: token("focus"),
      success: {
        DEFAULT: token("success"),
        text: token("success-text"),
        bg: token("success-bg"),
        ring: token("success-ring"),
      },
      device: {
        DEFAULT: token("device"),
        edge: token("device-edge"),
        dot: token("device-dot"),
      },
      // Case-study pages only: the product's own color, which each case
      // study's class sets in globals.css.
      product: {
        DEFAULT: token("product"),
        text: token("product-text"),
        soft: token("product-soft"),
      },
      "on-product": token("on-product"),
    },
    extend: {
      borderColor: {
        DEFAULT: token("line"),
      },
      boxShadowColor: {
        card: token("shadow-card"),
        float: token("shadow-float"),
        screen: token("shadow-screen"),
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      borderWidth: {
        6: "6px",
      },
      // The first screen animates in CSS, not framer-motion, so it plays on
      // first paint instead of waiting for JavaScript.
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" } },
        "fade-in": { from: { opacity: "0" } },
        draw: { from: { strokeDashoffset: "1" } },
      },
      animation: {
        // The hero's entrance: revealVariants (app/utils/motion.js) in CSS.
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        // The same fade without the movement, for reduced motion.
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        // The nav logo fades in while its stroke draws itself.
        "logo-fade": "fade-in 1s ease-in-out both",
        "logo-draw": "draw 3s ease-in-out both",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
