import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { MouseEvent } from "react";
import ProjectMockup from "./ProjectMockup";
import type { Project } from "./Projects";

export default function ProjectCard({
    project: p,
    index,
    onOpen,
}: {
    project: Project;
    index: number;
    onOpen: () => void;
}) {
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 200, damping: 20 });
    const sry = useSpring(ry, { stiffness: 200, damping: 20 });
    const rotateX = useTransform(srx, (v) => v * -8);
    const rotateY = useTransform(sry, (v) => v * 8);

    const onMouseMove = (e: MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rx.set((e.clientY - rect.top) / rect.height - 0.5);
        ry.set((e.clientX - rect.left) / rect.width - 0.5);
    };
    const onMouseLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            whileHover={{ y: -8 }}
            className="group tracing-border tracing-border-hover card-lift relative overflow-hidden rounded-2xl glass elegant-shadow"
        >
            <button
                onClick={onOpen}
                className="block w-full text-left"
                data-cursor="hover"
                aria-label={`Open details for ${p.title}`}
            >
                <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.10]">
                        <ProjectMockup kind={p.kind} url={p.live} title={p.title} image={p.image} />
                    </div>
                    {/* permanent bottom fade so title sits on the image */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">
                            {p.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                            {p.desc}
                        </p>
                    </div>
                    {/* hover "View project" chip */}
                    <div className="absolute right-4 top-4 translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-1.5 rounded-full glass-strong px-3 py-1 text-[11px] font-medium text-foreground">
                            View project <ExternalLink className="h-3 w-3" />
                        </span>
                    </div>
                    {p.featured && (
                        <div className="absolute left-4 top-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-brand-cyan px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_0_20px_-4px_var(--brand)]">
                                Featured
                            </span>
                        </div>
                    )}
                </div>
                <div className="px-5 pt-4 pb-3">
                    <div className="flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 4).map((t) => (
                            <span
                                key={t}
                                className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </button>
            <div className="flex items-center justify-between border-t border-white/5 px-5 py-3">
                <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
                >
                    Live Demo <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                    href="https://github.com/pureMindDev"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                    <Github className="h-3.5 w-3.5" /> GitHub
                </a>
            </div>
        </motion.article>
    );
}
