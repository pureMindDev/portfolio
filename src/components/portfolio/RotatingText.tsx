import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cycles through a list of short labels with a smooth blur/slide
 * crossfade — a premium "rotating text" effect for the hero role line.
 */
export default function RotatingText({
    words,
    interval = 2600,
    className = "",
}: {
    words: string[];
    interval?: number;
    className?: string;
}) {
    const [i, setI] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setI((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(id);
    }, [words.length, interval]);

    return (
        <span className={`relative inline-grid ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[i]}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="col-start-1 row-start-1 whitespace-nowrap"
                >
                    {words[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
