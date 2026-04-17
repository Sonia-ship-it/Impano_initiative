"use client";
import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setWidth((winScroll / height) * 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: `${width}%`,
                height: "3px",
                background: "linear-gradient(90deg, #f09620, #f5b34d)",
                zIndex: 2000,
                transition: "width 0.2s ease-out",
                boxShadow: "0 0 10px rgba(240, 150, 32, 0.5)",
            }}
        />
    );
}
