import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import "../../styles/cursor-effects.scss";

type Ripple = { id: number; x: number; y: number };

/**
 * Custom cursor: a small dot + a lagging ring, a soft ambient spotlight
 * that trails the pointer, and a click ripple. Scales up over
 * interactive elements. Auto-disabled on touch devices.
 */
export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [hover, setHover] = useState(false);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.5 });
    const spotX = useSpring(x, { stiffness: 60, damping: 26, mass: 0.8 });
    const spotY = useSpring(y, { stiffness: 60, damping: 26, mass: 0.8 });
    const raf = useRef(0);
    const rippleId = useRef(0);

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
        const down = (e: MouseEvent) => {
            const id = rippleId.current++;
            setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
            setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 900);
        };

        window.addEventListener("mousemove", move, { passive: true });
        window.addEventListener("mouseover", over);
        window.addEventListener("mousedown", down);
        return () => {
            document.body.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            window.removeEventListener("mousedown", down);
            cancelAnimationFrame(raf.current);
        };
    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            {/* ambient spotlight that softly trails the pointer over dark sections */}
            <motion.div aria-hidden className="cursor-spotlight" style={{ x: spotX, y: spotY }} />

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

            <AnimatePresence>
                {ripples.map((r) => (
                    <span
                        key={r.id}
                        className="cursor-ripple"
                        style={{ left: r.x, top: r.y }}
                    >
                        <span className="cursor-ripple__ring" />
                    </span>
                ))}
            </AnimatePresence>
        </>
    );
}
