import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Soft animated curves that flow behind the experience timeline:
 * one path "draws in" as the section scrolls into view, and a second,
 * brighter dashed stroke continuously flows along the same route to
 * suggest current, live motion — echoing the reference video's arcs.
 */
export default function ExperienceFlow() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 85%", "end 60%"],
    });
    const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-visible" aria-hidden>
            <svg
                viewBox="0 0 800 1200"
                preserveAspectRatio="none"
                className="h-full w-full opacity-70"
            >
                <defs>
                    <linearGradient id="expFlowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                        <stop offset="15%" stopColor="#7c3aed" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.9" />
                        <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* faint static guide arcs, reminiscent of the reference's curved brackets */}
                <path
                    d="M 60 40 C 260 140, 260 260, 60 360 S -140 580, 60 680 S 260 900, 60 1000"
                    fill="none"
                    stroke="rgba(148,138,255,0.14)"
                    strokeWidth="1.5"
                />
                <path
                    d="M 740 60 C 540 160, 540 280, 740 380 S 940 600, 740 700 S 540 920, 740 1020"
                    fill="none"
                    stroke="rgba(148,138,255,0.1)"
                    strokeWidth="1.5"
                />

                {/* scroll-drawn spine, following the timeline's zigzag rhythm */}
                <motion.path
                    d="M 400 20 C 200 140, 200 260, 400 380 S 600 600, 400 720 S 200 940, 400 1060 S 600 1180, 400 1200"
                    fill="none"
                    stroke="url(#expFlowGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ pathLength: draw }}
                />

                {/* continuously flowing bright beam along the same spine */}
                <path
                    d="M 400 20 C 200 140, 200 260, 400 380 S 600 600, 400 720 S 200 940, 400 1060 S 600 1180, 400 1200"
                    fill="none"
                    stroke="#a78bfa"
                    strokeOpacity="0.8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="beam-flow"
                />
            </svg>
        </div>
    );
}
