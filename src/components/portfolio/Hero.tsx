import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, MousePointer2 } from "lucide-react";
import { useEffect, useRef } from "react";
import HeroIllustration from "./HeroIllustration";
import Typewriter from "./Typewriter";
import Magnetic from "./Magnetic";
import Aurora from "./Aurora";
import SkillsMarquee from "./SkillsMarquee";
import { downloadCV } from "@/lib/cv";

const container = {
    hidden: { x: 50 },
    show: { x: 0, transition: { staggerChildren: 0.08, delayChildren: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};
const item = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const roles = [
    "Full Stack Developer",
    "Building Modern Web Applications",
    "Crafting Digital Experiences",
    "Turning Ideas Into Reality",
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const smx = useSpring(mx, { stiffness: 60, damping: 20 });
    const smy = useSpring(my, { stiffness: 60, damping: 20 });
    const orbX = useTransform(smx, (v) => v * 30);
    const orbY = useTransform(smy, (v) => v * 30);
    const glowX = useTransform(smx, (v) => v * -20);
    const glowY = useTransform(smy, (v) => v * -20);

    // Cinematic hand-off into the About section: as the visitor scrolls
    // past the hero, its content gently scales down, lifts and fades,
    // rather than hard-cutting to the next section.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            mx.set(nx);
            my.set(ny);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [mx, my]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
        >
            <Aurora />

            {/* soft ambient glows that react to the cursor, layered above the aurora */}
            <motion.div
                style={{ x: glowX, y: glowY }}
                aria-hidden
                className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand/25 blur-[120px]"
            />
            <motion.div
                style={{ x: orbX, y: orbY }}
                aria-hidden
                className="pointer-events-none absolute right-0 top-10 h-[26rem] w-[26rem] rounded-full bg-brand-glow/10 blur-[140px]"
            />

            <motion.div
                style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
                className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20"
            >
                {/* Left: premium floating laptop visual */}
                <motion.div
                    initial={{ opacity: 0, x: -60, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative order-2 lg:order-1"
                >
                    <HeroIllustration tiltX={smx} tiltY={smy} />
                </motion.div>

                {/* Right: content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="order-1 lg:order-2 min-w-0"
                >
                    <motion.h1
                        variants={item}
                        className="mt-5 font-bold leading-[1.05] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(2.25rem, 3.6vw + 1rem, 3.25rem)" }}
                    >
                        <span className="whitespace-nowrap">
                            Hi, I'm <span className="text-gradient-brand">Pure Mind</span>
                        </span>
                        <br />
                        <span
                            className="mt-1 block whitespace-nowrap text-foreground/95"
                            style={{ fontSize: "clamp(1.05rem, 1.6vw + 0.55rem, 1.5rem)" }}
                        >
                            <Typewriter words={roles} />
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mt-7 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg"
                    >
                        Hello! I'm Badmus Abdul Basit, professionally known as
                        Pure Mind. I'm a Full Stack Developer who specializes
                        in building modern, scalable web applications from
                        frontend interfaces to backend systems. I create
                        responsive websites, business platforms, dashboards,
                        REST APIs, and custom web solutions with a focus on
                        clean code, performance, seamless user experiences,
                        and maintainable architecture. I enjoy turning ideas
                        into reliable digital products that solve real-world
                        problems.
                    </motion.p>

                    <motion.div variants={item} className="mt-6 max-w-xl">
                        <SkillsMarquee />
                    </motion.div>

                    <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
                        <Magnetic strength={0.4}>
                            <a
                                href="#projects"
                                data-cursor="hover"
                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--brand)] transition-transform hover:-translate-y-0.5"
                            >
                                View My Work
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.4}>
                            <a
                                href="#contact"
                                data-cursor="hover"
                                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
                            >
                                Contact Me
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.4}>
                            <button
                                onClick={downloadCV}
                                data-cursor="hover"
                                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <Download className="h-4 w-4" /> Download CV
                            </button>
                        </Magnetic>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#skills"
                aria-label="Scroll down"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
            >
                <div className="flex flex-col items-center gap-2">
                    <MousePointer2 className="h-4 w-4" />
                    <div className="h-10 w-px bg-gradient-to-b from-brand to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
                </div>
            </motion.a>
        </section>
    );
}
