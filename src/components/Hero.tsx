"use client";
import React from "react";
import { useDonation } from "@/context/DonationContext";
import styles from "./Hero.module.css";

export default function Hero() {
    const { openModal } = useDonation();
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
                    <span>Young Changemakers for a Brighter Future</span>
                </div>

                <h1 className={styles.title}>
                    Nourishing Young
                    <br />
                    <span className="gradient-text">Minds</span>, Building
                    <br />
                    <span className={styles.greenText}>Brighter Futures</span>
                </h1>

                <p className={styles.subtitle}>
                    We are dedicated to helping children from underprivileged backgrounds
                    receive food at school, study in safety, and build a brighter future
                    — because every child deserves the chance to thrive.
                </p>

                <div className={styles.actions}>
                    <button onClick={openModal} className={styles.primaryBtn}>
                        <span>Join Our Mission</span>
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
                        <span>Learn More</span>
                    </a>
                </div>

                {/* Stats Row */}
                <div className={styles.statsRow}>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>500+</span>
                        <span className={styles.statLabel}>Children Fed</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.stat}>
                        <span className={styles.statNum}>12</span>
                        <span className={styles.statLabel}>Schools Reached</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.stat}>
                        <span className={styles.statNum}>5</span>
                        <span className={styles.statLabel}>Team Members</span>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollDot} />
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
