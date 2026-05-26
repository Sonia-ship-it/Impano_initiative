import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhook/paypack
 *
 * Paypack will call this endpoint when a transaction status changes.
 * Register this URL in your Paypack dashboard under Webhook settings:
 *   https://impano.vercel.app/api/webhook/paypack
 */
export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        console.log("=== PAYPACK WEBHOOK ===");
        console.log("Event:", JSON.stringify(payload, null, 2));

        // Extract relevant fields
        const { ref, status, amount, client } = payload?.data || payload || {};

        if (status === "successful") {
            console.log(
                `✅ Donation confirmed: ${amount} RWF from ${client} (ref: ${ref})`
            );
            // TODO: Save to database, send thank-you email, etc.
        } else if (status === "failed") {
            console.log(`❌ Donation failed: ref ${ref}`);
        } else {
            console.log(`ℹ️ Webhook status: ${status}, ref: ${ref}`);
        }

        // Always respond 200 so Paypack doesn't retry
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (err) {
        console.error("Webhook error:", err);
        // Still return 200 to prevent Paypack retries on malformed payloads
        return NextResponse.json({ received: true }, { status: 200 });
    }
}
