import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, type MouseEvent } from "react";

/**
 * Wraps any inline element (typically a link/button) so it magnetically
 * drifts toward the cursor while hovered, and springs back on leave.
 * Strength controls how far it can travel relative to the pointer offset.
 */
export default function Magnetic({
    children,
    strength = 0.35,
    className = "",
}: {
    children: ReactNode;
    strength?: number;
    className?: string;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set(relX * strength);
        y.set(relY * strength);
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ x: sx, y: sy }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
}
