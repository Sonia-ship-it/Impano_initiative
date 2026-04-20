"use client";
import React, { createContext, useContext, useState } from "react";

interface DonationContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <DonationContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </DonationContext.Provider>
    );
};

export const useDonation = () => {
    const context = useContext(DonationContext);
    if (context === undefined) {
        throw new Error("useDonation must be used within a DonationProvider");
    }
    return context;
};
