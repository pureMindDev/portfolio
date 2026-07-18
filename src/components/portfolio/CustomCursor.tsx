import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot and a larger ring that lags with spring physics.
 * Scales up over interactive elements. Auto-disabled on touch devices.
 */
export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [hover, setHover] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.5 });
    const raf = useRef(0);

    useEffect(() => {
        const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!supportsHover) return;
        setEnabled(true);
        document.body.classList.add("has-custom-cursor");

        const move = (e: MouseEvent) => {
            cancelAnimationFrame(raf.current);
            raf.current = requestAnimationFrame(() => {
                x.set(e.clientX);
                y.set(e.clientY);
            });
        };
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            setHover(!!t.closest('a, button, [role="button"], [data-cursor="hover"], input, textarea, label'));
        };

        window.addEventListener("mousemove", move, { passive: true });
        window.addEventListener("mouseover", over);
        return () => {
            document.body.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            cancelAnimationFrame(raf.current);
        };
    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            <motion.div
                aria-hidden
                style={{ x, y }}
                className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
            >
                <div className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_var(--brand)]" />
            </motion.div>
            <motion.div
                aria-hidden
                style={{ x: ringX, y: ringY }}
                animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 1 : 0.7 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
            >
                <div className="h-9 w-9 rounded-full border border-brand/60" />
            </motion.div>
        </>
    );
}
