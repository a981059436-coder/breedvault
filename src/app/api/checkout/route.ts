import { NextResponse } from "next/server";

const PRICES: Record<string, string> = {
  plus: "price_1Th1KBCTsTUzZ6M2WLzXg2St",
  breeder: "price_1Th1KCCTsTUzZ6M2WHoa7G68",
};

export async function POST(request: Request) {
  try {
    const { plan, email } = await request.json();
    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) return NextResponse.json({ error: "Payment not configured" }, { status: 500 });

    const Stripe = require("stripe");
    const stripe = new Stripe(sk);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: PRICES[plan] || plan, quantity: 1 }],
      success_url: "https://pawport.uk/dashboard?subscribed=true",
      cancel_url: "https://pawport.uk/pricing",
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
