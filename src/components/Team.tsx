"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useReveal } from "./useReveal";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Team.module.css";

const SocialIcons = {
    Twitter: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    ),
    Linkedin: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    ),
    Instagram: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    ),
};

const RoleIcons = {
    Founder: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    ),
    Cofounder: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    ),
    Ops: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Health: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    ),
    Finance: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    Content: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    ),
};

const focusAreas: Record<string, Record<string, string>> = {
    IC: {
        en: "Vision & Strategy",
        rw: "Icyerekezo & Igenamigambi",
        fr: "Vision & Stratégie"
    },
    RD: {
        en: "Operations & Growth",
        rw: "Imikorere & Gukura",
        fr: "Opérations & Croissance"
    },
    UG: {
        en: "Logistics & Engagement",
        rw: "Imigendekere & Ubufatanye",
        fr: "Logistique & Engagement"
    },
    ID: {
        en: "Community Wellbeing",
        rw: "Imibereho Myiza",
        fr: "Bien-être Communautaire"
    },
    US: {
        en: "Finance & Technology",
        rw: "Imari & Ikoranabuhanga",
        fr: "Finance & Technologie"
    },
    RB: {
        en: "Creative Storytelling",
        rw: "Guhanga Inkuru",
        fr: "Récits Créatifs"
    }
};

const getRoleIcon = (initials: string) => {
    switch (initials) {
        case "IC": return <RoleIcons.Founder />;
        case "RD": return <RoleIcons.Cofounder />;
        case "UG": return <RoleIcons.Ops />;
        case "ID": return <RoleIcons.Health />;
        case "US": return <RoleIcons.Finance />;
        case "RB": return <RoleIcons.Content />;
        default: return <RoleIcons.Founder />;
    }
};

interface TeamMember {
    name: string;
    role: string;
    initials: string;
    color: string;
    bio: string;
    image?: string;
    email?: string;
    phone?: string;
}

