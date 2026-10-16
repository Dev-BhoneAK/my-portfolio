import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import { trackEvent } from "@/app/utils/analytics";
import { focusRing } from "@/app/utils/styles";

export default function Nav() {
    // The saved theme lives in localStorage, which the server can't read.
    // The page itself is prerendered (the colors follow the class next-themes
    // sets on <html> before paint), but the toggle waits until it's mounted
    // so its icon and label match the theme.
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme === "dark";

    // Same motion as the rest of the site: a short vertical slide on the
    // hero's easing curve. The sun rises in from below and the moon drops in
    // from above; each leaves the way it came.
    const ease = [0.22, 1, 0.36, 1];
    const iconVariants = {
        hidden: (direction) => ({ opacity: 0, y: direction * 10 }),
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
        exit: (direction) => ({
            opacity: 0,
            y: direction * 10,
            transition: { duration: 0.3, ease: "easeIn" },
        }),
    };

    return (
        <nav className="flex items-center justify-between">
            {/* Draws itself in with CSS, so it starts on first paint. With
                pathLength="1" the dash offset runs from 1 (hidden) to 0. */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 60 50"
                className="animate-logo-fade text-accent"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    pathLength="1"
                    strokeDasharray="1"
                    className="animate-logo-draw"
                    d="M8.35 44.50Q7.25 44.50 6.10 44.35Q2.95 43.95 1.47 42.50Q0 41.05 0 39.35Q0 37.50 1.65 35.97Q3.30 34.45 6.30 34.45Q8.30 34.45 10.65 35.25Q11.95 35.70 13.75 36.75Q15.55 37.80 17.90 38.95Q20.40 36.55 22.48 33Q24.55 29.45 26.63 25.37Q28.70 21.30 31.13 17.20Q33.55 13.10 36.75 9.50L39.65 6.25Q37.80 5.95 35.80 5.77Q33.80 5.60 31.65 5.60Q28.95 5.60 26.10 5.87Q23.25 6.15 20.40 6.75Q15.70 7.75 12.45 9.95Q9.20 12.15 7.53 14.72Q5.85 17.30 5.85 19.55Q5.85 21.10 6.73 22.32Q7.60 23.55 9.35 24.10Q10.45 24.45 11.60 24.45Q13.30 24.45 14.60 23.75Q15.90 23.05 16.80 22.02Q17.70 21.00 18.13 20.05Q18.55 19.10 18.50 18.65Q18.50 18.30 19 18.30Q19.50 18.30 19.50 19.05L19.50 19.10Q19.50 21.15 18.25 22.65Q17 24.15 15.13 24.95Q13.25 25.75 11.35 25.75Q10.15 25.75 8.85 25.35Q6.15 24.40 4.85 22.57Q3.55 20.75 3.55 18.55Q3.55 16.50 4.68 14.32Q5.80 12.15 8 10.17Q10.20 8.20 13.47 6.75Q16.75 5.30 21.05 4.70Q23.35 4.35 25.60 4.20Q27.85 4.05 29.95 4.05Q32.85 4.05 35.63 4.32Q38.40 4.60 40.85 5.15Q41.55 4.55 42.28 4.10Q43.00 3.65 43.60 3.40Q43.95 3.25 44.20 3.20Q44.45 3.15 44.60 3.15Q44.90 3.15 44.90 3.35Q44.90 3.60 44.15 4.15Q43.65 4.50 43.20 4.92Q42.75 5.35 42.65 5.55Q47.75 6.85 50.93 9.12Q54.10 11.40 54.10 14.50Q54.10 16.10 53.05 18.00Q51.95 19.85 50.00 20.97Q48.05 22.10 45.85 22.62Q43.65 23.15 41.75 23.25Q43.40 23.75 45.38 24.72Q47.35 25.70 49.03 27.10Q50.70 28.50 51.25 30.40Q51.60 31.60 51.60 32.85Q51.60 35.50 50.08 37.65Q48.55 39.80 46.03 41.32Q43.50 42.85 40.50 43.67Q37.50 44.50 34.55 44.50Q33.45 44.50 32.30 44.35Q27.50 43.75 24.38 42.85Q21.25 41.95 18.90 40.85Q14.05 44.50 8.35 44.50M33.85 43.05Q36.95 43.05 39.50 42.10Q42.05 41.15 43.93 39.60Q45.80 38.05 46.83 36.15Q47.85 34.25 47.85 32.40Q47.85 30.65 46.80 29.00Q45.75 27.35 43.50 26.25Q41.55 25.30 39.48 24.67Q37.40 24.05 35.90 23.57Q34.40 23.10 34.15 22.60Q34.15 22.00 34.68 21.77Q35.20 21.55 36.05 21.55Q37.05 21.55 38.45 21.70Q39.85 21.85 41.40 21.85Q43.00 21.85 44.68 21.12Q46.35 20.40 47.75 19.17Q49.15 17.95 50.03 16.47Q50.90 15.00 50.90 13.45Q50.90 12.05 49.95 10.70Q49.00 9.35 46.80 8.35Q44.60 7.35 42.05 6.75Q39.55 10.20 37.05 14.47Q34.55 18.75 32.05 23.12Q29.55 27.50 27 31.40Q24.45 35.30 21.90 38.10Q21.30 38.75 20.95 39.07Q20.60 39.40 20 39.95Q22.35 40.90 25.35 41.75Q28.35 42.60 32.20 42.95Q32.60 43 33.03 43.02Q33.45 43.05 33.85 43.05M7.35 42.95Q10.15 43.10 12.47 42.27Q14.80 41.45 16.80 39.95Q15.05 39.10 13.22 38.17Q11.40 37.25 9.35 36.50Q7.90 36 6.70 36Q4.85 36 3.90 36.97Q2.95 37.95 2.95 39.20Q2.95 40.50 4.05 41.67Q5.15 42.85 7.35 42.95Z"
                />
            </svg>
            {/* Appears after mount. The logo is 1px taller than the button,
                so the nav keeps its height when it does. */}
            {mounted && (
                <MotionConfig reducedMotion="user">
                    <motion.button
                        type="button"
                        onClick={() => {
                            const nextTheme = isDark ? "light" : "dark";
                            setTheme(nextTheme);
                            trackEvent("theme_change", { theme: nextTheme });
                        }}
                        aria-label={
                            isDark
                                ? "Switch to light theme"
                                : "Switch to dark theme"
                        }
                        className={`flex h-11 w-11 items-center justify-center rounded-full border border-line text-control transition-colors hover:bg-subtle hover:text-heading ${focusRing}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {/* A block box: transforms don't apply to inline spans. */}
                            <motion.span
                                key={theme}
                                className="block"
                                custom={isDark ? 1 : -1}
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {isDark ? (
                                    <FiSun
                                        aria-hidden="true"
                                        className="text-lg"
                                    />
                                ) : (
                                    <FiMoon
                                        aria-hidden="true"
                                        className="text-lg"
                                    />
                                )}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </MotionConfig>
            )}
        </nav>
    );
}
