import { motion, type MotionValue, useTransform } from "framer-motion";

const heroPhoto = "/images/badmus-about.jpg";

/**
 * Premium hero visual: real photograph of Badmus at his workstation,
 * framed inside a floating glass card with mouse-reactive 3D tilt,
 * ambient glow and a soft ground shadow.
 */
export default function HeroIllustration({
    tiltX,
    tiltY,
}: {
    tiltX: MotionValue<number>;
    tiltY: MotionValue<number>;
}) {
    const rotateY = useTransform(tiltX, (v) => v * 10);
    const rotateX = useTransform(tiltY, (v) => v * -8);

    return (
        <div
            style={{ perspective: 1600 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
            {/* wide soft backdrop blur, further back, for depth separation from the aurora behind it */}
            <motion.div
                aria-hidden
                animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-10 -z-20 rounded-[3rem] bg-gradient-to-br from-brand/30 via-brand-glow/15 to-transparent blur-[80px]"
            />

            {/* ambient glow */}
            <motion.div
                aria-hidden
                animate={{ opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/45 via-brand-blue/20 to-brand-cyan/35 blur-3xl"
            />

            {/* slow rotating dashed orbit ring, offset behind the frame */}
            <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 -z-10 rounded-[3rem] border border-dashed border-brand/25"
            />

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                animate={{ y: [0, -14, 0], rotateZ: [-1.2, 1.2, -1.2] }}
                transition={{
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    rotateZ: { duration: 11, repeat: Infinity, ease: "easeInOut" },
                }}
                className="tracing-border relative h-full w-full rounded-[2rem]"
            >
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
                    <img
                        src={heroPhoto}
                        alt="Badmus Abdul Basit coding on his laptop"
                        className="h-full w-full object-cover"
                    />
                    {/* subtle sheen + bottom vignette for text-friendly contrast */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent" />
                    {/* periodic diagonal light sweep */}
                    <motion.div
                        aria-hidden
                        initial={{ x: "-120%" }}
                        animate={{ x: "220%" }}
                        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </div>
            </motion.div>

            {/* floating accent particles orbiting the frame at different depths */}
            <motion.span
                aria-hidden
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 top-10 h-3 w-3 rounded-full bg-brand shadow-[0_0_16px_var(--brand)]"
            />
            <motion.span
                aria-hidden
                animate={{ y: [0, 12, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -right-3 top-1/3 h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-[0_0_14px_var(--brand-cyan)]"
            />
            <motion.span
                aria-hidden
                animate={{ y: [0, -8, 0], opacity: [0.4, 0.85, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute -right-6 bottom-16 h-2 w-2 rounded-full bg-brand-glow shadow-[0_0_12px_var(--brand-glow)]"
            />

            {/* floating glass badge, overlapping the frame corner */}
            <motion.div
                aria-hidden
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="glass-strong elegant-shadow absolute -bottom-4 -left-4 z-10 flex items-center gap-2 rounded-2xl px-3.5 py-2.5"
            >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-glow font-mono text-[11px] font-semibold text-primary-foreground">
                    {"</>"}
                </span>
                <div className="pr-1">
                    <div className="text-[11px] font-semibold leading-tight text-foreground">Full Stack</div>
                    <div className="text-[10px] leading-tight text-muted-foreground">React · Node.js</div>
                </div>
            </motion.div>

            {/* ground shadow */}
            <div
                aria-hidden
                className="absolute left-1/2 top-[94%] h-6 w-[60%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-xl"
            />
        </div>
    );
}
