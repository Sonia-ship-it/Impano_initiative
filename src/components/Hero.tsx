"use client";
import React from "react";
import { useDonation } from "@/context/DonationContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

export default function Hero() {
    const { openModal } = useDonation();
    const { t } = useLanguage();

    return (
        <section className={styles.hero} id="home">
            {/* Animated Background Elements */}
            <div className={styles.bgOrbs}>
                <div className={styles.orb1} />
                <div className={styles.orb2} />
                <div className={styles.orb3} />
            </div>
            <div className={styles.gridOverlay} />

            <div className={styles.content}>
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
