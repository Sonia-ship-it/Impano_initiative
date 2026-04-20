"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useDonation } from "@/context/DonationContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { openModal } = useDonation();

    const navLinks = [
        { label: t("nav.home"), href: "#home" },
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.programs"), href: "#programs" },
        { label: t("nav.vision"), href: "#vision" },
        { label: t("nav.team"), href: "#team" },
        { label: t("nav.contact"), href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);

            // Determine active section
            const sections = ["home", "about", "programs", "vision", "team", "contact"];
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleDonateClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMobileOpen(false);
        openModal();
    };

    return (
        <nav
            className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
            id="navbar"
        >
            <div className={styles.inner}>
                <a href="#home" className={styles.logo} onClick={() => handleClick("#home")}>
                    <Image
                        src="/images/logo.png"
                        alt="Impano Initiative Funds"
                        width={48}
                        height={48}
                        className={styles.logoImg}
                    />
                    <div className={styles.logoText}>
                        <span className={styles.logoTitle}>IMPANO</span>
                        <span className={styles.logoSub}>{t("footer.tagline").split('IMPANO ')[1] || "INITIATIVE FUNDS"}</span>
                    </div>
                </a>

                <div className={styles.desktopLinks}>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${activeSection === link.href.replace("#", "")
                                ? styles.activeLink
                                : ""
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(link.href);
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#donate"
                        className={styles.donateBtn}
                        onClick={handleDonateClick}
                    >
                        {t("nav.donate")}
                    </a>
                </div>

                <div className={styles.controls}>
                    <LanguageSwitcher />
                    <ThemeToggle />

                    <button
                        className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        id="nav-hamburger"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ""}`}
            >
                <div className={styles.menuContent}>
                    {navLinks.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`${styles.mobileLink} ${activeSection === link.href.replace("#", "")
                                ? styles.activeMobile
                                : ""
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(link.href);
                            }}
                        >
                            <span className={styles.linkNum}>0{index + 1}</span>
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#donate"
                        className={styles.mobileDonate}
                        onClick={handleDonateClick}
                    >
                        {t("nav.donate")}
                    </a>
                </div>

                <div className={styles.menuFooter}>
                    <div className={styles.footerLabel}>{t("footer.tagline")}</div>
                    <div className={styles.logoText} style={{ alignItems: 'center' }}>
                        <span className={styles.logoTitle} style={{ fontSize: '14px' }}>IMPANO</span>
                        <span className={styles.logoSub} style={{ fontSize: '8px' }}>{t("footer.tagline").split('IMPANO ')[1] || "INITIATIVE FUNDS"}</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
