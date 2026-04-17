"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(var(--white-rgb), 0.05)] border border-[rgba(var(--white-rgb), 0.1)] text-[var(--gray-400)]">
                <span className="w-5 h-5" />
            </button>
        );
    }

    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(var(--white-rgb), 0.05)] border border-[rgba(var(--white-rgb), 0.1)] text-[var(--gray-400)] hover:text-[var(--brand)] transition-colors"
            aria-label="Toggle theme"
        >
            {currentTheme === "light" ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
}
