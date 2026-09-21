import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, amount } = body;

    const serverKey = (process.env.MIDTRANS_SERVER_KEY || "").trim();

    let snap = new midtransClient.Snap({
      isProduction: true,
      serverKey: serverKey,
    });

    const parameter = {
      transaction_details: {
        order_id: `MODESY-${type}-${Date.now()}`,
        gross_amount: amount ? Math.round(amount * 16000) : 160000,
      },
      customer_details: {
        first_name: "Member Modesy",
        email: "customer@modesy.com",
      },
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token, redirect_url: transaction.redirect_url });

  } catch (error) {
    console.error("Midtrans Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}