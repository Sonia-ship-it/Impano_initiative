import { NextRequest, NextResponse } from "next/server";

const PAYPACK_BASE = "https://payments.paypack.rw/api";
const CLIENT_ID = process.env.PAYPACK_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPACK_CLIENT_SECRET;

/**
 * Authenticate with Paypack to get a JWT access token.
 */
async function getAccessToken(): Promise<string> {
    const res = await fetch(`${PAYPACK_BASE}/auth/agents/authorize`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.access) {
        console.error("Paypack auth failed:", res.status, data);
        throw new Error(data?.message || "Authentication with payment provider failed");
    }

    return data.access;
}

/**
 * POST /api/donate
 *
 * Body: { amount: number, phone: string }
 *
 * Authenticates with Paypack, then creates a "cashin" transaction
 * which triggers a USSD prompt on the donor's phone.
 */
export async function POST(req: NextRequest) {
    try {
        const { amount, phone } = await req.json();

        // ── Validation ──────────────────────────────────
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

        // Normalise to 07XXXXXXXX
        const cleanPhone = phone.replace(/\s+/g, "").replace(/^\+?250/, "");
        if (!cleanPhone.startsWith("07") || cleanPhone.length !== 10) {
            return NextResponse.json(
                { error: "Please enter a valid Rwandan phone number (07XXXXXXXX)." },
                { status: 400 }
            );
        }

        // ── Check env vars ──────────────────────────────
        if (!CLIENT_ID || !CLIENT_SECRET) {
            console.error("PAYPACK_CLIENT_ID or PAYPACK_CLIENT_SECRET is missing");
            return NextResponse.json(
                { error: "Payment configuration is missing on the server." },
                { status: 500 }
            );
        }

        // ── Step 1: Get access token ────────────────────
        const accessToken = await getAccessToken();

        // ── Step 2: Create cashin transaction ───────────
        const cashinRes = await fetch(`${PAYPACK_BASE}/transactions/cashin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                amount: numericAmount,
                number: cleanPhone,
            }),
        });

        const cashinData = await cashinRes.json().catch(() => ({}));

        if (!cashinRes.ok) {
            console.error("Paypack cashin error:", cashinRes.status, cashinData);
            return NextResponse.json(
                {
                    error:
                        cashinData?.message ||
                        cashinData?.error ||
                        "Payment request failed. Please try again.",
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
            { error: message || "Server error processing donation." },
            { status: 500 }
        );
    }
}
