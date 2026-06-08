"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { initiativeContact, type SocialPlatform } from "@/config/social";
import styles from "./Footer.module.css";

const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
    switch (platform) {
        case "Instagram":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                </svg>
            );
        case "Twitter":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            );
        case "TikTok":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
            );
        case "LinkedIn":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.065 2.065 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            );
    }
};

export default function Footer() {
    const { t } = useLanguage();
    const handleClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const navLinks = [
        { label: t("nav.home"), href: "#home" },
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.vision"), href: "#vision" },
        { label: t("nav.team"), href: "#team" },
        { label: t("nav.contact"), href: "#contact" },
    ];

    const marqueeItems = [
        "Nourishing Futures",
        "Empowering Children",
        "Rwanda",
        "Community Impact",
        "Impano Initiative",
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.watermark} aria-hidden="true">IMPANO</div>
            <div className={styles.topBorder} />

            <div className={styles.marquee}>
                <div className={styles.marqueeTrack}>
                    {[...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span key={i} className={styles.marqueeItem}>
                            {item}
                            <span className={styles.marqueeDot} />
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <div className={styles.logoRow}>
                            <div className={styles.logoFrame}>
                                <Image
                                    src="/images/logo.png"
                                    alt="Impano Initiative Funds"
                                    width={44}
                                    height={44}
                                    className={styles.logoImg}
                                />
                            </div>
                            <div>
                                <div className={`${styles.logoTitle} display-text`}>IMPANO</div>
                                <div className={styles.logoSub}>
                                    {t("footer.tagline").split("IMPANO ")[1] || "INITIATIVE FUNDS"}
                                </div>
                            </div>
                        </div>
                        <p className={styles.brandDesc}>
                            {t("about.desc1").slice(0, 120)}...
                        </p>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>{t("programs.label")}</h4>
                        <nav className={styles.navList}>
                            {navLinks.map((link, i) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={styles.footerLink}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(link.href);
                                    }}
                                >
                                    <span className={styles.linkIndex}>0{i + 1}</span>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className={styles.contactCol}>
                        <h4 className={styles.colTitle}>{t("nav.contact")}</h4>
                        <a
                            href={`mailto:${initiativeContact.email}`}
                            className={styles.emailLink}
                        >
                            {initiativeContact.email}
                        </a>
                        <span className={styles.locationTag}>
                            <span className={styles.locationDot} />
                            {initiativeContact.location}
                        </span>
                    </div>
                </div>

                <div className={styles.socialDock}>
                    <span className={styles.dockLabel}>Connect</span>
                    <div className={styles.dockIcons}>
                        {initiativeContact.social.map((item) => (
                            <a
                                key={item.platform}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.dockIcon}
                                style={{
                                    "--dock-accent": item.accent,
                                    "--dock-rgb": item.accentRgb,
                                } as React.CSSProperties}
                                aria-label={`${item.platform}: ${item.label}`}
                                title={item.label}
                            >
                                <SocialIcon platform={item.platform} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} {t("footer.tagline")}. {t("footer.rights")}
                    </p>
                    <div className={styles.bottomLinks}>
                        <p className={styles.madeWith}>{t("footer.subTagline")}</p>
                        <a href="/admin" className={styles.adminLink}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span>Login</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
