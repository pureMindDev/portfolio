import { motion } from "framer-motion";
import Logo from "./Logo";

/**
 * The official logo mark, presented large for the About section —
 * with a soft glow and gentle idle rotation.
 */
export default function AboutBadge() {
    return (
        <div className="relative h-28 w-28">
            <div
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at 50% 45%, rgba(124,58,237,0.5), transparent 70%)",
                }}
            />
            <motion.div
                className="relative h-full w-full"
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <Logo size={112} className="h-full w-full" />
            </motion.div>
        </div>
    );
}
