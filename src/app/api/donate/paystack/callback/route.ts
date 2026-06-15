import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!reference) {
        return NextResponse.redirect(`${baseUrl}/?donation=fail&reason=missing_reference`);
    }

    try {
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecret) {
            console.error("PAYSTACK_SECRET_KEY is not configured");
            return NextResponse.redirect(`${baseUrl}/?donation=fail&reason=server_error`);
        }

        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${paystackSecret}`,
            },
        });

        const data = await response.json();

        if (response.ok && data.status && data.data?.status === "success") {
            const amountInRwf = data.data.amount / 100;
            return NextResponse.redirect(
                `${baseUrl}/?donation=success&ref=${reference}&amount=${amountInRwf}`
            );
        } else {
            console.error("Paystack verification failed:", data);
            const message = data.data?.gateway_response || "Payment verification failed";
            return NextResponse.redirect(
                `${baseUrl}/?donation=fail&reason=${encodeURIComponent(message)}`
            );
        }
    } catch (error) {
        console.error("Paystack callback error:", error);
        return NextResponse.redirect(`${baseUrl}/?donation=fail&reason=internal_error`);
    }
}
