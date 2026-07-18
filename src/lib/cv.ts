import { jsPDF } from "jspdf";

/**
 * Generate a clean, single-page CV as a downloadable PDF.
 * Uses jsPDF (client-side only). Called from Hero/Footer buttons.
 * Only verified, real information — nothing invented.
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
    doc.setTextColor(196, 181, 253);
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
        doc.setTextColor(124, 58, 237);
        doc.text(title.toUpperCase(), margin, y);
        doc.setDrawColor(124, 58, 237);
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

    const role = (title: string, org: string, period: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(title, margin, y);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(110, 110, 110);
        doc.text(period, pageW - margin, y, { align: "right" });
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(70, 70, 70);
        doc.text(org, margin, y);
        y += 14;
        doc.setTextColor(30, 30, 30);
    };

    section("Profile");
    para(
        "Full Stack Developer building web applications with React, Node.js, Express and MongoDB. Started coding in 2025 and has been shipping projects since.",
    );

    section("Skills");
    para(
        "React · JavaScript · Node.js · Express.js · MongoDB · HTML5 · CSS3 · Sass · Git · GitHub · REST APIs · Framer Motion · Vite",
    );

    section("Experience");
    role("Full Stack Developer", "Personal & freelance projects", "2025 — Present");
    bullet("Started coding in 2025, learning and building as a Full Stack Developer.");
    bullet("Ships and deploys real projects with React, Node.js, Express and MongoDB.");

    section("Projects");
    bullet("Lost & Found NG — lost-and-found-ng.vercel.app");
    bullet("Mublat Bake & Blends — mublatbakeandblends-azure.vercel.app");
    bullet("JobFinder — jobfinder-beta.vercel.app");
    bullet("Audiophile — audiophile-kappa-mauve.vercel.app");
    bullet("Sameday Laundry — samedaylaundry.vercel.app");

    doc.save("Badmus-Abdul-Basit-Pure-Mind-CV.pdf");
}
