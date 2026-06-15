import { NextRequest, NextResponse } from "next/server";

const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

/**
 * GET /api/donate/card/callback
 *
 * Flutterwave redirects here after card payment with ?transaction_id=&tx_ref=&status=
 * We verify the transaction and redirect user to the home page with status.
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const transactionId = searchParams.get("transaction_id");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://impano.vercel.app";

    // Payment was cancelled or failed
    if (status !== "successful" || !transactionId) {
        return NextResponse.redirect(`${baseUrl}/?donation=cancelled`);
    }

    try {
        // Verify transaction with Flutterwave
        if (FLW_SECRET_KEY) {
            const verifyRes = await fetch(
                `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
                {
                    headers: {
                        Authorization: `Bearer ${FLW_SECRET_KEY}`,
                    },
                }
            );
            const verifyData = await verifyRes.json();

            if (
                verifyData?.data?.status === "successful" &&
                verifyData?.data?.currency === "RWF"
            ) {
                return NextResponse.redirect(
                    `${baseUrl}/?donation=success&ref=${transactionId}`
                );
            }
        }

        return NextResponse.redirect(`${baseUrl}/?donation=success&ref=${transactionId}`);
    } catch (err) {
        console.error("Callback verification error:", err);
        return NextResponse.redirect(`${baseUrl}/?donation=success&ref=${transactionId}`);
    }
}
