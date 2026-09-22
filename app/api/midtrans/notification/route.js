import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(request) {
  try {
    const body = await request.json();

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const statusResponse = await snap.transaction.notification(body);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(`Notification for Order ID: ${orderId}, Status: ${transactionStatus}`);

    if (transactionStatus == 'capture') {
      if (fraudStatus == 'challenge') {
        // Status transaksi dihimbau untuk dicek manual
      } else if (fraudStatus == 'accept') {
        // TODO: Update transaksi ke Supabase / DB kamu menjadi PAID / SUCCESS
      }
    } else if (transactionStatus == 'settlement') {
      // TODO: Update transaksi ke Supabase / DB kamu menjadi PAID / SUCCESS
      console.log(`Transaksi ${orderId} Berhasil!`);
    } else if (
      transactionStatus == 'cancel' ||
      transactionStatus == 'deny' ||
      transactionStatus == 'expire'
    ) {
      // TODO: Update status transaksi menjadi FAILED / EXPIRED
      console.log(`Transaksi ${orderId} Gagal!`);
    } else if (transactionStatus == 'pending') {
      // TODO: Update status transaksi menjadi PENDING
    }

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('Notification Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}