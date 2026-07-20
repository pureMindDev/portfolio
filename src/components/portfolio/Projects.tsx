import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useEffect, useState } from "react";
import Section from "./Section";
import ProjectMockup from "./ProjectMockup";
import ProjectCard from "./ProjectCard";

type Kind = "marketplace" | "storefront" | "jobboard" | "media" | "ecommerce" | "audiophile" | "service" | "movie";

export type Project = {
    title: string;
    kind: Kind;
    // Swap in a real desktop screenshot path here (e.g. an image imported
    // from src/assets, or a public/ path) once available. Everything else
    // (card layout, hover zoom, modal preview) works unchanged either way.
    image?: string;
    desc: string;
    long: string;
    stack: string[];
    live: string;
    github?: string;
    featured?: boolean;
};

const projects: Project[] = [
    {
        title: "Lost & Found NG",
        kind: "marketplace",
        // Drop your screenshot in public/projects/lost-and-found-ng.jpg and it
        // shows up here automatically, no code changes needed.
        image: "/projects/lost-and-found-ng.jpg",
        desc: "A lost-and-found platform for reporting and recovering lost items.",
        long: "A lost-and-found platform, built end to end as a Full Stack app.",
        stack: ["React", "Node.js", "Express.js", "MongoDB"],
        live: "https://lost-and-found-ng.vercel.app/",
        featured: true,
    },
    {
        title: "Sameday Laundry",
        kind: "service",
        image: "/projects/sameday-laundry.jpg",
        desc: "A laundry service app.",
        long: "A laundry service app, built with React.",
        stack: ["React"],
        live: "https://samedaylaundry.vercel.app/",
    },
    {
        title: "Mublat Bake & Blends",
        kind: "storefront",
        image: "/projects/mublat-bake-and-blends.jpg",
        desc: "A storefront site for a bakery brand.",
        long: "A storefront site for a bakery brand, built with React and Framer Motion.",
        stack: ["React", "Framer Motion"],
        live: "https://mublatbakeandblends-azure.vercel.app/",
    },
    {
        title: "Audiophile",
        kind: "audiophile",
        image: "/projects/audiophile.jpg",
        desc: "An audio gear e-commerce site for headphones, speakers and earphones.",
        long: "An e-commerce site for audio gear, with headphones, speakers and earphones categories, product pages and a cart.",
        stack: ["React"],
        live: "https://audiophile-kappa-mauve.vercel.app/",
    },
    {
        title: "JobFinder",
        kind: "jobboard",
        image: "/projects/jobfinder.jpg",
        desc: "A job discovery app for finding job listings.",
        long: "A job discovery app, built end to end as a Full Stack app.",
        stack: ["React", "Node.js", "Express.js", "MongoDB"],
        live: "https://jobfinder-beta.vercel.app/",
    },
    {
        title: "Movie App",
        kind: "movie",
        image: "/projects/movie-app.jpg",
        desc: "A movie discovery app for browsing titles, trailers and details.",
        long: "A movie discovery app, built with React, for browsing titles, watching trailers and viewing details.",
        stack: ["React"],
        live: "https://movie-pure-mind.vercel.app/",
    },
];

export default function Projects() {
    const [active, setActive] = useState<Project | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = active ? "hidden" : "";
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);

    return (
        <Section
            id="projects"
            eyebrow="Featured Projects"
            title="Featured Projects"
            subtitle="A selection of projects showcasing my experience in web development, from live storefronts to full-stack platforms."
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, i) => (
                    <ProjectCard key={p.title} project={p} index={i} onOpen={() => setActive(p)} />
                ))}
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] grid place-items-center bg-black/70 backdrop-blur-md p-4"
                        onClick={() => setActive(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.96 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass-strong elegant-shadow"
                        >
                            <button
                                onClick={() => setActive(null)}
                                aria-label="Close"
                                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="aspect-[16/8]">
                                <ProjectMockup kind={active.kind} url={active.live} title={active.title} image={active.image} />
                            </div>
                            <div className="p-6 md:p-8">
                                <h3 className="font-display text-2xl font-semibold">{active.title}</h3>
                                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                                    {active.long}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {active.stack.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a
                                        href={active.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-glow px-4 py-2 text-xs font-semibold text-primary-foreground"
                                    >
                                        Live Demo <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                    <a
                                        href="https://github.com/pureMindDev"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium hover:bg-white/10"
                                    >
                                        <Github className="h-3.5 w-3.5" /> GitHub
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
}
