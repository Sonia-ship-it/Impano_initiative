import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { amount, email, name } = await request.json();

        if (!amount || amount < 100) {
            return NextResponse.json({ error: "Minimum donation is 100 RWF" }, { status: 400 });
        }
        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
        }

        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecret) {
            console.error("PAYSTACK_SECRET_KEY is not configured");
            return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/api/donate/paystack/callback`;

        // Paystack amount is in subunits (multiplied by 100)
        const amountInSubunits = Math.round(amount * 100);

        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${paystackSecret}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: amountInSubunits,
                currency: "RWF",
                callback_url: callbackUrl,
                metadata: {
                    donor_name: name || "Anonymous Donor",
                    custom_fields: [
                        {
                            display_name: "Donor Name",
                            variable_name: "donor_name",
                            value: name || "Anonymous Donor"
                        }
                    ]
                }
            }),
        });

        const data = await response.json();

        if (response.ok && data.status && data.data?.authorization_url) {
            return NextResponse.json({ paymentLink: data.data.authorization_url });
        } else {
            console.error("Paystack initialization error:", data);
            return NextResponse.json({ error: data.message || "Failed to initialize payment with Paystack" }, { status: 400 });
        }
    } catch (error) {
        console.error("Paystack payment error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
