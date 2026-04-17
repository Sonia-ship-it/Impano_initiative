"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Navbar.module.css";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Vision", href: "#vision" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);

            // Determine active section
            const sections = navLinks.map((l) => l.href.replace("#", ""));
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
                        <span className={styles.logoSub}>INITIATIVE FUNDS</span>
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
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick("#contact");
                        }}
                    >
                        Donate Now
                    </a>
                </div>

                <div className="flex items-center gap-4">
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
                {navLinks.map((link) => (
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
                        {link.label}
                    </a>
                ))}
                <a
                    href="#donate"
                    className={styles.mobileDonate}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("#contact");
                    }}
                >
                    Donate Now
                </a>
            </div>
        </nav>
    );
}
