"use client";
import React from "react";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./VisionMission.module.css";

export default function VisionMission() {
    const ref = useReveal();
    const { t } = useLanguage();

    return (
        <section className={styles.section} id="vision" ref={ref}>
            {/* Background decoration */}
            <div className={styles.bgDecor}>
                <div className={styles.bgLine1} />
                <div className={styles.bgLine2} />
            </div>

            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>{t("vision.vLabel")}</span>
                        <div className={styles.labelLine} />
                    </div>
                    <h2 className={styles.heading}>
                        {t("vision.vLabel").split(' & ')[0]} <span className="gradient-text">{t("vision.vLabel").split(' & ')[1]}</span>
                    </h2>
                    <p className={styles.headerSub}>
                        {t("vision.vDesc").slice(0, 80)}...
                    </p>
                </div>

                <div className={styles.cards}>
                    <div className={`${styles.card} ${styles.visionCard} reveal-left`}>
                        <div className={styles.cardGlow} />
                        <div className={styles.cardIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="2" />
                                <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7" />
                            </svg>
                        </div>
                        <div className={styles.cardLabel}>{t("vision.vTitle").toUpperCase()}</div>
                        <h3 className={styles.cardTitle}>
                            {t("vision.vTitle")}
                        </h3>
                        <p className={styles.cardText}>
                            {t("vision.vDesc")}
                        </p>
                        <div className={styles.cardAccent} />
                    </div>

                    <div className={`${styles.card} ${styles.missionCard} reveal-right`}>
                        <div className={styles.cardGlow} />
                        <div className={styles.cardIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <div className={`${styles.cardLabel} ${styles.greenLabel}`}>{t("vision.mTitle").toUpperCase()}</div>
                        <h3 className={styles.cardTitle}>
                            {t("vision.mTitle")}
                        </h3>
                        <p className={styles.cardText}>
                            {t("vision.mDesc")}
                        </p>
                        <div className={`${styles.cardAccent} ${styles.greenAccent}`} />
                    </div>
                </div>
            </div>
        </section>
    );
}
