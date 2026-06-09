"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Gallery.module.css";

export default function Gallery() {
    const ref = useReveal();
    const { t } = useLanguage();
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const response = await fetch("/api/gallery", {
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache",
                },
            });
            const data = await response.json();
            
            // Always use API data, with fallback to default images
            if (data.items && data.items.length > 0) {
                setItems(data.items);
            } else {
                setItems([
                    { id: "1", type: "image", title: "Children supported by the initiative", url: "/images/children.png" },
                    { id: "2", type: "image", title: "Hands joined together in unity", url: "/images/hands.jpg" },
                    { id: "3", type: "image", title: "Charity event", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" },
                    { id: "4", type: "image", title: "Community gathering", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800" },
                    { id: "5", type: "image", title: "Educational support", url: "https://images.unsplash.com/photo-1593113580332-ceb48866e4ca?auto=format&fit=crop&q=80&w=800" },
                    { id: "6", type: "image", title: "School kids", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" }
                ]);
            }
        } catch (error) {
            console.error("Error fetching gallery items:", error);
            // Use default images on error
            setItems([
                { id: "1", type: "image", title: "Children supported by the initiative", url: "/images/children.png" },
                { id: "2", type: "image", title: "Hands joined together in unity", url: "/images/hands.jpg" },
                { id: "3", type: "image", title: "Charity event", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" },
                { id: "4", type: "image", title: "Community gathering", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800" },
                { id: "5", type: "image", title: "Educational support", url: "https://images.unsplash.com/photo-1593113580332-ceb48866e4ca?auto=format&fit=crop&q=80&w=800" },
                { id: "6", type: "image", title: "School kids", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

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

                {isLoading ? (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner} />
                        <p>Loading gallery...</p>
                    </div>
                ) : (
                    <div className={styles.galleryGrid}>
                        {items.map((item, i) => (
                            <div
                                key={item.id}
                                className={styles.galleryItem}
                                style={{ transitionDelay: `${i * 0.1}s` }}
                            >
                                {item.type === "video" ? (
                                    <div className={styles.videoWrapper}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${item.videoId}`}
                                            title={item.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className={styles.video}
                                        />
                                        <div className={styles.videoOverlay}>
                                            <div className={styles.overlayContent}>
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className={styles.image}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error("Image failed to load:", item.url);
                                                e.currentTarget.src = '/images/hands.jpg'; // Fallback image
                                            }}
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
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
