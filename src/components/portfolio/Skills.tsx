import Section from "./Section";
import SkillCard from "./SkillCard";
import { skills } from "@/lib/skills";

export default function Skills() {
    return (
        <Section
            id="skills"
            eyebrow="Skills"
            title="Tools I use to ship great products"
            subtitle="Technical abilities I've been building since I started coding in 2025."
        >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {skills.map((s, i) => (
                    <SkillCard key={s.name} s={s} index={i} />
                ))}
            </div>
        </Section>
    );
}
