type Props = {
    size?: number;
    animated?: boolean;
    className?: string;
};

/**
 * The official Pure Mind brand mark: a hexagonal "PM" monogram in the
 * brand gradient. This is the single source of truth for the logo —
 * used in the Navbar, Loading Screen, Footer and the About section.
 */
export default function Logo({ size = 40, className = "" }: Props) {
    return (
        <svg
            viewBox="0 0 160 160"
            width={size}
            height={size}
            className={className}
            role="img"
            aria-label="Pure Mind logo"
        >
            <defs>
                <linearGradient id="pm-logo-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="55%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
            <polygon
                points="80,10 141,45 141,115 80,150 19,115 19,45"
                fill="rgba(17,24,39,0.92)"
                stroke="url(#pm-logo-grad)"
                strokeWidth="3"
            />
            <text
                x="80"
                y="96"
                textAnchor="middle"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="700"
                fontSize="48"
                fill="url(#pm-logo-grad)"
            >
                PM
            </text>
        </svg>
    );
}
