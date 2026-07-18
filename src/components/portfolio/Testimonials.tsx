import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Section from "./Section";

const testimonials = [
    {
        quote:
            "Pure Mind rebuilt our storefront from scratch. It's faster, prettier, and our WhatsApp orders doubled in the first month.",
        name: "Mublat Bake & Blends",
        role: "Bakery — Nigeria",
    },
    {
        quote:
            "He treats every project like it's his own. Motion, spacing, empty states — all considered. That's rare with fullstack devs.",
        name: "Adaeze O.",
        role: "Product founder",
    },
    {
        quote:
            "Delivered a full MERN dashboard on time, with docs, deployments and clean commits. Easiest developer I've worked with.",
        name: "Tunde A.",
        role: "Engineering lead",
    },
];

export default function Testimonials() {
    return (
        <Section
            id="testimonials"
            eyebrow="Testimonials"
            title="What clients say"
            subtitle="A few words from the founders and teams I've built with."
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {testimonials.map((t, i) => (
                    <motion.blockquote
                        key={t.name}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="glass elegant-shadow rounded-2xl p-6"
                    >
                        <Quote className="h-6 w-6 text-brand" />
                        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">"{t.quote}"</p>
                        <footer className="mt-5">
                            <div className="font-display text-sm font-semibold">{t.name}</div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                                {t.role}
                            </div>
                        </footer>
                    </motion.blockquote>
                ))}
            </div>
        </Section>
    );
}
