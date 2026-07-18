type Kind = "marketplace" | "storefront" | "jobboard" | "media" | "ecommerce" | "audiophile" | "service" | "movie";

// Each project gets its own three-tone slice of the shared violet / indigo /
// cyan / electric-blue palette, so the grid reads as one cohesive system
// while every card still feels distinct.
const palette: Record<Kind, { a: string; b: string; c: string }> = {
    marketplace: { a: "#7c3aed", b: "#4f46e5", c: "#06b6d4" },
    storefront: { a: "#4f46e5", b: "#7c3aed", c: "#3b82f6" },
    jobboard: { a: "#06b6d4", b: "#3b82f6", c: "#7c3aed" },
    media: { a: "#7c3aed", b: "#06b6d4", c: "#4f46e5" },
    ecommerce: { a: "#4f46e5", b: "#06b6d4", c: "#7c3aed" },
    audiophile: { a: "#3b82f6", b: "#4f46e5", c: "#06b6d4" },
    service: { a: "#06b6d4", b: "#7c3aed", c: "#3b82f6" },
    movie: { a: "#0f0620", b: "#7c3aed", c: "#4f46e5" },
};

/**
 * A browser-window frame for showcasing a project.
 *
 * Pass a real `image` (e.g. an asset imported from src/assets, or a
 * public path) once you have an actual screenshot of the live site and
 * it renders inside the same browser chrome. Until then it falls back
 * to a realistic, content-aware layout mockup so the grid never looks
 * like a placeholder.
 */
