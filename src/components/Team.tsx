"use client";
import React from "react";
import { useReveal } from "./useReveal";
import styles from "./Team.module.css";

const team = [
    {
        name: "ISHIMWE CHRISPIN",
        role: "Founder",
        initials: "IC",
        color: "#f09620",
    },
    {
        name: "ROGER DUSHIME",
        role: "CO-Founder & Managing Director",
        initials: "RD",
        color: "#3a9948",
    },
    {
        name: "UMUTONIWASE GIFT",
        role: "Operation Manager",
        initials: "UG",
        color: "#f09620",
    },
    {
        name: "ISHIMWE DIANE",
        role: "Health Care Adviser",
        initials: "ID",
        color: "#3a9948",
    },
    {
        name: "UWASE SONIA",
        role: "Financial & IT Support",
        initials: "US",
        color: "#f09620",
    },
];

export default function Team() {
    const ref = useReveal();

    return (
        <section className={styles.section} id="team" ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.header} reveal`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.labelLine} />
                        <span>OUR TEAM</span>
                        <div className={styles.labelLine} />
                    </div>
                    <h2 className={styles.heading}>
                        Meet the <span className="gradient-text">Changemakers</span>
                    </h2>
                    <p className={styles.headerSub}>
                        A passionate group of young leaders working together to make a
                        lasting impact.
                    </p>
                </div>

                <div className={styles.grid}>
                    {team.map((member, index) => (
                        <div
                            key={member.name}
                            className={`${styles.card} reveal`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.cardInner}>
                                {/* Avatar */}
                                <div
                                    className={styles.avatar}
                                    style={{
                                        background: `linear-gradient(135deg, ${member.color}22, ${member.color}08)`,
                                        borderColor: `${member.color}20`,
                                    }}
                                >
                                    <span
                                        className={styles.initials}
                                        style={{ color: member.color }}
                                    >
                                        {member.initials}
                                    </span>
                                    <div
                                        className={styles.avatarRing}
                                        style={{
                                            borderColor: `${member.color}30`,
                                        }}
                                    />
                                </div>

                                <h3 className={styles.name}>{member.name}</h3>
                                <p className={styles.role}>{member.role}</p>

                                {/* Hover bar */}
                                <div
                                    className={styles.hoverBar}
                                    style={{ background: member.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
