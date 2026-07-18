import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        let p = 0;
        const id = setInterval(() => {
            p += Math.random() * 9 + 4;
            if (p >= 100) {
                p = 100;
                clearInterval(id);
                setTimeout(() => {
                    setShow(false);
                    setTimeout(onDone, 700);
                }, 350);
            }
            setProgress(Math.floor(p));
        }, 90);
        return () => clearInterval(id);
    }, [onDone]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(40rem 26rem at 50% 45%, rgba(124,58,237,0.14), transparent 65%)",
                        }}
                    />
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative mb-8"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Logo size={72} />
                        </motion.div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative mb-5 whitespace-nowrap text-sm tracking-[0.2em] text-muted-foreground uppercase"
                    >
                        Welcome — Pure Mind Portfolio
                    </motion.p>
                    <div className="relative h-[3px] w-64 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand via-brand-glow to-brand-cyan"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                    </div>
                    <motion.span
                        className="mt-4 font-mono text-xs text-muted-foreground"
                        aria-live="polite"
                    >
                        {progress.toString().padStart(3, "0")}%
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
