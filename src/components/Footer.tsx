"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

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

    return (
        <footer className={styles.footer}>
            <div className={styles.topBorder} />
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <div className={styles.logoRow}>
                            <Image
                                src="/images/logo.png"
                                alt="Impano Initiative Funds"
                                width={44}
                                height={44}
                                className={styles.logoImg}
                            />
                            <div>
                                <div className={styles.logoTitle}>IMPANO</div>
                                <div className={styles.logoSub}>{t("footer.tagline").split('IMPANO ')[1] || "INITIATIVE FUNDS"}</div>
                            </div>
                        </div>
                        <p className={styles.brandDesc}>
                            {t("about.desc1").slice(0, 120)}...
                        </p>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>{t("programs.label")}</h4>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={styles.footerLink}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(link.href);
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className={styles.contactCol}>
                        <h4 className={styles.colTitle}>{t("nav.contact")}</h4>
                        <a
                            href="mailto:uwasesonia43@gmail.com"
                            className={styles.footerLink}
                        >
                            uwasesonia43@gmail.com
                        </a>
                        <span className={styles.footerLink}>Rwanda</span>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} {t("footer.tagline")}. {t("footer.rights")}
                    </p>
                    <p className={styles.madeWith}>
                        {t("footer.subTagline")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
