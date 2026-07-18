import { Github, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { downloadCV } from "@/lib/cv";
import Logo from "./Logo";

export default function Footer() {
    const { scrollYProgress } = useScroll();
    const backToTopOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

    return (
        <footer className="relative border-t border-white/5 pt-16 pb-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                        <Logo size={34} />
                        <span className="whitespace-nowrap font-display text-base font-semibold">Pure Mind</span>
                    </div>
                    <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                        Full Stack Developer building fast, animated and production-ready
                        web experiences. Available for freelance, contracts and long-term
                        work.
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                        {[
                            { href: "mailto:badmusabdulbasit932@gmail.com", label: "Email", icon: Mail },
                            { href: "https://wa.me/2347017470501", label: "WhatsApp", icon: MessageCircle },
                            { href: "https://github.com/pureMindDev", label: "GitHub", icon: Github },
                        ].map((s, i) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target={s.href.startsWith("http") ? "_blank" : undefined}
                                rel="noreferrer"
                                aria-label={s.label}
                                data-cursor="hover"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                whileHover={{ y: -4, scale: 1.08 }}
                                className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/10"
                            >
                                <s.icon className="h-4 w-4" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Links</div>
                    <ul className="mt-4 space-y-2 text-sm">
                        {[
                            ["Home", "#home"],
                            ["About", "#about"],
                            ["Skills", "#skills"],
                            ["Projects", "#projects"],
                            ["Contact", "#contact"],
                        ].map(([l, h]) => (
                            <li key={l}>
                                <a href={h} className="text-muted-foreground hover:text-foreground">
                                    {l}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Actions</div>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li>
                            <button
                                onClick={downloadCV}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Download CV
                            </button>
                        </li>
                        <li>
                            <a
                                href="https://github.com/pureMindDev"
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                GitHub Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Hire me
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 px-6 pt-6 text-[12px] text-muted-foreground md:flex-row">
                <p>© {new Date().getFullYear()} Pure Mind — All rights reserved.</p>
                {/* <p>Designed & built with React, Framer Motion, Tailwind & Sass.</p> */}
            </div>

            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                data-cursor="hover"
                style={{ opacity: backToTopOpacity }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
                className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full glass-strong elegant-shadow text-foreground"
            >
                <ArrowUp className="h-4 w-4" />
            </motion.button>
        </footer>
    );
}
