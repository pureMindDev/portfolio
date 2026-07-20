import { motion } from "framer-motion";
import type { ReactNode } from "react";

const headerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const headerItem = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export default function Section({
    id,
    eyebrow,
    title,
    subtitle,
    children,
    className = "",
}: {
    id?: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section id={id} className={`relative py-32 md:py-44 scroll-mt-32 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    variants={headerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mx-auto max-w-2xl text-center"
                >
                    {eyebrow && (
                        <motion.div
                            variants={headerItem}
                            className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
                        >
                            <span className="h-1 w-1 rounded-full bg-brand" />
                            {eyebrow}
                        </motion.div>
                    )}
                    <motion.h2
                        variants={headerItem}
                        className="text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]"
                    >
                        {title}
                    </motion.h2>
                    {subtitle && (
                        <motion.p
                            variants={headerItem}
                            className="mt-6 text-base font-light leading-relaxed text-muted-foreground md:text-lg"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </motion.div>

                <div className="mt-20 md:mt-28">{children}</div>
            </div>
        </section>
    );
}
