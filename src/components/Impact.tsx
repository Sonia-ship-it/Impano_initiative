"use client";
import React, { useEffect, useState, useRef } from "react";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Impact.module.css";

interface CounterProps {
    end: number;
    suffix?: string;
    duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = performance.now();
                    const animate = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export default function Impact() {
    const ref = useReveal();
    const { t } = useLanguage();

    const stats = [
        {
            number: 500,
            suffix: "+",
            label: t("impact.childrenFed"),
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
        },
        {
            number: 12,
            suffix: "",
            label: t("impact.schools"),
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
            ),
        },
        {
            number: 1000,
            suffix: "+",
            label: t("impact.meals"),
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
            ),
        },
        {
            number: 5,
            suffix: "",
            label: t("impact.team"),
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
    ];

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>{t("impact.label")}</span>
                        <div className={styles.labelLine} />
                    </div>
                    <h2 className={styles.heading}>
                        {t("impact.heading")} <span className="gradient-text">{t("impact.headingSpan")}</span>
                    </h2>
                </div>

                <div className={styles.grid}>
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`${styles.statCard} reveal`}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className={styles.iconWrap}>{stat.icon}</div>
                            <div className={styles.statNumber}>
                                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                            <div className={styles.statGlow} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
