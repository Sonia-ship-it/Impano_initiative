"use client";
import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Vision", href: "#vision" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    const handleClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

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
                                <div className={styles.logoSub}>INITIATIVE FUNDS</div>
                            </div>
                        </div>
                        <p className={styles.brandDesc}>
                            Young changemakers dedicated to ensuring every child has a
                            nourished future and the chance to thrive.
                        </p>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>Quick Links</h4>
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
                        <h4 className={styles.colTitle}>Contact</h4>
                        <a
                            href="mailto:impanoinitiativefund@gmail.com"
                            className={styles.footerLink}
                        >
                            impanoinitiativefund@gmail.com
                        </a>
                        <span className={styles.footerLink}>Rwanda</span>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Impano Initiative Funds. All rights
                        reserved.
                    </p>
                    <p className={styles.madeWith}>
                        Made with{" "}
                        <span className={styles.heart}>♥</span> for the children
                    </p>
                </div>
            </div>
        </footer>
    );
}
