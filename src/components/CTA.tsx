"use client";
import React from "react";
import { useReveal } from "./useReveal";
import { useDonation } from "@/context/DonationContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./CTA.module.css";

export default function CTA() {
    const ref = useReveal();
    const { openModal } = useDonation();
    const { t } = useLanguage();

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.bgGradients}>
                <div className={styles.bgGrad1} />
                <div className={styles.bgGrad2} />
            </div>
            <div className={`${styles.container} reveal`}>
                <div className={styles.inner}>
                    <div className={styles.glowTop} />
                    <div className={styles.content}>
                        <h2 className={styles.heading}>
                            {t("cta.heading")}
                            <br />
                            <span className="gradient-text">{t("cta.headingSpan")}</span>
                        </h2>
                        <p className={styles.text}>
                            {t("cta.sub")}
                        </p>
                        <div className={styles.actions}>
                            <button onClick={openModal} className={styles.primaryBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <span>{t("cta.donate")}</span>
                            </button>
                            <a href="#contact" className={styles.secondaryBtn}>
                                <span>{t("cta.volunteer")}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