export default function ProjectMockup({
    kind,
    url,
    image,
    title,
}: {
    kind: Kind;
    url: string;
    image?: string;
    title: string;
}) {
    const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    return (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#111827]">
            {/* browser chrome */}
            <div className="flex h-7 items-center gap-2 bg-black/40 px-3">
                <span className="h-2 w-2 rounded-full bg-[#7c3aed]" />
                <span className="h-2 w-2 rounded-full bg-[#4f46e5]" />
                <span className="h-2 w-2 rounded-full bg-[#06b6d4]" />
                <span className="ml-2 flex-1 truncate rounded-full bg-white/5 px-3 py-0.5 text-center font-mono text-[9px] text-foreground/50">
                    {host}
                </span>
            </div>

            {/* content area */}
            <div className="relative h-[calc(100%-1.75rem)] w-full">
                {image ? (
                    <img
                        src={image}
                        alt={`${title} landing page screenshot`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                    />
                ) : (
                    <MockLayout kind={kind} />
                )}
            </div>
        </div>
    );
}

function MockLayout({ kind }: { kind: Kind }) {
    const c = palette[kind];
    return (
        <svg viewBox="0 0 480 272" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden>
            <defs>
                <linearGradient id={`bg-${kind}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={c.a} stopOpacity="0.35" />
                    <stop offset="60%" stopColor={c.b} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={c.c} stopOpacity="0.28" />
                </linearGradient>
                <linearGradient id={`accent-${kind}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={c.a} />
                    <stop offset="100%" stopColor={c.c} />
                </linearGradient>
            </defs>

            <rect x="0" y="0" width="480" height="272" fill={`url(#bg-${kind})`} />

            {/* page nav */}
            <rect x="20" y="16" width="46" height="10" rx="5" fill="rgba(244,242,255,0.35)" />
            <rect x="380" y="14" width="80" height="16" rx="8" fill={`url(#accent-${kind})`} />

            {kind === "marketplace" && (
                <>
                    <rect x="20" y="48" width="220" height="14" rx="4" fill="rgba(244,242,255,0.85)" />
                    <rect x="20" y="70" width="160" height="8" rx="4" fill="rgba(244,242,255,0.35)" />
                    <rect x="20" y="94" width="120" height="26" rx="13" fill={`url(#accent-${kind})`} />
                    {[0, 1, 2].map((i) => (
                        <g key={i}>
                            <rect x="270" y={48 + i * 40} width="190" height="34" rx="8" fill="rgba(10,14,36,0.7)" stroke="rgba(244,242,255,0.12)" />
                            <circle cx={292} cy={65 + i * 40} r="8" fill={c.a} opacity="0.7" />
                            <rect x="310" y={59 + i * 40} width="120" height="6" rx="3" fill="rgba(244,242,255,0.5)" />
                            <rect x="310" y={69 + i * 40} width="80" height="5" rx="2.5" fill="rgba(244,242,255,0.25)" />
                        </g>
                    ))}
                </>
            )}

            {kind === "storefront" && (
                <>
                    <rect x="20" y="48" width="200" height="16" rx="4" fill="rgba(244,242,255,0.85)" />
                    <rect x="20" y="72" width="230" height="8" rx="4" fill="rgba(244,242,255,0.3)" />
                    <rect x="20" y="94" width="110" height="26" rx="13" fill={`url(#accent-${kind})`} />
                    {[0, 1, 2, 3].map((i) => (
                        <g key={i} transform={`translate(${20 + i * 112} 148)`}>
                            <rect width="98" height="100" rx="10" fill="rgba(10,14,36,0.7)" stroke="rgba(244,242,255,0.12)" />
                            <circle cx="49" cy="38" r="22" fill={i % 2 === 0 ? c.a : c.c} opacity="0.55" />
                            <rect x="12" y="72" width="74" height="6" rx="3" fill="rgba(244,242,255,0.45)" />
                            <rect x="12" y="82" width="46" height="5" rx="2.5" fill="rgba(244,242,255,0.25)" />
                        </g>
                    ))}
                </>
            )}

            {kind === "jobboard" && (
                <>
                    <rect x="20" y="48" width="440" height="24" rx="8" fill="rgba(10,14,36,0.7)" stroke="rgba(244,242,255,0.14)" />
                    <rect x="30" y="56" width="120" height="8" rx="4" fill="rgba(244,242,255,0.3)" />
                    <rect x="380" y="52" width="70" height="16" rx="8" fill={`url(#accent-${kind})`} />
                    {[0, 1, 2].map((i) => (
                        <g key={i} transform={`translate(20 ${86 + i * 42})`}>
                            <rect width="440" height="34" rx="8" fill="rgba(10,14,36,0.6)" stroke="rgba(244,242,255,0.1)" />
                            <rect x="12" y="10" width="26" height="14" rx="4" fill={c.b} opacity="0.6" />
                            <rect x="48" y="10" width="140" height="6" rx="3" fill="rgba(244,242,255,0.5)" />
                            <rect x="48" y="20" width="90" height="5" rx="2.5" fill="rgba(244,242,255,0.25)" />
                            <rect x="380" y="11" width="46" height="12" rx="6" fill="rgba(244,242,255,0.12)" />
                        </g>
                    ))}
                </>
            )}

            {kind === "media" && (
                <>
                    <rect x="20" y="44" width="440" height="120" rx="10" fill="rgba(10,14,36,0.75)" stroke="rgba(244,242,255,0.12)" />
                    <polygon points="230,84 230,124 260,104" fill={`url(#accent-${kind})`} />
                    <rect x="20" y="176" width="150" height="10" rx="4" fill="rgba(244,242,255,0.7)" />
                    {[0, 1, 2, 3].map((i) => (
                        <rect key={i} x={20 + i * 112} y="196" width="98" height="60" rx="8" fill="rgba(10,14,36,0.65)" stroke="rgba(244,242,255,0.1)" />
                    ))}
                </>
            )}

            {kind === "ecommerce" && (
                <>
                    <rect x="20" y="48" width="140" height="208" rx="8" fill="rgba(10,14,36,0.6)" stroke="rgba(244,242,255,0.1)" />
                    {[0, 1, 2].map((i) => (
                        <rect key={i} x="32" y={62 + i * 26} width="116" height="10" rx="5" fill="rgba(244,242,255,0.2)" />
                    ))}
                    {[0, 1, 2, 3].map((i) => (
                        <g key={i} transform={`translate(${176 + (i % 2) * 148} ${48 + Math.floor(i / 2) * 108})`}>
                            <rect width="136" height="96" rx="10" fill="rgba(10,14,36,0.7)" stroke="rgba(244,242,255,0.12)" />
                            <circle cx="68" cy="38" r="22" fill={i % 2 === 0 ? c.a : c.b} opacity="0.55" />
                            <rect x="14" y="70" width="90" height="6" rx="3" fill="rgba(244,242,255,0.45)" />
                            <rect x="14" y="80" width="50" height="8" rx="4" fill={`url(#accent-${kind})`} />
                        </g>
                    ))}
                </>
            )}
            {kind === "audiophile" && (
                <>
                    {/* modelled on the real site's actual nav + category structure */}
                    <rect x="20" y="48" width="260" height="20" rx="4" fill="rgba(244,242,255,0.9)" />
                    <text x="20" y="90" fontFamily="Space Grotesk, sans-serif" fontSize="9" fill="rgba(244,242,255,0.55)" letterSpacing="1">
                        HEADPHONES · SPEAKERS · EARPHONES
                    </text>
                    <rect x="20" y="100" width="150" height="26" rx="13" fill={`url(#accent-${kind})`} />
                    {["Headphones", "Speakers", "Earphones"].map((label, i) => (
                        <g key={label} transform={`translate(${20 + i * 154} 148)`}>
                            <rect width="140" height="108" rx="10" fill="rgba(10,14,36,0.7)" stroke="rgba(244,242,255,0.12)" />
                            <circle cx="70" cy="42" r="26" fill={i === 0 ? c.a : i === 1 ? c.b : c.c} opacity="0.5" />
                            <text x="70" y="90" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="10" fill="rgba(244,242,255,0.75)">
                                {label}
                            </text>
                        </g>
                    ))}
                </>
            )}

            {kind === "movie" && (
                <>
                    {/* cinematic hero banner with a play chip, like a streaming home screen */}
                    <rect x="0" y="0" width="480" height="140" fill="url(#bg-movie)" />
                    <rect x="20" y="24" width="120" height="14" rx="4" fill="rgba(244,242,255,0.9)" />
                    <rect x="20" y="52" width="200" height="8" rx="4" fill="rgba(244,242,255,0.35)" />
                    <rect x="20" y="64" width="150" height="8" rx="4" fill="rgba(244,242,255,0.25)" />
                    <g transform="translate(20 88)">
                        <rect width="92" height="26" rx="13" fill={`url(#accent-${kind})`} />
                        <polygon points="34,7 34,19 46,13" fill="#0f0620" />
                        <rect x="54" y="10" width="26" height="6" rx="3" fill="rgba(15,6,32,0.8)" />
                    </g>
                    <rect x="20" y="126" width="120" height="9" rx="4" fill="rgba(244,242,255,0.6)" />
                    {/* poster grid */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <g key={i} transform={`translate(${20 + i * 90} 148)`}>
                            <rect width="78" height="112" rx="8" fill="rgba(10,14,36,0.75)" stroke="rgba(244,242,255,0.12)" />
                            <circle cx="39" cy="46" r="18" fill={i % 2 === 0 ? c.b : c.c} opacity="0.55" />
                            <polygon points="34,40 34,52 46,46" fill="rgba(244,242,255,0.85)" />
                            <rect x="10" y="86" width="58" height="6" rx="3" fill="rgba(244,242,255,0.35)" />
                            <rect x="10" y="96" width="34" height="5" rx="2.5" fill="rgba(244,242,255,0.2)" />
                        </g>
                    ))}
                </>
            )}

            {kind === "service" && (
                <>
                    <rect x="20" y="48" width="230" height="16" rx="4" fill="rgba(244,242,255,0.85)" />
                    <rect x="20" y="72" width="180" height="8" rx="4" fill="rgba(244,242,255,0.3)" />
                    <rect x="20" y="96" width="130" height="26" rx="13" fill={`url(#accent-${kind})`} />
                    <rect x="300" y="48" width="160" height="130" rx="14" fill="rgba(10,14,36,0.65)" stroke="rgba(244,242,255,0.12)" />
                    <circle cx="380" cy="95" r="24" fill={c.a} opacity="0.4" />
                    {[0, 1, 2].map((i) => (
                        <g key={i} transform={`translate(20 ${150 + i * 34})`}>
                            <rect width="260" height="26" rx="8" fill="rgba(10,14,36,0.6)" stroke="rgba(244,242,255,0.1)" />
                            <circle cx="16" cy="13" r="6" fill={c.b} opacity="0.6" />
                            <rect x="30" y="9" width="120" height="7" rx="3.5" fill="rgba(244,242,255,0.4)" />
                        </g>
                    ))}
                </>
            )}
        </svg>
    );
}
