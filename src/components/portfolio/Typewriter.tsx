import { useEffect, useState } from "react";
import "../../styles/typewriter.scss";

/**
 * Types each word out character by character, pauses, deletes it
 * character by character, then moves to the next word — forever.
 * A real typewriter loop, not a crossfade between full strings.
 */
export default function Typewriter({
    words,
    typingSpeed = 65,
    deletingSpeed = 35,
    pauseAfterType = 1400,
    pauseAfterDelete = 300,
    className = "",
}: {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseAfterType?: number;
    pauseAfterDelete?: number;
    className?: string;
}) {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

    useEffect(() => {
        const current = words[wordIndex % words.length];
        let timeout: ReturnType<typeof setTimeout>;

        if (phase === "typing") {
            if (text.length < current.length) {
                timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
            } else {
                timeout = setTimeout(() => setPhase("pausing"), pauseAfterType);
            }
        } else if (phase === "pausing") {
            timeout = setTimeout(() => setPhase("deleting"), 0);
        } else if (phase === "deleting") {
            if (text.length > 0) {
                timeout = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
            } else {
                timeout = setTimeout(() => setPhase("waiting"), pauseAfterDelete);
            }
        } else if (phase === "waiting") {
            timeout = setTimeout(() => {
                setWordIndex((i) => (i + 1) % words.length);
                setPhase("typing");
            }, 0);
        }

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, phase, wordIndex]);

    return (
        <span className={`typewriter inline-flex ${className}`}>
            <span>{text}</span>
            <span className="typewriter__caret">&nbsp;</span>
        </span>
    );
}
