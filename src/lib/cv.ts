import { jsPDF } from "jspdf";

/**
 * Generate a clean, single-page CV as a downloadable PDF.
 * Uses jsPDF (client-side only). Called from Hero/Footer buttons.
 * Only verified, real information. Nothing invented.
 */
export function downloadCV() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = 64;

    // Header
    doc.setFillColor(10, 8, 22);
    doc.rect(0, 0, pageW, 110, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Badmus Abdul Basit", margin, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(147, 197, 253);
    doc.text("Pure Mind  ·  Full Stack Developer", margin, 74);
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(9);
    doc.text(
        "badmusabdulbasit932@gmail.com  ·  +234 701 747 0501  ·  github.com/pureMindDev",
        margin,
        94,
    );

    y = 150;
    doc.setTextColor(30, 30, 30);

    const section = (title: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(37, 99, 235);
        doc.text(title.toUpperCase(), margin, y);
        doc.setDrawColor(37, 99, 235);
        doc.line(margin, y + 4, pageW - margin, y + 4);
        y += 20;
        doc.setTextColor(30, 30, 30);
    };

    const para = (text: string) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(text, pageW - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 6;
    };

    const bullet = (text: string) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(text, pageW - margin * 2 - 14);
        doc.text("•", margin, y);
        doc.text(lines, margin + 12, y);
        y += lines.length * 13 + 2;
    };

    section("Profile");
    para(
        "I design and build full stack web applications with React, Node.js, Express and MongoDB, from the interface down to the database.",
    );

    section("Skills");
    para(
        "React · JavaScript · Node.js · Express.js · MongoDB · HTML5 · CSS3 · Sass · Git · GitHub · REST APIs · Framer Motion · Vite",
    );

    section("Projects");
    bullet("Lost & Found NG: lost-and-found-ng.vercel.app");
    bullet("Mublat Bake & Blends: mublatbakeandblends-azure.vercel.app");
    bullet("JobFinder: jobfinder-beta.vercel.app");
    bullet("Audiophile: audiophile-kappa-mauve.vercel.app");
    bullet("Movie App: movie-pure-mind.vercel.app");
    bullet("Sameday Laundry: samedaylaundry.vercel.app");

    doc.save("Badmus-Abdul-Basit-Pure-Mind-CV.pdf");
}
