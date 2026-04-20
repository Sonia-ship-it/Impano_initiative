"use client";
import React, { useState, useEffect } from "react";
import { useDonation } from "@/context/DonationContext";
import { X, CreditCard, Smartphone, Lock, CheckCircle, AlertCircle, ShieldCheck } from "lucide-react";
import styles from "./DonationModal.module.css";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

type Step = "method" | "momo" | "card" | "processing" | "success" | "error";

const VisaIcon = () => (
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="white" />
        <path d="M18.88 22.02l2.36-11.45h3.76l-2.36 11.45h-3.76zm13.16-11.13c-.86-.34-2.2-.68-3.86-.68-4.24 0-7.22 2.22-7.25 5.42-.03 2.36 2.14 3.68 3.78 4.46 1.67.8 2.24 1.32 2.23 2.04-.02 1.1-1.34 1.62-2.58 1.62-1.72 0-2.64-.26-4.04-.88l-.56-.26-.6 3.66c1 .46 2.84.86 4.74.88 4.5 0 7.42-2.2 7.46-5.62.02-1.88-1.12-3.3-3.6-4.48-1.5-.76-2.42-1.28-2.42-2.06 0-.72.82-1.46 2.6-1.46 1.48 0 2.56.32 3.38.68l.4.18.57-3.48zM42.36 10.57h-3.5c-1.08 0-1.9.32-2.38 1.45l-6.66 15.68h3.94l.78-2.16h4.82l.46 2.16H44l-3.38-17.13h1.74zm-3.08 10.66l1.24-3.4.72 3.4h-1.96zm-26.1-10.66L9.5 22.18l-.34-1.7c-.64-2.18-2.62-4.54-4.84-5.72l3.12 11.83H11.5l5.96-16.1h-4.28z" fill="#1434CB" />
    </svg>
);

const MastercardIcon = () => (
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="white" />
        <circle cx="19" cy="16" r="10" fill="#EB001B" />
        <circle cx="29" cy="16" r="10" fill="#F79E1B" />
        <path d="M24 8a10 10 0 0 0 0 16 10 10 0 0 0 0-16z" fill="#FF5F00" />
    </svg>
);

