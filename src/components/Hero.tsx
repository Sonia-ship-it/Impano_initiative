"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useDonation } from "@/context/DonationContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

export default function Hero() {
    const { openModal } = useDonation();
    const { t } = useLanguage();
    const heroRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroRef.current.style.setProperty("--mouse-x", `${x}px`);
        heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <section 
            className={styles.hero} 
            id="home" 
            ref={heroRef}
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background Elements */}
            <div className={styles.bgOrbs}>
                <div className={styles.orb1} />
                <div className={styles.orb2} />
                <div className={styles.orb3} />
            </div>
            <div className={styles.gridOverlay} />

            <div className={styles.container}>
                <div className={styles.leftCol}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot} />
                        <span>{t("hero.badge")}</span>
                    </div>

                    <h1 className={styles.title}>
                        {t("hero.titleLine1")}
                        <br />
                        <span className="gradient-text">{t("hero.titleLine2")}</span>{t("hero.titleLine2Suffix")}
                        <br />
                        <span className={styles.greenText}>{t("hero.titleLine3")}</span>
                    </h1>

                    <p className={styles.subtitle}>
                        {t("hero.subtitle")}
                    </p>

                    <div className={styles.actions}>
                        <button onClick={openModal} className={styles.primaryBtn}>
                            <span>{t("hero.ctaPrimary")}</span>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <a href="#about" className={styles.secondaryBtn}>
                            <span>{t("hero.ctaSecondary")}</span>
                        </a>
                    </div>

                    {/* Stats Row */}
                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>500+</span>
                            <span className={styles.statLabel}>{t("hero.stat1")}</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>12</span>
                            <span className={styles.statLabel}>{t("hero.stat2")}</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>5</span>
                            <span className={styles.statLabel}>{t("hero.stat3")}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <div className={styles.interactiveShowcase}>
                        {/* Rotating SVG circular text */}
                        <div className={styles.circularTextWrapper}>
                            <svg viewBox="0 0 200 200" className={styles.circularText}>
                                <path 
                                    id="textCircle" 
                                    d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" 
                                    fill="none" 
                                    stroke="none"
                                />
                                <text>
                                    <textPath href="#textCircle" className={styles.textPath}>
                                        IMPANO INITIATIVE FUNDS • JOIN THE MOVEMENT • MAKING A DIFFERENCE •
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        {/* Hands Image Frame */}
                        <div className={styles.imageFrame}>
                            <div className={styles.imageOutline} />
                            <div className={styles.imageOutlineOuter} />
                            <div className={styles.imageInner}>
                                <Image
                                    src="/images/children.png"
                                    alt="Hands of unity and cooperation"
                                    width={400}
                                    height={400}
                                    className={styles.handsImage}
                                    priority
                                />
                            </div>
                        </div>

                        {/* Floating Glassmorphic Badges */}
                        <div className={`${styles.floatingBadge} ${styles.badgeLeft}`}>
                            <div className={styles.badgeIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className={styles.badgeInfo}>
                                <span className={styles.badgeTitle}>United Support</span>
                                <span className={styles.badgeDesc}>Community Driven</span>
                            </div>
                        </div>

                        <div className={`${styles.floatingBadge} ${styles.badgeRight}`}>
                            <div className={styles.badgeIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div className={styles.badgeInfo}>
                                <span className={styles.badgeTitle}>100% Secure</span>
                                <span className={styles.badgeDesc}>Transparent Funds</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollDot} />
                </div>
                <span>{t("hero.scroll")}</span>
            </div>
        </section>
    );
}