const TeamCard = ({ member, index, language }: { member: TeamMember; index: number; language: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const activeFocus = focusAreas[member.initials]?.[language] || focusAreas[member.initials]?.en || "";

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = cardWidth / 2;
        const centerY = cardHeight / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees tilt
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.setProperty("--tilt-x", `${rotateX}deg`);
        card.style.setProperty("--tilt-y", `${rotateY}deg`);
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.setProperty("--tilt-x", `0deg`);
        card.style.setProperty("--tilt-y", `0deg`);
    };

    return (
        <div 
            ref={cardRef}
            className={`${styles.card} reveal`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transitionDelay: `${index * 0.08}s` }}
        >
            <div className={styles.cardInner}>
                {/* Background glow orbs that animate on mouse interaction */}
                <div className={styles.cardGlow} style={{ background: member.color }} />
                
                {/* Custom colored line divider */}
                <div className={styles.topLine} style={{ background: member.color }} />

                <div className={styles.cardHeader}>
                    <div className={styles.initialsPortal} style={{ borderColor: `${member.color}25` }}>
                        <div className={styles.portalOrb} style={{ background: member.color }} />
                        <div className={styles.portalOrbOuter} style={{ borderColor: `${member.color}15` }} />
                        
                        <div className={styles.portalImageWrapper}>
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={76}
                                    height={76}
                                    className={styles.portalImage}
                                />
                            ) : (
                                <span className={styles.portalInitials} style={{ color: member.color }}>
                                    {member.initials}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.headerText}>
                        <div className={styles.focusBadge} style={{ background: `${member.color}12`, border: `1px solid ${member.color}25` }}>
                            <span className={styles.focusIcon} style={{ color: member.color }}>
                                {getRoleIcon(member.initials)}
                            </span>
                            <span className={styles.focusLabel} style={{ color: member.color }}>
                                {activeFocus}
                            </span>
                        </div>
                        <h3 className={styles.name}>{member.name}</h3>
                        <p className={styles.role}>{member.role}</p>
                    </div>
                </div>

                <div className={styles.cardBody}>
                    <svg className={styles.quoteIcon} style={{ fill: `${member.color}08` }} viewBox="0 0 24 24" width="48" height="48">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className={styles.bio}>{member.bio}</p>

                    {(member.email || member.phone) && (
                        <div className={styles.contactInfo}>
                            {member.email && (
                                <a href={`mailto:${member.email}`} className={styles.contactItem} style={{ '--accent': member.color } as React.CSSProperties}>
                                    <span className={styles.contactIcon}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </span>
                                    {member.email}
                                </a>
                            )}
                            {member.phone && (
                                <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className={styles.contactItem} style={{ '--accent': member.color } as React.CSSProperties}>
                                    <span className={styles.contactIcon}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </span>
                                    {member.phone}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialIcon} aria-label="LinkedIn" style={{ '--accent': member.color } as React.CSSProperties}>
                            <SocialIcons.Linkedin />
                        </a>
                        <a href="#" className={styles.socialIcon} aria-label="Twitter" style={{ '--accent': member.color } as React.CSSProperties}>
                            <SocialIcons.Twitter />
                        </a>
                        <a href="#" className={styles.socialIcon} aria-label="Instagram" style={{ '--accent': member.color } as React.CSSProperties}>
                            <SocialIcons.Instagram />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Team() {
    const revealRef = useReveal();
    const { t, language } = useLanguage();

    const team: TeamMember[] = [
        {
            name: "ISHIMWE CHRISPIN",
            role: t("team.roles.founder"),
            initials: "IC",
            color: "#f09620",
            bio: t("team.bios.ic"),
            image: "/images/chrispin.jpeg",
            email: "ishchrispin27@gmail.com",
            phone: "+250780124489"
        },
        {
            name: "ROGER DUSHIME",
            role: t("team.roles.cofounder"),
            initials: "RD",
            color: "#3a9948",
            bio: t("team.bios.rd"),
            image: "/images/roger.jpeg",
            email: "dushimeroger77@gmail.com",
            phone: "+250788455790"
        },
        {
            name: "UMUTONIWASE GIFT",
            role: t("team.roles.ops"),
            initials: "UG",
            color: "#f09620",
            bio: t("team.bios.ug"),
            image: "/images/gift.jpeg",
            email: "umutoniwasegift@gmail.com",
            phone: "0781272782"
        },
        {
            name: "ISHIMWE DIANE",
            role: t("team.roles.health"),
            initials: "ID",
            color: "#3a9948",
            bio: t("team.bios.id"),
            image: "/images/diane.jpeg",
            email: "ishimwedianah80@gmail.com",
            phone: "0788640764"
        },
        {
            name: "UWASE SONIA",
            role: t("team.roles.finance"),
            initials: "US",
            color: "#f09620",
            bio: t("team.bios.us"),
            image: "/images/sonia.png",
            email: "uwasesonia43@gmail.com",
            phone: "0795300840"
        },
        {
            name: "RUKUNDO Bertin",
            role: t("team.roles.content"),
            initials: "RB",
            color: "#3a9948",
            bio: t("team.bios.rb"),
            image: "/images/bertin.jpeg",
            email: "bertinrukundo@gmail.com",
            phone: "0783737664"
        },
    ];

    return (
        <section className={styles.section} id="team" ref={revealRef}>
            {/* Background Decoration */}
            <div className={styles.bgDecoration}>
                <div className={styles.glow} />
                <div className={styles.glow2} />
            </div>

            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelDot} />
                        <span>{t("team.board")}</span>
                    </div>
                    <h2 className={styles.heading}>
                        {t("team.heading")} <span className="gradient-text">{t("team.board") === "Executive Board" ? "Architects" : t("team.architects")}</span> <br />
                        {t("team.ofChange")}
                    </h2>
                    <p className={styles.headerSub}>
                        {t("team.sub")}
                    </p>
                </div>

                <div className={styles.grid}>
                    {team.map((member, index) => (
                        <TeamCard key={member.name} member={member} index={index} language={language} />
                    ))}
                </div>
            </div>
        </section>
    );
}