export default function DonationModal() {
    const { isOpen, closeModal } = useDonation();
    const [step, setStep] = useState<Step>("method");
    const [amount, setAmount] = useState("");
    const [momoPhone, setMomoPhone] = useState("");
    const [momoNetwork, setMomoNetwork] = useState("MTN");
    const [transactionId, setTransactionId] = useState("");

    // Reset modal state when opened
    useEffect(() => {
        if (isOpen) setStep("method");
    }, [isOpen]);

    const config = {
        public_key: 'FLWPUBK_TEST-473d0979435a4d6537b0c797bc353273-X', // Test Key
        tx_ref: Date.now().toString(),
        amount: parseFloat(amount) || 0,
        currency: 'RWF',
        payment_options: 'card,mobilemoneyrwanda,ussd',
        customer: {
            email: 'user@example.com',
            phone_number: momoPhone,
            name: 'Valued Donor',
        },
        customizations: {
            title: 'Impano Initiative',
            description: 'Donation for Children Nutrition',
            logo: 'https://impano.vercel.app/images/logo.png',
        },
    };

    const handleFlutterwavePayment = useFlutterwave(config);

    const handleBack = () => {
        setStep("method");
    };

    const handleProcessPayment = () => {
        if (!amount || parseFloat(amount) <= 0) return;

        setStep("processing");

        handleFlutterwavePayment({
            callback: (response) => {
                console.log(response);
                if (response.status === "successful") {
                    setTransactionId(response.transaction_id.toString());
                    setStep("success");
                } else {
                    setStep("error");
                }
                closePaymentModal();
            },
            onClose: () => {
                if (step === "processing") setStep("method");
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`} onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">
                    <X size={20} />
                </button>

                <div className={styles.content}>
                    {step === "method" && (
                        <>
                            <div className={styles.header}>
                                <h3 className={styles.title}>Make a Donation</h3>
                                <p className={styles.subtitle}>Choose your preferred payment method</p>
                            </div>
                            <div className={styles.methodGrid}>
                                <div className={styles.methodCard} onClick={() => setStep("momo")}>
                                    <div className={styles.methodIcon}><Smartphone /></div>
                                    <span className={styles.methodLabel}>Mobile Money</span>
                                </div>
                                <div className={styles.methodCard} onClick={() => setStep("card")}>
                                    <div className={styles.methodIcon}><CreditCard /></div>
                                    <span className={styles.methodLabel}>Credit Card</span>
                                </div>
                            </div>
                        </>
                    )}

                    {step === "momo" && (
                        <div className={styles.form}>
                            <div className={styles.header}>
                                <h3 className={styles.title}>Mobile Money</h3>
                                <p className={styles.subtitle}>Fast & Secure local payment</p>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Amount (RWF)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="078... / 079..."
                                    value={momoPhone}
                                    onChange={(e) => setMomoPhone(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Network (Optional)</label>
                                <select className={styles.input} value={momoNetwork} onChange={(e) => setMomoNetwork(e.target.value)}>
                                    <option value="MTN">MTN Rwanda</option>
                                    <option value="Airtel">Airtel-Tigo</option>
                                </select>
                            </div>
                            <button className={styles.actionBtn} onClick={handleProcessPayment}>
                                Pay Now
                            </button>
                            <button className={styles.secondaryBtn} onClick={handleBack}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                <span>Go Back</span>
                            </button>
                        </div>
                    )}

                    {step === "card" && (
                        <div className={styles.form}>
                            <div className={styles.header}>
                                <h3 className={styles.title}>Card Payment</h3>
                                <p className={styles.subtitle}>Secure international payment</p>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Amount (RWF)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Cardholder Name</label>
                                <input type="text" className={styles.input} placeholder="John Doe" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Card Number</label>
                                <input type="text" className={styles.input} placeholder="**** **** **** ****" />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Expiry Date</label>
                                    <input type="text" className={styles.input} placeholder="MM / YY" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>CVV</label>
                                    <input type="text" className={styles.input} placeholder="123" />
                                </div>
                            </div>
                            <button className={styles.actionBtn} onClick={handleProcessPayment}>
                                Pay Now
                            </button>
                            <button className={styles.secondaryBtn} onClick={handleBack}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                <span>Go Back</span>
                            </button>
                        </div>
                    )}

                    {step === "processing" && (
                        <div className={styles.statusContainer}>
                            <div className={styles.statusIcon} style={{ color: 'var(--brand)' }}>
                                <div className={styles.spinner} />
                            </div>
                            <h3 className={styles.statusTitle}>Processing Payment...</h3>
                            <p className={styles.statusDesc}>Please wait while we securely process your donation.</p>
                        </div>
                    )}

                    {step === "success" && (
                        <div className={styles.statusContainer}>
                            <div className={`${styles.statusIcon} ${styles.successIcon}`}>
                                <CheckCircle size={48} />
                            </div>
                            <h3 className={styles.statusTitle}>Payment Successful 🎉</h3>
                            <p className={styles.statusDesc}>
                                Thank you for your generous support! Your contribution will make a real difference in the lives of many children.
                                <br /><br />
                                <small style={{ opacity: 0.6 }}>Transaction ID: {transactionId}</small>
                            </p>
                            <button className={styles.actionBtn} onClick={closeModal}>Close Window</button>
                        </div>
                    )}

                    {step === "error" && (
                        <div className={styles.statusContainer}>
                            <div className={`${styles.statusIcon} ${styles.errorIcon}`}>
                                <AlertCircle size={48} />
                            </div>
                            <h3 className={styles.statusTitle}>Payment Failed</h3>
                            <p className={styles.statusDesc}>We couldn't process your payment. This might be due to incorrect details or network issues. Please try again.</p>
                            <button className={styles.actionBtn} onClick={() => setStep("method")}>Try Again</button>
                            <button className={styles.secondaryBtn} onClick={closeModal}>Close</button>
                        </div>
                    )}

                    {(step === "method" || step === "momo" || step === "card") && (
                        <div className={styles.trustArea}>
                            <div className={styles.trustText}>
                                <Lock size={12} style={{ marginRight: '4px' }} />
                                <span>Secure payment powered by <strong>Flutterwave</strong></span>
                            </div>
                            <div className={styles.badgeRow}>
                                <VisaIcon />
                                <MastercardIcon />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
