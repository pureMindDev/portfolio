import "../../styles/aurora.scss";

/**
 * Slow-drifting blurred gradient blobs, screen-blended over the dark
 * background: the "aurora" effect used behind the Hero.
 */
export default function Aurora() {
    return (
        <div className="aurora" aria-hidden>
            <span className="aurora__blob aurora__blob--one" />
            <span className="aurora__blob aurora__blob--two" />
            <span className="aurora__blob aurora__blob--three" />
        </div>
    );
}
