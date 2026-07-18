import { useEffect, useRef } from "react";

/**
 * Animated constellation / starfield background canvas.
 * Subtle, GPU-friendly, respects reduced motion.
 */
export default function StarField({ density = 60 }: { density?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf = 0;
        let w = 0;
        let h = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        type Star = { x: number; y: number; vx: number; vy: number; r: number };
        let stars: Star[] = [];

        const resize = () => {
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.floor((w * h) / (18000 - density * 100));
            stars = Array.from({ length: Math.max(24, count) }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                r: Math.random() * 1.2 + 0.3,
            }));
        };

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };
        const onLeave = () => {
            mouse.current.x = -9999;
            mouse.current.y = -9999;
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            // stars
            for (const s of stars) {
                s.x += s.vx;
                s.y += s.vy;
                if (s.x < 0 || s.x > w) s.vx *= -1;
                if (s.y < 0 || s.y > h) s.vy *= -1;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(196, 181, 253, 0.6)";
                ctx.fill();
            }
            // constellation lines
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const a = stars[i];
                    const b = stars[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < 120) {
                        ctx.strokeStyle = `rgba(124, 58, 237, ${(1 - d / 120) * 0.22})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
                // mouse link
                const mx = mouse.current.x;
                const my = mouse.current.y;
                const dm = Math.hypot(stars[i].x - mx, stars[i].y - my);
                if (dm < 160) {
                    ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dm / 160) * 0.55})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(mx, my);
                    ctx.stroke();
                }
            }
            raf = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
        };
    }, [density]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        />
    );
}
