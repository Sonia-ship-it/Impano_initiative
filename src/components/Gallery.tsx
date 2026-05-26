"use client";
import React from "react";
import Image from "next/image";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Gallery.module.css";

export default function Gallery() {
    const ref = useReveal();
    const { t } = useLanguage();

    const images = [
        { src: "/images/children.png", alt: "Children supported by the initiative" },
        { src: "/images/hands.jpg", alt: "Hands joined together in unity" },
        // Fallback placeholders that look premium and relevant
        { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800", alt: "Charity event" },
        { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", alt: "Community gathering" },
        { src: "https://images.unsplash.com/photo-1593113580332-ceb48866e4ca?auto=format&fit=crop&q=80&w=800", alt: "Educational support" },
        { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", alt: "School kids" }
    ];

    return (
        <section className={styles.section} id="gallery" ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>{t("gallery.label")}</span>
                        <div className={styles.labelLine} />
                    </div>
                    <h2 className={styles.heading}>
                        {t("gallery.heading")} <span className="gradient-text">{t("gallery.headingSpan")}</span>
                    </h2>
                    <p className={styles.sub}>
                        {t("gallery.p2Desc")}
                    </p>
                </div>

                <div className={styles.galleryGrid}>
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`${styles.galleryItem} reveal`}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className={styles.imageOverlay}>
                                    <div className={styles.overlayContent}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
