"use client";
import React from "react";
import Image from "next/image";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./About.module.css";

export default function About() {
    const ref = useReveal();
    const { t } = useLanguage();

    return (
        <section className={styles.about} id="about" ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.imageCol} reveal-left`}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageCard}>
                            <Image
                                src="/images/logo.png"
                                alt="Impano Initiative"
                                width={400}
                                height={400}
                                className={styles.aboutImage}
                            />
                        </div>
                        {/* Decorative accents */}
                        <div className={styles.accent1} />
                        <div className={styles.accent2} />
                        <div className={styles.floatingCard}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span>{t("about.badge")}</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.textCol} reveal-right`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>{t("about.label")}</span>
                    </div>
                    <h2 className={styles.heading}>
                        {t("about.heading")}
                        <span className="gradient-text">{t("about.headingSpan")}</span>
                    </h2>
                    <p className={styles.description}>
                        {t("about.desc1")}
                    </p>
                    <p className={styles.description}>
                        {t("about.desc2")}
                    </p>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.featureTitle}>{t("about.f1Title")}</h4>
                                <p className={styles.featureDesc}>{t("about.f1Desc")}</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.featureTitle}>{t("about.f2Title")}</h4>
                                <p className={styles.featureDesc}>{t("about.f2Desc")}</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.featureTitle}>{t("about.f3Title")}</h4>
                                <p className={styles.featureDesc}>{t("about.f3Desc")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
