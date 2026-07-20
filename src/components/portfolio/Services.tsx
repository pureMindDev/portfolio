import { motion } from "framer-motion";
import { Code2, Layers, Rocket, Wrench } from "lucide-react";
import Section from "./Section";

const services = [
    {
        icon: Code2,
        title: "Full Stack Apps",
        desc: "End-to-end web applications with React front-ends, Node/Express APIs and MongoDB data.",
    },
    {
        icon: Layers,
        title: "Landing Pages & Storefronts",
        desc: "Fast, animated marketing sites and product pages built with React and Framer Motion.",
    },
    {
        icon: Rocket,
        title: "Frontend Interfaces",
        desc: "Clean, responsive React interfaces with smooth motion and attention to detail.",
    },
    {
        icon: Wrench,
        title: "APIs & Backends",
        desc: "Node.js and Express APIs backed by MongoDB, built alongside the frontend as one product.",
    },
];

export default function Services() {
    return (
        <Section
            id="services"
            eyebrow="Services"
            title="How I can help"
            subtitle="Focused on Full Stack development, from a single landing page to a full application."
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {services.map((s, i) => (
                    <motion.div
                        key={s.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -4 }}
                        className="group relative overflow-hidden rounded-2xl glass elegant-shadow p-6"
                    >
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/30 to-brand/5 text-brand">
                            <s.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
