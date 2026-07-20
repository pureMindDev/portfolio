import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import Logo from "./Logo";

const links = [
    { href: "#home", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("#home");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const sections = links
            .map((l) => document.querySelector(l.href))
            .filter((el): el is Element => !!el);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(`#${visible.target.id}`);
            },
            { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
        >
            <nav
                className={`flex items-center justify-between rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
                    ? "glass-strong glow-shadow w-[calc(100%-1.5rem)] max-w-5xl px-4 py-1.5 scale-[0.98]"
                    : "bg-transparent w-full max-w-6xl px-5 py-3.5"
                    }`}
            >
                <a href="#home" className="flex items-center gap-2 font-display font-semibold">
                    <Logo size={scrolled ? 28 : 34} className="transition-all duration-500" />
                    <span className="hidden sm:block whitespace-nowrap text-sm tracking-wide">Pure Mind</span>
                </a>

                <ul className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                onClick={() => setActive(l.href)}
                                className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-300 ${active === l.href
                                    ? "text-foreground drop-shadow-[0_0_10px_var(--brand-glow)]"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {l.label}
                                {active === l.href && (
                                    <>
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-brand/20 to-brand-glow/10 shadow-[0_0_20px_-2px_var(--brand-glow)] border border-white/10"
                                        />
                                        <motion.span
                                            layoutId="nav-active-underline"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-brand via-brand-glow to-brand-cyan shadow-[0_0_14px_var(--brand-glow)]"
                                        />
                                    </>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <Magnetic strength={0.35}>
                        <a
                            href="#contact"
                            data-cursor="hover"
                            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-brand-glow px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_20px_-4px_var(--brand)] transition-transform hover:scale-[1.03]"
                        >
                            Hire me
                        </a>
                    </Magnetic>
                    <button
                        aria-label="Menu"
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden grid h-9 w-9 place-items-center rounded-lg glass"
                    >
                        <span className="relative block h-3 w-4">
                            <span
                                className={`absolute inset-x-0 top-0 h-px bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
                            />
                            <span
                                className={`absolute inset-x-0 bottom-0 h-px bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
                            />
                        </span>
                    </button>
                </div>
            </nav>

            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-20 mx-4 w-[calc(100%-2rem)] max-w-6xl rounded-2xl glass-strong elegant-shadow p-3 md:hidden"
                >
                    <ul className="flex flex-col">
                        {links.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.header>
    );
}
