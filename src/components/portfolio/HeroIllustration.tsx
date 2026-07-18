import { motion, type MotionValue, useTransform } from "framer-motion";

const heroPhoto = "/images/badmus-hero.jpg";

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
            {/* ambient glow */}
            <motion.div
                aria-hidden
                animate={{ opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/45 via-brand-blue/20 to-brand-cyan/35 blur-3xl"
            />

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
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
