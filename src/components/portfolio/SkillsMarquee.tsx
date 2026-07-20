import { useRef } from "react";
import { useInView } from "framer-motion";
import "../../styles/marquee.scss";
import { skills } from "@/lib/skills";

/**
 * Duplicates the skill list once so the CSS animation can translate
 * exactly -50% and loop seamlessly forever. The marquee only starts
 * moving once it has actually scrolled into view.
 */
export default function SkillsMarquee() {
    const loop = [...skills, ...skills];
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <div ref={ref} className={`skills-marquee ${inView ? "is-in-view" : ""}`}>
            <div className="skills-marquee__track">
                {loop.map((s, i) => (
                    <span
                        key={`${s.name}-${i}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-foreground/90"
                    >
                        <s.icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                        {s.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
