import { NextRequest, NextResponse } from "next/server";

const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
const FLW_BASE = "https://api.flutterwave.com/v3";

/**
 * POST /api/donate/card
 *
 * Body: { amount: number, name: string, email: string }
 *
 * Creates a Flutterwave hosted payment link and returns it for redirect.
 */
export async function POST(req: NextRequest) {
    try {
        const { amount, name, email } = await req.json();

        // Validation
        if (!amount || !name || !email) {
            return NextResponse.json(
                { error: "Amount, name, and email are required." },
                { status: 400 }
            );
        }

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount < 100) {
            return NextResponse.json(
                { error: "Minimum donation is 100 RWF." },
                { status: 400 }
            );
        }

        if (!email.includes("@")) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        if (!FLW_SECRET_KEY) {
            console.error("FLUTTERWAVE_SECRET_KEY is not configured");
            return NextResponse.json(
                { error: "Card payment is not configured on the server. Please use Mobile Money." },
                { status: 500 }
            );
        }

        const txRef = `impano-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

        // Get the base URL for redirect
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://impano.vercel.app";

        // Create a standard payment link via Flutterwave
        const payload = {
            tx_ref: txRef,
            amount: numericAmount,
            currency: "RWF",
            redirect_url: `${baseUrl}/api/donate/card/callback`,
            customer: {
                email: email,
                name: name,
            },
            customizations: {
                title: "Impano Initiative Funds",
                description: "Donation to support children's education and nutrition in Rwanda.",
                logo: `${baseUrl}/images/logo.png`,
            },
            meta: {
                source: "impano-website",
                type: "donation",
            },
        };

        const flwRes = await fetch(`${FLW_BASE}/payments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        const flwData = await flwRes.json();

        if (!flwRes.ok || flwData.status !== "success") {
            console.error("Flutterwave payment link error:", flwData);
            return NextResponse.json(
                { error: flwData?.message || "Failed to initiate card payment. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            paymentLink: flwData.data.link,
            txRef,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Card donate API error:", message);
        return NextResponse.json(
            { error: "Server error processing donation." },
            { status: 500 }
        );
    }
}
