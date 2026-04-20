"use client";
import { useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const { language } = useLanguage();

    const setupObserver = useCallback(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const el = ref.current;
        if (el) {
            const children = el.querySelectorAll(".reveal, .reveal-left, .reveal-right");
            children.forEach((child) => observer.observe(child));
            if (
                el.classList.contains("reveal") ||
                el.classList.contains("reveal-left") ||
                el.classList.contains("reveal-right")
            ) {
                observer.observe(el);
            }
        }

        return observer;
    }, []);

    useEffect(() => {
        const observer = setupObserver();
        return () => observer.disconnect();
    }, [language, setupObserver]);

    return ref;
}
