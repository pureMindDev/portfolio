import { useEffect, useRef, useState } from "react";

/**
 * Types out a full paragraph character-by-character while preserving the
 * paragraph's natural width and line wrapping. A hidden sizer holds the
 * final layout so typing only reveals characters — no reflow, no jump.
 *
 * Playback starts the first time the element scrolls into view and then
 * stays fully visible for the rest of the session.
 */
export default function ParagraphTypewriter({
    text,
    speed = 18,
    startDelay = 200,
    className = "",
}: {
    text: string;
    speed?: number;
    startDelay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [started, setStarted] = useState(false);
    const [count, setCount] = useState(0);

    // Kick off once the paragraph enters the viewport.
    useEffect(() => {
        const el = ref.current;
        if (!el || started) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setTimeout(() => setStarted(true), startDelay);
                    io.disconnect();
                }
            },
            { threshold: 0.25 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [started, startDelay]);

    // Reveal characters at a steady cadence.
    useEffect(() => {
        if (!started) return;
        if (count >= text.length) return;
        const t = setTimeout(() => setCount((c) => c + 1), speed);
        return () => clearTimeout(t);
    }, [started, count, text, speed]);

    const done = count >= text.length;
    const visible = text.slice(0, count);
    const hidden = text.slice(count);

    return (
        <p ref={ref} className={className} aria-label={text}>
            {/* Typed characters — real inline text so line-wrapping stays natural. */}
            <span aria-hidden={false}>{visible}</span>
            {/* Blinking caret while typing. */}
            {!done && (
                <span
                    aria-hidden
                    className="ml-[2px] inline-block h-[1em] w-[2px] translate-y-[0.15em] rounded-[1px] bg-[var(--brand-glow)] shadow-[0_0_8px_var(--brand-glow)] animate-pulse align-baseline"
                />
            )}
            {/* Invisible remainder reserves the paragraph's final width & height,
                so the layout is identical to the finished paragraph from frame 1. */}
            {!done && (
                <span aria-hidden style={{ visibility: "hidden" }}>
                    {hidden}
                </span>
            )}
        </p>
    );
}
