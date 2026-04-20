"use client";
import React, { useState } from "react";
import { useReveal } from "./useReveal";
import styles from "./Contact.module.css";

export default function Contact() {
    const ref = useReveal();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

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

        // Reset status after a few seconds
        setTimeout(() => setStatus("idle"), 7000);
    };

    return (
        <section className={styles.section} id="contact" ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>CONTACT US</span>
                        <div className={styles.labelLine} />
                    </div>
                    <h2 className={styles.heading}>
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <p className={styles.headerSub}>
                        Have questions or want to support our mission? Reach out — we&apos;d
                        love to hear from you.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Contact Info Cards */}
                    <div className={`${styles.infoCol} reveal-left`}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.infoLabel}>Email</h4>
                                <a
                                    href="mailto:uwasesonia43@gmail.com"
                                    className={styles.infoValue}
                                >
                                    uwasesonia43@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.infoLabel}>Location</h4>
                                <p className={styles.infoValue}>Rwanda</p>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.infoLabel}>Our Cause</h4>
                                <p className={styles.infoValue}>Feeding futures, one meal at a time</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        className={`${styles.form} reveal-right`}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="contact-name" className={styles.label}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="contact-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="contact-email" className={styles.label}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="contact-email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="contact-message" className={styles.label}>
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                rows={5}
                                required
                                className={styles.textarea}
                            />
                        </div>
                        {status === "success" && (
                            <div className={styles.successMessage}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span>Thank you! Your message has been sent successfully.</span>
                            </div>
                        )}
                        {status === "error" && (
                            <div className={styles.errorMessage}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>Something went wrong. Please try again or email us directly.</span>
                            </div>
                        )}
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            id="contact-submit"
                            disabled={status === "loading"}
                        >
                            <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                            {status === "loading" ? (
                                <div className={styles.spinner} />
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
