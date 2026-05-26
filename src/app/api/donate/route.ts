import { NextRequest, NextResponse } from "next/server";

const PAYPACK_BASE_URL = process.env.PAYPACK_BASE_URL || "https://paypack.rw/api";
const PAYPACK_APP_KEY = process.env.PAYPACK_APP_KEY;

/**
 * POST /api/donate
 *
 * Body: { amount: number, phone: string }
 *
 * Creates a Paypack "cashin" transaction.
 */
export async function POST(req: NextRequest) {
    try {
        const { amount, phone } = await req.json();

        // Validation
        if (!amount || !phone) {
            return NextResponse.json(
                { error: "Amount and phone number are required." },
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

        // Clean phone number
        let cleanPhone = phone.replace(/\s+/g, "").replace(/^\+?250/, "");
        if (!cleanPhone.startsWith("07")) {
            return NextResponse.json(
                { error: "Please enter a valid Rwandan phone number (07XXXXXXXX)." },
                { status: 400 }
            );
        }
        
        // As per Paypack format, it might expect the 07... format directly or 2507... format.
        // The user example used whatever was passed. Let's pass cleanPhone.

        if (!PAYPACK_APP_KEY) {
            console.error("PAYPACK_APP_KEY is not set in environment variables");
            return NextResponse.json(
                { error: "Payment configuration is missing on the server." },
                { status: 500 }
            );
        }

        // Create cashin (mobile money push to user)
        const cashinRes = await fetch(`${PAYPACK_BASE_URL}/transactions/cashin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PAYPACK_APP_KEY}`,
            },
            body: JSON.stringify({
                amount: numericAmount,
                phone_number: cleanPhone,
            }),
        });

        const cashinData = await cashinRes.json().catch(() => ({}));

        if (!cashinRes.ok) {
            console.error("Paypack cashin error:", cashinData);
            return NextResponse.json(
                {
                    error: cashinData?.message || cashinData?.error || "Payment request failed. Please try again.",
                },
                { status: cashinRes.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Payment request sent. Please check your phone to confirm.",
            ref: cashinData?.ref || cashinData?.transaction_id,
            data: cashinData,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Donate API error:", message);
        return NextResponse.json(
            { error: "Server error processing donation. Please try again later." },
            { status: 500 }
        );
    }
}
