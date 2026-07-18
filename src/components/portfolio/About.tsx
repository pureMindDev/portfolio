import { motion } from "framer-motion";
import Section from "./Section";
import SkillsMarquee from "./SkillsMarquee";

const photo = "/images/badmus-about.jpg";

const bioLines = [
    "I'm Badmus Abdul Basit, known online as Pure Mind — a Full Stack Developer who builds with React, Node.js, Express and MongoDB.",
    "I'm driven by problem-solving: taking an idea and turning it into a real, working product, from the interface down to the API and database.",
    "I care about the details other people skip — motion, spacing, micro-interactions, and code that's easy to read.",
    "Every project on this site is real and live — built to actually ship, not just to practice.",
];

const lineContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const lineItem = {
    hidden: { opacity: 0, y: 26, clipPath: "inset(0 0 100% 0)" },
    show: {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export default function About() {
    return (
        <Section
            id="about"
            eyebrow="About Me"
            title="A developer obsessed with craft"
            subtitle="A short introduction to who I am, what I do, and what drives me to build digital products."
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                {/* LEFT — bio only, revealed line by line */}
                <motion.div
                    variants={lineContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="glass elegant-shadow tracing-border lg:col-span-3 rounded-2xl p-8"
                >
                    {bioLines.map((line, i) => (
                        <motion.p
                            key={i}
                            variants={lineItem}
                            className={`text-[15px] leading-relaxed text-muted-foreground ${i > 0 ? "mt-4" : ""}`}
                        >
                            {line}
                        </motion.p>
                    ))}
                </motion.div>

                {/* RIGHT — brand mark + infinite skills marquee */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="glass elegant-shadow tracing-border tracing-border-slow lg:col-span-2 flex flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl p-8 text-center"
                >
                    <div className="flex flex-col items-center">
                        <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-brand/40 shadow-[0_10px_40px_-10px_var(--brand)]">
                            <img
                                src={photo}
                                alt="Badmus Abdul Basit"
                                className="absolute inset-0 h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="mt-4 whitespace-nowrap font-display text-lg font-semibold">
                            Badmus Abdul Basit
                        </div>
                        <div className="text-[11px] text-muted-foreground">Pure Mind</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-brand">
                            Full Stack Developer
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            Toolkit
                        </div>
                        <SkillsMarquee />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
