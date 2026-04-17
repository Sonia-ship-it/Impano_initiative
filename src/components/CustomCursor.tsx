"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Position refs for smooth trailing
    const endX = useRef(0);
    const endY = useRef(0);
    const _x = useRef(0);
    const _y = useRef(0);

    const requestRef = useRef<number>(0);

    useEffect(() => {
        // Only initialize custom cursor on devices with a mouse/trackpad (avoids breaking mobile)
        if (window.matchMedia("(pointer: coarse)").matches) return;

        // Set initial positions cleanly to prevent jumping from 0,0
        endX.current = window.innerWidth / 2;
        endY.current = window.innerHeight / 2;
        _x.current = window.innerWidth / 2;
        _y.current = window.innerHeight / 2;

        setIsVisible(true);

        const onMouseMove = (e: MouseEvent) => {
            endX.current = e.clientX;
            endY.current = e.clientY;

            // Update dot instantly
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        // Smooth trailing animation using lerp (linear interpolation)
        const animateOutline = () => {
            _x.current += (endX.current - _x.current) * 0.15;
            _y.current += (endY.current - _y.current) * 0.15;

            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.style.transform = `translate3d(${_x.current}px, ${_y.current}px, 0)`;
            }
            requestRef.current = requestAnimationFrame(animateOutline);
        };

        // Advanced event listeners to detect interactive tags
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer";

            if (isInteractive) {
                cursorOutlineRef.current?.classList.add(styles.hovering);
                cursorDotRef.current?.classList.add(styles.dotHovering);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer";

            if (isInteractive) {
                cursorOutlineRef.current?.classList.remove(styles.hovering);
                cursorDotRef.current?.classList.remove(styles.dotHovering);
            }
        };

        const handleMouseDown = () => {
            cursorOutlineRef.current?.classList.add(styles.clicking);
        };

        const handleMouseUp = () => {
            cursorOutlineRef.current?.classList.remove(styles.clicking);
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        requestRef.current = requestAnimationFrame(animateOutline);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div ref={cursorDotRef} className={styles.cursorDot} />
            <div ref={cursorOutlineRef} className={styles.cursorOutline} />
        </>
    );
}
