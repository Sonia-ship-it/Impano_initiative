"use client";
import React from "react";
import { useReveal } from "./useReveal";
import styles from "./VisionMission.module.css";

export default function VisionMission() {
    const ref = useReveal();

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
                        <span>OUR PURPOSE</span>
                        <div className={styles.labelLine} />
                    </div>
                    <h2 className={styles.heading}>
                        Driven by <span className="gradient-text">Purpose</span>
                    </h2>
                    <p className={styles.headerSub}>
                        Our vision and mission guide every step we take toward a world
                        where every child can thrive.
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
                        <div className={styles.cardLabel}>VISION</div>
                        <h3 className={styles.cardTitle}>
                            A Future Without
                            <br />
                            <span className={styles.brandText}>Hungry Students</span>
                        </h3>
                        <p className={styles.cardText}>
                            To create a future where no student goes hungry in school, and
                            every child has the nourishment needed to reach their full
                            potential.
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
                        <div className={`${styles.cardLabel} ${styles.greenLabel}`}>MISSION</div>
                        <h3 className={styles.cardTitle}>
                            Empowering Through
                            <br />
                            <span className={styles.greenTextHighlight}>Nourishment</span>
                        </h3>
                        <p className={styles.cardText}>
                            We are young changemakers dedicated to helping children from
                            underprivileged backgrounds receive food at school, study in
                            safety, and build a brighter future.
                        </p>
                        <div className={`${styles.cardAccent} ${styles.greenAccent}`} />
                    </div>
                </div>
            </div>
        </section>
    );
}
