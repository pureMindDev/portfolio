import { motion } from "framer-motion";
import { Github, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import Section from "./Section";
import Magnetic from "./Magnetic";
import { toast } from "sonner";

export default function Contact() {
    const [sending, setSending] = useState(false);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = String(data.get("email") || "");
        const message = String(data.get("message") || "");
        const consent = data.get("consent");
        if (!email || !message || !consent) {
            toast.error("Please fill everything and confirm consent.");
            return;
        }
        setSending(true);
        const subject = encodeURIComponent("New portfolio inquiry");
        const body = encodeURIComponent(`From: ${email}\n\n${message}`);
        window.location.href = `mailto:badmusabdulbasit932@gmail.com?subject=${subject}&body=${body}`;
        setTimeout(() => {
            setSending(false);
            form.reset();
            toast.success("Opening your mail app…");
        }, 600);
    };

    return (
        <Section
            id="contact"
            eyebrow="Get in touch"
            title="Let's build something premium"
            subtitle="Use the form or reach out directly — I usually reply within a day."
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.form
                    onSubmit={submit}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="glass elegant-shadow tracing-border rounded-2xl p-6 md:p-8"
                >
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Your email
                    </label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/30"
                    />
                    <label className="mt-5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Message
                    </label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project…"
                        className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/30"
                    />
                    <label className="mt-4 flex items-start gap-2 text-[12px] text-muted-foreground">
                        <input
                            name="consent"
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 accent-[color:var(--brand)]"
                        />
                        I confirm the information above is accurate and I'd like to be contacted.
                    </label>
                    <Magnetic strength={0.3}>
                        <button
                            disabled={sending}
                            data-cursor="hover"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-glow px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-[0_0_25px_-8px_var(--brand)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                        >
                            {sending ? "Sending…" : (<>Send message <Send className="h-3.5 w-3.5" /></>)}
                        </button>
                    </Magnetic>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-3"
                >
                    <ContactCard
                        icon={<Mail className="h-5 w-5" />}
                        title="Email"
                        value="badmusabdulbasit932@gmail.com"
                        href="mailto:badmusabdulbasit932@gmail.com"
                        cta="Send email"
                    />
                    <ContactCard
                        icon={<Phone className="h-5 w-5" />}
                        title="Phone"
                        value="+234 701 747 0501"
                        href="tel:+2347017470501"
                        cta="Call now"
                    />
                    <ContactCard
                        icon={<MessageCircle className="h-5 w-5" />}
                        title="WhatsApp"
                        value="Chat instantly on WhatsApp"
                        href="https://wa.me/2347017470501"
                        cta="Open chat"
                    />
                    <ContactCard
                        icon={<Github className="h-5 w-5" />}
                        title="GitHub"
                        value="pureMindDev"
                        href="https://github.com/pureMindDev"
                        cta="Follow"
                    />
                </motion.div>
            </div>
        </Section>
    );
}

function ContactCard({
    icon,
    title,
    value,
    href,
    cta,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    href: string;
    cta: string;
}) {
    return (
        <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group tracing-border tracing-border-hover flex items-center justify-between rounded-2xl glass elegant-shadow p-5 transition-transform hover:-translate-y-0.5"
        >
            <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand/5 text-brand">
                    {icon}
                </div>
                <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {title}
                    </div>
                    <div className="mt-0.5 text-sm">{value}</div>
                </div>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-muted-foreground group-hover:bg-brand/20 group-hover:text-foreground">
                {cta}
            </span>
        </a>
    );
}
