"use client";
import React, { useState } from "react";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import { initiativeContact, type SocialPlatform } from "@/config/social";
import styles from "./Contact.module.css";

const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
    switch (platform) {
        case "Instagram":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
            );
        case "Twitter":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            );
        case "TikTok":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
            );
        case "LinkedIn":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.065 2.065 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            );
    }
};

export default function Contact() {
    const ref = useReveal();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [activeChannel, setActiveChannel] = useState<SocialPlatform | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "92f0d53d-d05b-4aad-8597-fca33422b381",
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `New Message from ${formData.name} - Impano Initiative`,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }

        setTimeout(() => setStatus("idle"), 7000);
    };

    return (
        <section className={styles.section} id="contact" ref={ref}>
            <div className={styles.meshBg} />
            <div className={styles.orbA} />
            <div className={styles.orbB} />
            <div className={styles.gridLines} />

            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionIndex}>04</div>
                    <div className={styles.headerContent}>
                        <div className={styles.sectionLabel}>
                            <span className={styles.labelPulse} />
                            <span>{t("contact.label")}</span>
                        </div>
                        <h2 className={`${styles.heading} display-text`}>
                            {t("contact.heading")}{" "}
                            <span className="gradient-text">{t("contact.headingSpan")}</span>
                        </h2>
                        <p className={styles.headerSub}>{t("contact.sub")}</p>
                    </div>
                </div>

                <div className={styles.stage}>
                    {/* Bento contact hub */}
                    <div className={`${styles.bento} reveal-left`}>
                        <a
                            href={`mailto:${initiativeContact.email}`}
                            className={styles.emailTile}
                        >
                            <span className={styles.tileTag}>Direct Line</span>
                            <span className={`${styles.emailDisplay} display-text`}>
                                {initiativeContact.email}
                            </span>
                            <span className={styles.tileAction}>
                                Send a signal
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                            <div className={styles.tileGlow} />
                        </a>

                        <div className={styles.locationTile}>
                            <div className={styles.coordsRing}>
                                <span className={styles.coordsDot} />
                            </div>
                            <div>
                                <span className={styles.tileTag}>Base</span>
                                <p className={`${styles.locationName} display-text`}>
                                    {initiativeContact.location}
                                </p>
                                <p className={styles.coords}>{initiativeContact.coords}</p>
                            </div>
                        </div>

                        <div className={styles.socialHub}>
                            <div className={styles.hubHeader}>
                                <span className={styles.tileTag}>Channels</span>
                                <span className={styles.hubLive}>
                                    <span className={styles.liveDot} />
                                    Live
                                </span>
                            </div>
                            <div className={styles.channelGrid}>
                                {initiativeContact.social.map((item, i) => (
                                    <a
                                        key={item.platform}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.channel} ${activeChannel === item.platform ? styles.channelActive : ""}`}
                                        style={{
                                            "--ch-accent": item.accent,
                                            "--ch-rgb": item.accentRgb,
                                            "--ch-delay": `${i * 0.08}s`,
                                        } as React.CSSProperties}
                                        onMouseEnter={() => setActiveChannel(item.platform)}
                                        onMouseLeave={() => setActiveChannel(null)}
                                    >
                                        <span className={styles.channelIndex}>{item.shortLabel}</span>
                                        <span className={styles.channelIcon}>
                                            <SocialIcon platform={item.platform} />
                                        </span>
                                        <span className={styles.channelPlatform}>{item.platform}</span>
                                        <span className={styles.channelLabel}>{item.label}</span>
                                        <span className={styles.channelArrow}>↗</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Transmission form */}
                    <form
                        className={`${styles.transmission} reveal-right`}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.transmissionHeader}>
                            <div>
                                <span className={styles.tileTag}>Transmission</span>
                                <h3 className={`${styles.formTitle} display-text`}>Drop us a line</h3>
                            </div>
                            <div className={styles.signalBars}>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{ animationDelay: `${i * 0.15}s` }} />
                                ))}
                            </div>
                        </div>

                        <div className={styles.fieldRow}>
                            <span className={styles.fieldIndex}>01</span>
                            <div className={styles.fieldWrap}>
                                <label htmlFor="contact-name" className={styles.label}>
                                    {t("contact.formName")}
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t("contact.formNamePlaceholder")}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.fieldRow}>
                            <span className={styles.fieldIndex}>02</span>
                            <div className={styles.fieldWrap}>
                                <label htmlFor="contact-email" className={styles.label}>
                                    {t("contact.formEmail")}
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t("contact.formEmailPlaceholder")}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.fieldRow}>
                            <span className={styles.fieldIndex}>03</span>
                            <div className={styles.fieldWrap}>
                                <label htmlFor="contact-message" className={styles.label}>
                                    {t("contact.formMessage")}
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t("contact.formMessagePlaceholder")}
                                    rows={5}
                                    required
                                    className={styles.textarea}
                                />
                            </div>
                        </div>

                        {status === "success" && (
                            <div className={styles.successMessage}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span>{t("contact.success")}</span>
                            </div>
                        )}
                        {status === "error" && (
                            <div className={styles.errorMessage}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{t("contact.error")}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            id="contact-submit"
                            disabled={status === "loading"}
                        >
                            <span className={styles.btnText}>
                                {status === "loading" ? t("contact.sending") : t("contact.formSubmit")}
                            </span>
                            <span className={styles.btnIcon}>
                                {status === "loading" ? (
                                    <div className={styles.spinner} />
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
