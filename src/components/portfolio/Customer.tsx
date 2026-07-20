import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import "../../styles/cursor-effects.scss";

type Ripple = { id: number; x: number; y: number };

/**
 * Keeps the normal system arrow cursor visible (easier for clients to
 * use) while adding a soft glow that trails the pointer and a click
 * ripple for feedback. Auto-disabled on touch devices.
 */
export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const spotX = useSpring(x, { stiffness: 60, damping: 26, mass: 0.8 });
    const spotY = useSpring(y, { stiffness: 60, damping: 26, mass: 0.8 });
    const raf = useRef(0);
    const rippleId = useRef(0);

    useEffect(() => {
        const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!supportsHover) return;
        setEnabled(true);

        const move = (e: MouseEvent) => {
            cancelAnimationFrame(raf.current);
            raf.current = requestAnimationFrame(() => {
                x.set(e.clientX);
                y.set(e.clientY);
            });
        };
        const down = (e: MouseEvent) => {
            const id = rippleId.current++;
            setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
            setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 900);
        };

        window.addEventListener("mousemove", move, { passive: true });
        window.addEventListener("mousedown", down);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            cancelAnimationFrame(raf.current);
        };
    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            {/* ambient glow that softly trails the real arrow cursor */}
            <motion.div aria-hidden className="cursor-spotlight" style={{ x: spotX, y: spotY }} />

            <AnimatePresence>
                {ripples.map((r) => (
                    <span key={r.id} className="cursor-ripple" style={{ left: r.x, top: r.y }}>
                        <span className="cursor-ripple__ring" />
                    </span>
                ))}
            </AnimatePresence>
        </>
    );
}
