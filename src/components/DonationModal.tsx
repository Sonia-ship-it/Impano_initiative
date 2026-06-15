"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useDonation } from "@/context/DonationContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { X, Smartphone, CreditCard, Lock, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./DonationModal.module.css";

type Step = "form" | "processing" | "success" | "error";
type PayMethod = "momo" | "card";

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

const VisaIcon = () => (
    <svg width="40" height="26" viewBox="0 0 40 26" fill="none">
        <rect width="40" height="26" rx="4" fill="#1A1F71" />
        <text x="20" y="18" textAnchor="middle" fill="white" fontWeight="bold" fontSize="11" fontFamily="Arial" fontStyle="italic">VISA</text>
    </svg>
);

const MasterCardIcon = () => (
    <svg width="40" height="26" viewBox="0 0 40 26" fill="none">
        <rect width="40" height="26" rx="4" fill="#252525" />
        <circle cx="15" cy="13" r="7" fill="#EB001B" />
        <circle cx="25" cy="13" r="7" fill="#F79E1B" />
        <path d="M20 7.5a7 7 0 0 1 0 11A7 7 0 0 1 20 7.5z" fill="#FF5F00" />
    </svg>
);

function DonationModalContent() {
    const { isOpen, openModal, closeModal } = useDonation();
    const { t } = useLanguage();
    const searchParams = useSearchParams();

    const [step, setStep] = useState<Step>("form");
    const [payMethod, setPayMethod] = useState<PayMethod>("momo");
    const [amount, setAmount] = useState("");
    const [phone, setPhone] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardEmail, setCardEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [transactionRef, setTransactionRef] = useState("");

    // Listen to redirect query parameters from Paystack callback
    useEffect(() => {
        const donationStatus = searchParams.get("donation");
        if (donationStatus === "success") {
            const ref = searchParams.get("ref") || "";
            setTransactionRef(ref);
            setStep("success");
            openModal();
        } else if (donationStatus === "fail") {
            const reason = searchParams.get("reason") || "Payment was not completed";
            setErrorMsg(reason);
            setStep("error");
            openModal();
        }
    }, [searchParams, openModal]);

    useEffect(() => {
        if (isOpen) {
            // Only reset form state if not already in success or error redirect steps
            const donationStatus = searchParams.get("donation");
            if (!donationStatus) {
                setStep("form");
                setAmount("");
                setPhone("");
                setCardName("");
                setCardEmail("");
                setErrorMsg("");
                setTransactionRef("");
                setPayMethod("momo");
            }
        }
    }, [isOpen, searchParams]);

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, "");
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

    const handleMomoDonate = async () => {
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
                body: JSON.stringify({ amount: parseFloat(amount), phone: cleanPhone }),
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

    const handleCardDonate = async () => {
        if (!amount || parseFloat(amount) < 100) {
            setErrorMsg("Minimum donation is 100 RWF");
            return;
        }
        if (!cardName.trim()) {
            setErrorMsg("Please enter the cardholder name.");
            return;
        }
        if (!cardEmail.trim() || !cardEmail.includes("@")) {
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        setErrorMsg("");
        setStep("processing");

        try {
            const res = await fetch("/api/donate/paystack", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    name: cardName.trim(),
                    email: cardEmail.trim(),
                }),
            });
            const data = await res.json();

            if (res.ok && data.paymentLink) {
                // Redirect to Paystack's hosted payment page
                window.location.href = data.paymentLink;
            } else {
                setErrorMsg(data.error || "Card payment initiation failed.");
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
                                <h3 className={styles.title}>{t("donation.title")}</h3>
                                <p className={styles.subtitle}>{t("donation.momoDesc")}</p>
                            </div>

                            {/* Payment method tabs */}
                            <div className={styles.methodTabs}>
                                <button
                                    className={`${styles.methodTab} ${payMethod === "momo" ? styles.methodTabActive : ""}`}
                                    onClick={() => { setPayMethod("momo"); setErrorMsg(""); }}
                                >
                                    <Smartphone size={18} />
                                    <span>Mobile Money</span>
                                </button>
                                <button
                                    className={`${styles.methodTab} ${payMethod === "card" ? styles.methodTabActive : ""}`}
                                    onClick={() => { setPayMethod("card"); setErrorMsg(""); }}
                                >
                                    <CreditCard size={18} />
                                    <span>Card</span>
                                </button>
                            </div>

                            {/* Amount */}
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

                            {/* === MOBILE MONEY FIELDS === */}
                            {payMethod === "momo" && (
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
                            )}

                            {/* === CARD FIELDS === */}
                            {payMethod === "card" && (
                                <>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Cardholder Name</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Full name as on card"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Email Address</label>
                                        <input
                                            type="email"
                                            className={styles.input}
                                            placeholder="your@email.com"
                                            value={cardEmail}
                                            onChange={(e) => setCardEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.cardNotice}>
                                        <Lock size={12} />
                                        <span>You will be redirected to Paystack's secure payment page to enter your card details.</span>
                                    </div>
                                </>
                            )}

                            {/* Error */}
                            {errorMsg && (
                                <div className={styles.errorBanner}>
                                    <AlertCircle size={14} />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            {/* CTA */}
                            <button
                                className={styles.actionBtn}
                                onClick={payMethod === "momo" ? handleMomoDonate : handleCardDonate}
                                disabled={!amount || (payMethod === "momo" ? !phone : !cardName || !cardEmail)}
                            >
                                {payMethod === "momo"
                                    ? `${t("donation.cta")} — ${amount ? `${parseInt(amount).toLocaleString()} RWF` : "0 RWF"}`
                                    : `Pay with Card — ${amount ? `${parseInt(amount).toLocaleString()} RWF` : "0 RWF"}`
                                }
                            </button>

                            {/* Trust bar */}
                            <div className={styles.trustArea}>
                                <div className={styles.trustText}>
                                    <Lock size={12} />
                                    <span>
                                        {payMethod === "momo" ? (
                                            <>{t("donation.securePayment")} <strong>Paypack</strong></>
                                        ) : (
                                            <>Secured by <strong>Paystack</strong></>
                                        )}
                                    </span>
                                </div>
                                <div className={styles.badgeRow}>
                                    {payMethod === "momo" ? (
                                        <><MTNIcon /><AirtelIcon /></>
                                    ) : (
                                        <><VisaIcon /><MasterCardIcon /></>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {step === "processing" && (
                        <div className={styles.statusContainer}>
                            <div className={styles.statusIcon} style={{ color: "var(--brand)" }}>
                                <div className={styles.spinnerLarge} />
                            </div>
                            <h3 className={styles.statusTitle}>{payMethod === "momo" ? t("donation.processing") : "Redirecting to Paystack..."}</h3>
                            <p className={styles.statusDesc}>
                                {payMethod === "momo"
                                    ? t("donation.processingDesc")
                                    : "Please wait while we prepare your secure payment page."
                                }
                            </p>
                            {payMethod === "momo" && (
                                <div className={styles.phonePromptHint}>
                                    <Smartphone size={20} style={{ color: "var(--brand)" }} />
                                    <span>{t("donation.checkPhone") || "A prompt has been sent to your phone. Enter your PIN to confirm."}</span>
                                </div>
                            )}
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
                                    <><br /><br /><small style={{ opacity: 0.6 }}>{t("donation.transactionId")}: {transactionRef}</small></>
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

export default function DonationModal() {
    return (
        <Suspense fallback={null}>
            <DonationModalContent />
        </Suspense>
    );
}
