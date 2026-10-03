import { NextResponse } from 'next/server';
import { midtrans } from '@/lib/midtrans/client';
import { db } from '@/lib/db/dbAdapter';

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;
    const signatureKey = notification.signature_key;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    // Validate Signature
    const isValidSignature = midtrans.verifySignature(
      orderId,
      statusCode,
      grossAmount,
      signatureKey
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Signature tidak valid.' }, { status: 403 });
    }

    // Map status
    const mappedStatus = midtrans.mapTransactionStatus(transactionStatus, fraudStatus);

    // Update in database idempotently
    const updatedTx = db.updateTransactionStatus(orderId, mappedStatus);

    if (!updatedTx) {
      return NextResponse.json({ error: 'Transaksi tidak ditemukan.' }, { status: 404 });
    }

    // Log admin audit
    db.addAuditLog({
      adminId: 'midtrans-webhook',
      adminEmail: 'system@midtrans.com',
      action: 'PAYMENT_WEBHOOK_RECEIVED',
      targetType: 'transaction',
      targetId: orderId,
      details: `Notifikasi pembayaran diterima: Status ${mappedStatus.toUpperCase()} untuk order ${orderId} (Rp${grossAmount}).`,
    });

    return NextResponse.json({ success: true, status: mappedStatus });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Webhook processing failed.' },
      { status: 500 }
    );
  }
}
