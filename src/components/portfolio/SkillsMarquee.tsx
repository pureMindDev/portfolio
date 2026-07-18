import "../../styles/marquee.scss";
import { skills } from "@/lib/skills";

/**
 * Duplicates the skill list once so the CSS animation can translate
 * exactly -50% and loop seamlessly forever.
 */
export default function SkillsMarquee() {
    const loop = [...skills, ...skills];

    return (
        <div className="skills-marquee">
            <div className="skills-marquee__track">
                {loop.map((s, i) => (
                    <span
                        key={`${s.name}-${i}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-foreground/90"
                    >
                        <s.icon className="h-4 w-4" style={{ color: s.color }} />
                        {s.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
