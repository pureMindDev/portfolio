import { motion, type MotionValue, useTransform } from "framer-motion";

/**
 * A genuinely 3D hero visual (real perspective/rotateX/rotateY/translateZ,
 * not a flat image): a floating glass "code panel" with orbiting rings
 * and depth-layered particles, tilting toward the cursor.
 */
export default function Hero3D({
    tiltX,
    tiltY,
}: {
    tiltX: MotionValue<number>;
    tiltY: MotionValue<number>;
}) {
    const rotateY = useTransform(tiltX, (v) => v * 18);
    const rotateX = useTransform(tiltY, (v) => v * -14);

    return (
        <div style={{ perspective: 1400 }} className="relative aspect-square w-full max-w-md mx-auto">
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full"
            >
                {/* ambient glow beneath the whole scene */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/35 via-brand-glow/15 to-transparent blur-3xl"
                    style={{ transform: "translateZ(-80px)" }}
                />

                {/* orbiting 3D rings */}
                <motion.div
                    aria-hidden
                    className="absolute inset-4 rounded-full border border-brand/30"
                    style={{ transform: "rotateX(72deg)", transformStyle: "preserve-3d" }}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                    <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_14px_var(--brand)]" />
                </motion.div>
                <motion.div
                    aria-hidden
                    className="absolute inset-10 rounded-full border border-brand-cyan/25"
                    style={{ transform: "rotateX(70deg) rotateY(24deg)", transformStyle: "preserve-3d" }}
                    animate={{ rotateZ: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                    <span className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-cyan shadow-[0_0_12px_var(--brand-cyan)]" />
                </motion.div>

                {/* floating tech chips at different depths, for parallax */}
                <motion.div
                    className="absolute left-2 top-10 rounded-xl glass px-3 py-2 font-mono text-[11px] text-brand"
                    style={{ transform: "translateZ(90px)" }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {"</>"}
                </motion.div>
                <motion.div
                    className="absolute right-1 top-16 rounded-xl glass px-3 py-2 font-mono text-[11px] text-brand-cyan"
                    style={{ transform: "translateZ(110px)" }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                    {"{ }"}
                </motion.div>
                <motion.div
                    className="absolute bottom-8 left-4 rounded-xl glass px-3 py-2 font-mono text-[11px] text-brand-glow"
                    style={{ transform: "translateZ(70px)" }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                    DB
                </motion.div>

                {/* central floating glass code panel — the focal 3D object */}
                <motion.div
                    className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-2xl glass-strong elegant-shadow overflow-hidden"
                    style={{ transform: "translateZ(60px)" }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-brand" />
                        <span className="h-2 w-2 rounded-full bg-brand-glow" />
                        <span className="h-2 w-2 rounded-full bg-brand-cyan" />
                        <span className="ml-2 font-mono text-[9px] text-muted-foreground">pure-mind.tsx</span>
                    </div>
                    <div className="space-y-2 p-4">
                        <div className="h-1.5 w-3/5 rounded-full bg-gradient-to-r from-brand to-brand-glow" />
                        <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                        <div className="h-1.5 w-2/5 rounded-full bg-gradient-to-r from-brand-glow to-brand-cyan" />
                        <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1/3 rounded-full bg-white/10" />
                            <motion.span
                                className="h-3 w-[2px] bg-brand-cyan"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* small particles at shallow depth for extra sparkle */}
                <motion.span
                    className="absolute right-8 bottom-12 h-1.5 w-1.5 rounded-full bg-brand-cyan"
                    style={{ transform: "translateZ(130px)" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                />
                <motion.span
                    className="absolute left-10 top-6 h-1.5 w-1.5 rounded-full bg-brand"
                    style={{ transform: "translateZ(130px)" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
                />
            </motion.div>
        </div>
    );
}
