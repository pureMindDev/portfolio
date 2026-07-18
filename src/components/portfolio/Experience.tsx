import { motion } from "framer-motion";
import Section from "./Section";
import ExperienceFlow from "./ExperienceFlow";

const items = [
    {
        role: "Foundations & First Builds",
        org: "Self-taught, personal projects",
        period: "Early 2025",
        points: [
            "Started learning to code from scratch — JavaScript, React and the fundamentals of the web.",
            "Built early UI-focused projects to get comfortable with components, state and Git.",
            "Moved quickly from tutorials to building real, if simple, working interfaces.",
        ],
    },
    {
        role: "Full Stack Developer",
        org: "Personal & freelance projects",
        period: "2025 — Present",
        points: [
            "Building end to end with React, Node.js, Express and MongoDB — the Full Stack toolkit.",
            "Designing and shipping full backends: auth flows, image uploads, matching algorithms, admin panels.",
            "Shipping and deploying live projects rather than tutorials, one at a time.",
        ],
    },
    {
        role: "Shipping & Deploying",
        org: "Personal & freelance projects",
        period: "Mid–Late 2025",
        points: [
            "Took multiple apps from local dev to production on Vercel and Render, handling real deployment bugs.",
            "Focused on polish — restyling UIs to a premium standard, fixing layout and UX issues found post-launch.",
            "Built a reusable toolkit of patterns (alerts, protected routes, shared API clients) across projects.",
        ],
    },
];

export default function Experience() {
    return (
        <Section
            id="experience"
            eyebrow="Experience"
            title="Where I'm at"
            subtitle="I started coding in 2025 — here's a short, honest look at the journey so far."
        >
            <div className="relative mx-auto max-w-3xl">
                <ExperienceFlow />
                <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand/60 via-white/10 to-transparent md:left-1/2" />

                <div className="space-y-10">
                    {items.map((it, i) => {
                        const left = i % 2 === 0;
                        return (
                            <motion.div
                                key={it.role}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative flex flex-col gap-4 pl-12 md:flex-row md:pl-0 ${left ? "md:justify-start" : "md:justify-end"}`}
                            >
                                <span className="absolute left-2.5 top-4 grid h-3 w-3 place-items-center rounded-full bg-brand shadow-[0_0_18px_var(--brand)] md:left-[calc(50%-6px)]" />
                                <div className={`glass elegant-shadow rounded-2xl p-6 md:w-[46%] ${left ? "md:mr-auto" : "md:ml-auto"}`}>
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-brand">
                                        {it.period}
                                    </div>
                                    <div className="mt-1 font-display text-lg font-semibold">{it.role}</div>
                                    <div className="text-xs text-muted-foreground">{it.org}</div>
                                    <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
                                        {it.points.map((p) => (
                                            <li key={p} className="flex gap-2">
                                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* honest marker for what's next, rather than inventing more history */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex pl-12 md:justify-end md:pl-0"
                    >
                        <span className="absolute left-2.5 top-3 grid h-3 w-3 place-items-center rounded-full border-2 border-brand/60 bg-background md:left-[calc(50%-6px)]" />
                        <div className="glass rounded-2xl px-5 py-3 text-[13px] text-muted-foreground md:mr-auto md:w-[46%]">
                            More to come — actively building and learning.
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
