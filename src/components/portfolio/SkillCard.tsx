import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import type { Skill } from "@/lib/skills";

export default function SkillCard({ s, index }: { s: Skill; index: number }) {
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 220, damping: 18 });
    const sry = useSpring(ry, { stiffness: 220, damping: 18 });
    const rotateX = useTransform(srx, (v) => v * -12);
    const rotateY = useTransform(sry, (v) => v * 12);

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rx.set((e.clientY - rect.top) / rect.height - 0.5);
        ry.set((e.clientX - rect.left) / rect.width - 0.5);
    };
    const onMouseLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            whileHover={{ y: -10, scale: 1.03 }}
            transition-timing-function="cubic-bezier(0.16,1,0.3,1)"
            className="group tracing-border tracing-border-hover card-lift relative overflow-hidden rounded-2xl glass p-5 elegant-shadow"
        >
            {/* soft ambient glow that follows the icon color, always subtly on */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
                style={{
                    background: `radial-gradient(60% 60% at 50% 100%, ${s.color}55, transparent 70%)`,
                    zIndex: -1,
                }}
            />
            <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.tag}
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <div className="font-display text-base font-semibold text-foreground">{s.name}</div>
                </div>
                <s.icon
                    className="h-9 w-9 opacity-90 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
                    style={{ color: s.color }}
                />
            </div>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(180px circle at 50% 0%, ${s.color}33, transparent 70%)`,
                }}
            />
        </motion.div>
    );
}
