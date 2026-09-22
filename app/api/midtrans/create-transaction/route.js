import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, amount } = body;

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const numericAmount = Number(amount) || 10;
    const grossAmount = Math.round(numericAmount * 16000);

    const parameter = {
      transaction_details: {
        order_id: `MODESY-${type || 'deposit'}-${Date.now()}`,
        gross_amount: grossAmount,
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
    const errorMessage = error.ApiResponse?.error_messages?.[0] || error.message || "Gagal koneksi Midtrans";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}