import { AnimatePresence, animate as animateValue, motion, useMotionValue, type MotionValue, useTransform } from "framer-motion";
import { Lock, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectMockup from "./ProjectMockup";

// The screens that cycle across the laptop display — kept in sync with the
// Projects section. Swap any `image` in once a real desktop screenshot is
// available and it renders inside the same browser frame unchanged.
const projects: { title: string; short: string; kind: Parameters<typeof ProjectMockup>[0]["kind"]; url: string; image?: string }[] = [
    { title: "Lost & Found NG", short: "Lost & Found", kind: "marketplace", url: "lost-and-found-ng.vercel.app", image: "/projects/lost-and-found-ng.jpg" },
    { title: "Sameday Laundry", short: "Laundry", kind: "service", url: "samedaylaundry.vercel.app", image: "/projects/sameday-laundry.jpg" },
    { title: "Mublat Bake & Blends", short: "Mublat", kind: "storefront", url: "mublatbakeandblends-azure.vercel.app", image: "/projects/mublat-bake-and-blends.jpg" },
    { title: "Audiophile", short: "Audiophile", kind: "audiophile", url: "audiophile-kappa-mauve.vercel.app", image: "/projects/audiophile.jpg" },
    { title: "JobFinder", short: "JobFinder", kind: "jobboard", url: "jobfinder-beta.vercel.app", image: "/projects/jobfinder.jpg" },
    { title: "Movie App", short: "Movie App", kind: "movie", url: "movie-pure-mind.vercel.app", image: "/projects/movie-app.jpg" },
];

const CYCLE_MS = 7000;

/**
 * A realistic, cinematic floating MacBook: brushed-aluminum shell, a black
 * screen bezel with a real browser frame (tabs + address bar) on the
 * display, a keyboard/trackpad deck seen in perspective, mouse-reactive
 * spring tilt, a gentle float loop, and shadow/glow that breathe with it.
 */
export default function HeroLaptop({
    tiltX,
    tiltY,
}: {
    tiltX: MotionValue<number>;
    tiltY: MotionValue<number>;
}) {
    const rotateY = useTransform(tiltX, (v) => v * 13);
    const rotateX = useTransform(tiltY, (v) => v * -9 + 10); // slight permanent downward tilt, like a real open laptop

    const [active, setActive] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setActive((i) => (i + 1) % projects.length);
        }, CYCLE_MS);
        return () => clearInterval(id);
    }, []);

    // A hand-driven float loop (rather than a plain keyframe animate prop)
    // so the ambient shadow beneath the laptop can breathe in sync with it.
    const floatY = useMotionValue(0);
    useEffect(() => {
        const controls = animateValue(floatY, [0, -14, 0], {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
        });
        return () => controls.stop();
    }, [floatY]);
    const shadowScale = useTransform(floatY, [-14, 0], [0.82, 1]);
    const shadowOpacity = useTransform(floatY, [-14, 0], [0.3, 0.6]);

    const current = projects[active];

    return (
        <div style={{ perspective: 1700 }} className="relative mx-auto aspect-square w-full max-w-md">
            {/* ambient violet/cyan glow behind the whole scene */}
            <motion.div
                aria-hidden
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-4 bottom-4 top-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand/45 via-brand-blue/15 to-brand-cyan/35 blur-3xl"
            />

            {/* floating particles at various depths */}
            {particles.map((p, i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    className="absolute h-1.5 w-1.5 rounded-full"
                    style={{ left: p.left, top: p.top, background: p.color, boxShadow: `0 0 10px ${p.color}` }}
                    animate={{ y: [0, -14, 0], opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
                />
            ))}

            {/* ground shadow, breathes opposite the float */}
            <motion.div
                aria-hidden
                style={{ scaleX: shadowScale, opacity: shadowOpacity }}
                className="absolute left-1/2 top-[86%] h-6 w-[62%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-xl"
            />

            {/* outer wrapper: gentle vertical float */}
            <motion.div style={{ y: floatY }} className="relative h-full w-full">
                {/* inner wrapper: mouse-reactive spring tilt in real 3D */}
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
                    {/* ===== Screen / lid ===== */}
                    <div className="absolute left-1/2 top-[6%] w-[88%] -translate-x-1/2" style={{ transform: "translateZ(50px)" }}>
                        {/* aluminum lid frame */}
                        <div className="rounded-t-2xl rounded-b-[7px] bg-gradient-to-b from-[#e7e9ee] via-[#a9adb8] to-[#7c808c] p-[3px] shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset]">
                            {/* black bezel */}
                            <div className="rounded-t-[13px] rounded-b-[4px] bg-[#08090c] p-[10px] pb-[14px]">
                                {/* camera notch */}
                                <div className="mx-auto mb-[6px] flex h-[6px] w-14 items-center justify-center rounded-full bg-[#111]">
                                    <span className="h-[2.5px] w-[2.5px] rounded-full bg-[#2a2f45]" />
                                </div>

                                {/* ===== screen surface ===== */}
                                <div className="relative aspect-[16/10.6] w-full overflow-hidden rounded-[4px] bg-[#0b0e1a]">
                                    {/* browser tab strip */}
                                    <div className="relative z-10 flex h-[18px] items-end gap-[2px] bg-[#0d1120] px-[6px] pt-[4px]">
                                        {projects.map((p, i) => {
                                            const isActive = i === active;
                                            return (
                                                <div
                                                    key={p.title}
                                                    className={`relative flex h-[14px] items-center gap-[3px] rounded-t-[4px] px-[5px] transition-colors duration-300 ${
                                                        isActive ? "bg-[#161b2e]" : "bg-transparent"
                                                    }`}
                                                    style={{ minWidth: isActive ? "26%" : "9%", maxWidth: isActive ? "26%" : "9%" }}
                                                >
                                                    <span
                                                        className="h-[4px] w-[4px] shrink-0 rounded-full"
                                                        style={{ background: isActive ? "var(--brand-cyan)" : "rgba(244,242,255,0.25)" }}
                                                    />
                                                    {isActive && (
                                                        <span className="truncate font-mono text-[5.5px] leading-none text-foreground/70">
                                                            {p.short}
                                                        </span>
                                                    )}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="hero-laptop-active-tab"
                                                            className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-brand via-brand-blue to-brand-cyan"
                                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* address bar */}
                                    <div className="relative z-10 flex h-[16px] items-center gap-[4px] bg-[#111528] px-[6px]">
                                        <span className="h-[5px] w-[5px] rounded-full bg-[#ff5f57]" />
                                        <span className="h-[5px] w-[5px] rounded-full bg-[#febc2e]" />
                                        <span className="h-[5px] w-[5px] rounded-full bg-[#28c840]" />
                                        <div className="ml-[4px] flex flex-1 items-center gap-[3px] truncate rounded-full bg-white/[0.06] px-[6px] py-[2px]">
                                            <Lock className="h-[6px] w-[6px] shrink-0 text-foreground/40" />
                                            <span className="truncate font-mono text-[6px] leading-none text-foreground/55">
                                                {current.url}
                                            </span>
                                        </div>
                                        <RotateCw className="h-[6px] w-[6px] shrink-0 text-foreground/30" />
                                    </div>

                                    {/* page content, crossfades between projects */}
                                    <div className="relative h-[calc(100%-2.125rem)] w-full">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={current.title}
                                                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                className="absolute inset-0"
                                            >
                                                <ProjectMockup kind={current.kind} url={current.url} title={current.title} image={current.image} />
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* soft diagonal glass sheen, sweeping slowly for a premium reflective feel */}
                                        <motion.div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
                                            style={{ transform: "skewX(-18deg)" }}
                                            animate={{ x: ["-20%", "340%"] }}
                                            transition={{ duration: 7, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                                        />
                                        {/* static ambient glass reflection */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* thin aluminum edge = lid thickness */}
                        <div className="mx-auto h-[3px] w-[97%] rounded-b-[3px] bg-gradient-to-b from-[#7c808c] to-[#3c3f47]" />
                    </div>

                    {/* ===== Base / keyboard deck, seen from below in perspective ===== */}
                    <div
                        className="absolute left-1/2 top-[63%] w-[104%] -translate-x-1/2"
                        style={{ transform: "translateZ(6px) rotateX(58deg)", transformStyle: "preserve-3d" }}
                    >
                        <div className="rounded-b-[14px] rounded-t-[3px] bg-gradient-to-b from-[#d7dae0] via-[#b7bac3] to-[#8b8e98] px-[10%] pb-[10px] pt-[7px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75)]">
                            {/* keyboard well */}
                            <div className="rounded-[4px] bg-[#1b1e2b] p-[5px]">
                                <div
                                    className="h-[15px] w-full rounded-[2px] opacity-90"
                                    style={{
                                        backgroundImage:
                                            "repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0 5.2%, rgba(0,0,0,0.35) 5.2% 6%), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 44%, rgba(0,0,0,0.3) 44% 50%)",
                                        backgroundColor: "#14161f",
                                    }}
                                />
                            </div>
                            {/* trackpad */}
                            <div className="mx-auto mt-[6px] h-[10px] w-[34%] rounded-[3px] border border-black/10 bg-gradient-to-b from-[#c3c6cf] to-[#a7aab3] shadow-[0_1px_2px_rgba(255,255,255,0.5)_inset]" />
                        </div>
                    </div>

                    {/* current-project label chip, floats beside the laptop */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.title + "-chip"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            style={{ transform: "translateZ(100px)" }}
                            className="absolute -right-2 top-[4%] rounded-xl glass-strong px-3 py-2 font-mono text-[10px] text-foreground/80"
                        >
                            {current.title}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
}

const particles = [
    { left: "6%", top: "18%", color: "var(--brand-cyan)", duration: 3.2, delay: 0 },
    { left: "88%", top: "26%", color: "var(--brand)", duration: 3.8, delay: 0.4 },
    { left: "12%", top: "72%", color: "var(--brand-blue)", duration: 4.2, delay: 0.8 },
    { left: "92%", top: "68%", color: "var(--brand-glow)", duration: 3.5, delay: 1.1 },
    { left: "50%", top: "6%", color: "var(--brand-cyan)", duration: 4.6, delay: 0.2 },
];
