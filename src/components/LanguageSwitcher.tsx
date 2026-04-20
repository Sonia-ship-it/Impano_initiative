import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className={styles.container}>
            {(['en', 'rw', 'fr'] as const).map((lang) => (
                <button
                    key={lang}
                    className={`${styles.btn} ${language === lang ? styles.active : ''}`}
                    onClick={() => setLanguage(lang)}
                >
                    {lang.toUpperCase()}
                </button>
            ))}
        </div>
    );
};
