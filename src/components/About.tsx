"use client";
import React from "react";
import Image from "next/image";
import { useReveal } from "./useReveal";
import styles from "./About.module.css";

export default function About() {
    const ref = useReveal();

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
                            <span>Feeding Futures</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.textCol} reveal-right`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>ABOUT US</span>
                    </div>
                    <h2 className={styles.heading}>
                        We Are Young{" "}
                        <span className="gradient-text">Changemakers</span>
                    </h2>
                    <p className={styles.description}>
                        Impano Initiative Funds is a movement of passionate young leaders
                        dedicated to helping children from underprivileged backgrounds
                        receive food at school, study in safety, and build a brighter
                        future.
                    </p>
                    <p className={styles.description}>
                        We believe that no student should attend school hungry, and every
                        child deserves the nutrition needed to learn, succeed, and become
                        a leader in their community.
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
                                <h4 className={styles.featureTitle}>School Meal Programs</h4>
                                <p className={styles.featureDesc}>Nutritious daily meals for students in need</p>
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
                                <h4 className={styles.featureTitle}>Safe Education</h4>
                                <p className={styles.featureDesc}>Creating secure learning environments</p>
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
                                <h4 className={styles.featureTitle}>Brighter Futures</h4>
                                <p className={styles.featureDesc}>Empowering the next generation of leaders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
