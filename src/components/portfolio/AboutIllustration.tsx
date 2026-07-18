import { motion } from "framer-motion";

/**
 * Premium "developer at work" illustration for the About section —
 * a floating 3D-ish laptop/terminal card with layered depth, ambient
 * glow and orbiting particles. Abstract by design (no stock photo),
 * built entirely in the brand palette so it never fights the UI.
 */
export default function AboutIllustration() {
    return (
        <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto aspect-square w-full max-w-sm"
        >
            <svg
                viewBox="0 0 420 420"
                className="h-full w-full"
                role="img"
                aria-label="Illustration of a floating developer workstation with layered code panels"
            >
                <defs>
                    <radialGradient id="aboutGlow" cx="50%" cy="45%" r="55%">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
                        <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="aboutStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="aboutDeck" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(148,138,255,0.16)" />
                        <stop offset="100%" stopColor="rgba(148,138,255,0.02)" />
                    </linearGradient>
                </defs>

                <circle cx="210" cy="210" r="180" fill="url(#aboutGlow)" />

                {/* base platform / desk glow, gives the card a "3D" sense of sitting in space */}
                <ellipse cx="210" cy="330" rx="120" ry="16" fill="url(#aboutDeck)" />

                {/* back panel — a second, receding card for depth */}
                <motion.g
                    animate={{ rotate: [0, 1.5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "230px 200px" }}
                >
                    <rect
                        x="120"
                        y="70"
                        width="200"
                        height="150"
                        rx="16"
                        fill="rgba(10,14,36,0.55)"
                        stroke="rgba(167,139,250,0.25)"
                        strokeWidth="1.5"
                        transform="rotate(-6 220 145)"
                    />
                </motion.g>

                {/* main floating laptop / terminal card */}
                <motion.g
                    animate={{ rotate: [0, -1.5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    style={{ transformOrigin: "210px 210px" }}
                >
                    <rect
                        x="70"
                        y="110"
                        width="280"
                        height="190"
                        rx="18"
                        fill="rgba(10,14,36,0.9)"
                        stroke="url(#aboutStroke)"
                        strokeWidth="1.5"
                    />
                    {/* title bar */}
                    <rect x="70" y="110" width="280" height="28" rx="18" fill="rgba(148,138,255,0.08)" />
                    <circle cx="90" cy="124" r="4" fill="#7c3aed" />
                    <circle cx="104" cy="124" r="4" fill="#3b82f6" />
                    <circle cx="118" cy="124" r="4" fill="#06b6d4" />
                    <rect x="230" y="120" width="100" height="8" rx="4" fill="rgba(244,242,255,0.14)" />

                    {/* code lines with a couple of "syntax highlight" accents */}
                    <rect x="92" y="156" width="70" height="7" rx="3.5" fill="url(#aboutStroke)" />
                    <rect x="168" y="156" width="100" height="7" rx="3.5" fill="rgba(244,242,255,0.16)" />
                    <rect x="110" y="174" width="150" height="7" rx="3.5" fill="rgba(244,242,255,0.12)" />
                    <rect x="92" y="192" width="46" height="7" rx="3.5" fill="rgba(244,242,255,0.16)" />
                    <rect x="144" y="192" width="80" height="7" rx="3.5" fill="url(#aboutStroke)" />
                    <rect x="110" y="210" width="170" height="7" rx="3.5" fill="rgba(244,242,255,0.1)" />
                    <rect x="92" y="228" width="90" height="7" rx="3.5" fill="rgba(244,242,255,0.16)" />
                    <rect x="188" y="228" width="60" height="7" rx="3.5" fill="rgba(244,242,255,0.1)" />

                    <motion.rect
                        x="256"
                        y="227"
                        width="3"
                        height="9"
                        fill="#22d3ee"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                    />

                    {/* footer status strip */}
                    <rect x="70" y="264" width="280" height="26" fill="rgba(148,138,255,0.05)" />
                    <circle cx="90" cy="277" r="3" fill="#22c55e" />
                    <rect x="102" y="273" width="64" height="7" rx="3.5" fill="rgba(244,242,255,0.18)" />
                    <rect x="300" y="273" width="30" height="7" rx="3.5" fill="rgba(244,242,255,0.12)" />
                </motion.g>

                {/* orbiting tech glyphs */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "210px 210px" }}
                >
                    <g transform="translate(210 30)">
                        <rect x="-19" y="-15" width="38" height="30" rx="9" className="fill-[#0a0e24]" stroke="url(#aboutStroke)" strokeWidth="1.4" />
                        <text x="0" y="6" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono, monospace" fill="#a78bfa">{"</>"}</text>
                    </g>
                    <g transform="translate(390 210)">
                        <rect x="-18" y="-15" width="36" height="30" rx="9" className="fill-[#0a0e24]" stroke="url(#aboutStroke)" strokeWidth="1.4" />
                        <text x="0" y="6" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono, monospace" fill="#22d3ee">DB</text>
                    </g>
                    <g transform="translate(30 210)">
                        <rect x="-18" y="-15" width="36" height="30" rx="9" className="fill-[#0a0e24]" stroke="url(#aboutStroke)" strokeWidth="1.4" />
                        <text x="0" y="6" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono, monospace" fill="#93c5fd">API</text>
                    </g>
                </motion.g>

                {/* ambient particles */}
                <motion.circle cx="60" cy="90" r="3" fill="#a78bfa" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.6, repeat: Infinity }} />
                <motion.circle cx="360" cy="100" r="2.5" fill="#22d3ee" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
                <motion.circle cx="350" cy="320" r="3" fill="#3b82f6" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, delay: 1 }} />
            </svg>
        </motion.div>
    );
}
