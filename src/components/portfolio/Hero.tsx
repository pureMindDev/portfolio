import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, MousePointer2, Github, Mail, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import HeroIllustration from "./HeroIllustration";
import Typewriter from "./Typewriter";
import Magnetic from "./Magnetic";
import Aurora from "./Aurora";
import { downloadCV } from "@/lib/cv";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
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
    "Turning Ideas Into Reality"
];

const socials = [
    { icon: Github, href: "https://github.com/pureMindDev", label: "GitHub" },
    { icon: Mail, href: "mailto:badmusabdulbasit932@gmail.com", label: "Email" },
    { icon: Phone, href: "tel:+2347017470501", label: "Phone" },
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
    // past the hero, its content gently scales down, lifts and fades —
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
                className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2"
            >
                {/* Left: premium floating laptop visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
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
                    className="order-1 lg:order-2"
                >
                    <motion.span
                        variants={item}
                        className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_var(--brand)]" />
                        Available for work
                    </motion.span>

                    <motion.h1
                        variants={item}
                        className="mt-5 text-5xl font-bold leading-[0.98] tracking-[-0.03em] md:text-6xl lg:text-[4.5rem]"
                    >
                        <span className="md:whitespace-nowrap">
                            Hi, I'm <span className="text-gradient-brand">Pure Mind</span>
                        </span>
                        <br />
                        <span className="block whitespace-nowrap text-[1.6rem] leading-tight text-foreground/95 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                            <Typewriter words={roles} />
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mt-7 max-w-xl text-base font-light leading-relaxed text-muted-foreground md:text-lg"
                    >
                        I build web applications with React, Node.js, Express and
                        MongoDB. I started coding in 2025 and I've been shipping
                        real, live projects ever since.
                    </motion.p>

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

                    <motion.div variants={item} className="mt-9 flex items-center gap-3">
                        {socials.map((s, i) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                data-cursor="hover"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -4, scale: 1.08 }}
                                className="grid h-10 w-10 place-items-center rounded-full glass text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <s.icon className="h-4 w-4" />
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div variants={item} className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                        <div>
                            <div className="font-display text-2xl font-semibold text-foreground">6</div>
                            <div>Live projects</div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div>
                            <div className="font-display text-2xl font-semibold text-foreground">Full Stack</div>
                            <div>Focus</div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div>
                            <div className="font-display text-2xl font-semibold text-foreground">2025</div>
                            <div>Started coding</div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#about"
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
