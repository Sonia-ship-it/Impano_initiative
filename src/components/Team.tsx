"use client";
import React, { useRef } from "react";
import { useReveal } from "./useReveal";
import styles from "./Team.module.css";

const team = [
    {
        name: "ISHIMWE CHRISPIN",
        role: "Founder",
        initials: "IC",
        color: "#f09620",
        bio: "Visionary leader dedicated to creating sustainable community impact through innovative social programs.",
    },
    {
        name: "ROGER DUSHIME",
        role: "CO-Founder & Managing Director",
        initials: "RD",
        color: "#3a9948",
        bio: "Strategic expert focused on operational excellence and scaling initiative reach across the region.",
    },
    {
        name: "UMUTONIWASE GIFT",
        role: "Operation Manager",
        initials: "UG",
        color: "#f09620",
        bio: "Ensuring seamless execution of projects with a focus on efficiency and community engagement.",
    },
    {
        name: "ISHIMWE DIANE",
        role: "Health Care Adviser",
        initials: "ID",
        color: "#3a9948",
        bio: "Bridging the gap between social initiatives and public health to ensure holistic community wellbeing.",
    },
    {
        name: "UWASE SONIA",
        role: "Financial & IT Support",
        initials: "US",
        color: "#f09620",
        bio: "Managing the digital backbone and financial integrity of the initiative with precision.",
    },
    {
        name: "RUKUNDO Bertin",
        role: "Content Manager",
        initials: "RB",
        color: "#3a9948",
        bio: "Sharing our story through compelling digital experiences and creative communication strategies.",
    },
];

const SocialIcons = {
    Twitter: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    ),
    Linkedin: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    ),
    Instagram: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    ),
};

const TeamCard = ({ member, index }: { member: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`${styles.card} reveal`}
            style={{ transitionDelay: `${index * 0.1}s` }}
        >
            <div className={styles.cardInner}>
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatarDecoration} />
                    <div
                        className={styles.avatar}
                        style={{
                            background: `linear-gradient(135deg, ${member.color}22, ${member.color}08)`,
                            borderColor: `${member.color}30`,
                        }}
                    >
                        <span
                            className={styles.initials}
                            style={{ color: member.color }}
                        >
                            {member.initials}
                        </span>
                    </div>
                </div>

                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>

                <div className={styles.socials}>
                    <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                        <SocialIcons.Linkedin />
                    </a>
                    <a href="#" className={styles.socialIcon} aria-label="Twitter">
                        <SocialIcons.Twitter />
                    </a>
                    <a href="#" className={styles.socialIcon} aria-label="Instagram">
                        <SocialIcons.Instagram />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function Team() {
    const revealRef = useReveal();

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
                        <span>Executive Board</span>
                    </div>
                    <h2 className={styles.heading}>
                        Meet the <span className="gradient-text">Architects</span> <br />
                        of Change
                    </h2>
                    <p className={styles.headerSub}>
                        A multi-disciplinary collective of young visionaries committed to
                        redefining the future of our community through action.
                    </p>
                </div>

                <div className={styles.grid}>
                    {team.map((member, index) => (
                        <TeamCard key={member.name} member={member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}


