"use client";
import React from "react";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Programs.module.css";

export default function Programs() {
    const ref = useReveal();
    const { t } = useLanguage();

    const programsList = [
        {
            title: t("about.f1Title"),
            description: t("about.f1Desc"),
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
            ),
            color: "#f09620"
        },
        {
            title: t("about.f2Title"),
            description: t("about.f2Desc"),
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
            color: "#3a9948"
        },
        {
            title: t("about.f3Title"),
            description: t("about.f3Desc"),
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            color: "#f09620"
        }
    ];

    return (
        <section className={styles.section} id="programs" ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>{t("programs.label")}</span>
                        <div className={styles.labelLine} />
                    </div>
                    <h2 className={styles.heading}>
                        {t("programs.heading")} <span className="gradient-text">{t("programs.headingSpan")}</span>
                    </h2>
                    <p className={styles.sub}>
                        {t("programs.p2Desc")}
                    </p>
                </div>

                <div className={styles.grid}>
                    {programsList.map((prog, i) => (
                        <div
                            key={i}
                            className={`${styles.card} reveal`}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at top right, ${prog.color}15, transparent)` }} />
                            <div className={styles.iconBox} style={{ backgroundColor: `${prog.color}08`, borderColor: `${prog.color}20` }}>
                                {prog.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{prog.title}</h3>
                            <p className={styles.cardDesc}>{prog.description}</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.dot} style={{ backgroundColor: prog.color }} />
                                <span>{t("about.badge")}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
