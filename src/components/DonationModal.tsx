"use client";
import React, { useState, useEffect } from "react";
import { useDonation } from "@/context/DonationContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Smartphone, Lock, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./DonationModal.module.css";

type Step = "form" | "processing" | "success" | "error";

const presetAmounts = [500, 1000, 2000, 5000, 10000, 25000];

const MTNIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#FFCC00" />
        <text x="16" y="21" textAnchor="middle" fill="#003B7C" fontWeight="bold" fontSize="10" fontFamily="Arial">MTN</text>
    </svg>
);

const AirtelIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#ED1C24" />
        <text x="16" y="21" textAnchor="middle" fill="white" fontWeight="bold" fontSize="8" fontFamily="Arial">Airtel</text>
    </svg>
);

export default function DonationModal() {
    const { isOpen, closeModal } = useDonation();
    const { t } = useLanguage();
    const [step, setStep] = useState<Step>("form");
    const [amount, setAmount] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [transactionRef, setTransactionRef] = useState("");

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep("form");
            setAmount("");
            setPhone("");
            setErrorMsg("");
            setTransactionRef("");
        }
    }, [isOpen]);

    const formatPhone = (value: string) => {
        // Strip everything except digits
        const digits = value.replace(/\D/g, "");
        // Remove leading +250 or 250
        const clean = digits.replace(/^(250)/, "");
        return clean.slice(0, 10);
    };

    const getNetworkFromPhone = (phoneNum: string): string | null => {
        const clean = phoneNum.replace(/\D/g, "").replace(/^(250)/, "");
        if (clean.startsWith("078") || clean.startsWith("079")) return "MTN";
        if (clean.startsWith("072") || clean.startsWith("073")) return "Airtel";
        return null;
    };

    const detectedNetwork = getNetworkFromPhone(phone);

    const handleDonate = async () => {
        // Validate
        if (!amount || parseFloat(amount) < 100) {
            setErrorMsg(t("donation.minAmount") || "Minimum donation is 100 RWF");
            return;
        }

        const cleanPhone = phone.replace(/\D/g, "").replace(/^(250)/, "");
        if (!cleanPhone.startsWith("07") || cleanPhone.length !== 10) {
            setErrorMsg(t("donation.invalidPhone") || "Please enter a valid phone number (07XXXXXXXX)");
            return;
        }

        setErrorMsg("");
        setStep("processing");

        try {
            const res = await fetch("/api/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    phone: cleanPhone,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setTransactionRef(data.ref || "");
                setStep("success");
            } else {
                setErrorMsg(data.error || "Payment failed");
                setStep("error");
            }
        } catch {
            setErrorMsg("Network error. Please check your connection.");
            setStep("error");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">
                    <X size={20} />
                </button>

                <div className={styles.content}>
                    {step === "form" && (
                        <>
                            <div className={styles.header}>
                                <div className={styles.headerIconWrap}>
                                    <Smartphone size={24} />
                                </div>
                                <h3 className={styles.title}>{t("donation.title")}</h3>
                                <p className={styles.subtitle}>{t("donation.momoDesc")}</p>
                            </div>

                            {/* Preset amounts */}
                            <div className={styles.presetGrid}>
                                {presetAmounts.map((preset) => (
                                    <button
                                        key={preset}
                                        className={`${styles.presetBtn} ${amount === String(preset) ? styles.presetActive : ""}`}
                                        onClick={() => setAmount(String(preset))}
                                    >
                                        {preset.toLocaleString()} <small>RWF</small>
                                    </button>
                                ))}
                            </div>

                            {/* Custom amount */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t("donation.amount")} (RWF)</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputPrefix}>RWF</span>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        placeholder={t("donation.custom")}
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="100"
                                    />
                                </div>
                            </div>

                            {/* Phone number */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t("donation.phone")}</label>
                                <div className={styles.phoneInputWrap}>
                                    <input
                                        type="tel"
                                        className={styles.input}
                                        placeholder="078 XXX XXXX"
                                        value={phone}
                                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                                        maxLength={10}
                                    />
                                    {detectedNetwork && (
                                        <div className={styles.networkBadge}>
                                            {detectedNetwork === "MTN" ? <MTNIcon /> : <AirtelIcon />}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Error message */}
                            {errorMsg && (
                                <div className={styles.errorBanner}>
                                    <AlertCircle size={14} />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            {/* Donate button */}
                            <button
                                className={styles.actionBtn}
                                onClick={handleDonate}
                                disabled={!amount || !phone}
                            >
                                {t("donation.cta")} — {amount ? `${parseInt(amount).toLocaleString()} RWF` : "0 RWF"}
                            </button>

                            {/* Trust bar */}
                            <div className={styles.trustArea}>
                                <div className={styles.trustText}>
                                    <Lock size={12} />
                                    <span>{t("donation.securePayment")} <strong>Paypack</strong></span>
                                </div>
                                <div className={styles.badgeRow}>
                                    <MTNIcon />
                                    <AirtelIcon />
                                </div>
                            </div>
                        </>
                    )}

                    {step === "processing" && (
                        <div className={styles.statusContainer}>
                            <div className={styles.statusIcon} style={{ color: "var(--brand)" }}>
                                <div className={styles.spinner} />
                            </div>
                            <h3 className={styles.statusTitle}>{t("donation.processing")}</h3>
                            <p className={styles.statusDesc}>
                                {t("donation.processingDesc")}
                            </p>
                            <div className={styles.phonePromptHint}>
                                <Smartphone size={20} style={{ color: "var(--brand)" }} />
                                <span>{t("donation.checkPhone") || "A prompt has been sent to your phone. Enter your PIN to confirm."}</span>
                            </div>
                        </div>
                    )}

                    {step === "success" && (
                        <div className={styles.statusContainer}>
                            <div className={`${styles.statusIcon} ${styles.successIcon}`}>
                                <CheckCircle size={48} />
                            </div>
                            <h3 className={styles.statusTitle}>{t("donation.successTitle")}</h3>
                            <p className={styles.statusDesc}>
                                {t("donation.thankYou") || "Thank you for your generous donation! Your support makes a real difference in children's lives."}
                                {transactionRef && (
                                    <>
                                        <br /><br />
                                        <small style={{ opacity: 0.6 }}>
                                            {t("donation.transactionId")}: {transactionRef}
                                        </small>
                                    </>
                                )}
                            </p>
                            <button className={styles.actionBtn} onClick={closeModal}>
                                {t("donation.close")}
                            </button>
                        </div>
                    )}

                    {step === "error" && (
                        <div className={styles.statusContainer}>
                            <div className={`${styles.statusIcon} ${styles.errorIcon}`}>
                                <AlertCircle size={48} />
                            </div>
                            <h3 className={styles.statusTitle}>{t("donation.errorTitle")}</h3>
                            <p className={styles.statusDesc}>{errorMsg}</p>
                            <button className={styles.actionBtn} onClick={() => setStep("form")}>
                                {t("donation.tryAgain")}
                            </button>
                            <button className={styles.secondaryBtn} onClick={closeModal}>
                                {t("donation.close")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
