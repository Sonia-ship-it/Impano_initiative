export type SocialPlatform = "Instagram" | "Twitter" | "TikTok" | "LinkedIn";

export interface SocialLink {
    platform: SocialPlatform;
    label: string;
    shortLabel: string;
    href: string;
    accent: string;
    accentRgb: string;
}

export const initiativeContact = {
    email: "Impanoinitiativefunds@gmail.com",
    location: "Rwanda",
    coords: "1°56'S · 30°04'E",
    social: [
        {
            platform: "Instagram",
            label: "impano_initiative_fund",
            shortLabel: "IG",
            href: "https://www.instagram.com/impano_initiative_fund",
            accent: "#E1306C",
            accentRgb: "225, 48, 108",
        },
        {
            platform: "Twitter",
            label: "Impano Initiative Funds",
            shortLabel: "X",
            href: "https://x.com/ImpanoFunds",
            accent: "#1DA1F2",
            accentRgb: "29, 161, 242",
        },
        {
            platform: "TikTok",
            label: "Impano initiative Fund",
            shortLabel: "TT",
            href: "https://www.tiktok.com/@impanofunds",
            accent: "#69C9D0",
            accentRgb: "105, 201, 208",
        },
        {
            platform: "LinkedIn",
            label: "Impano Initiative Funds",
            shortLabel: "IN",
            href: "https://www.linkedin.com/in/impano-initiative-funds-a55a9a3b7/",
            accent: "#0A66C2",
            accentRgb: "10, 102, 194",
        },
    ] satisfies SocialLink[],
} as const;