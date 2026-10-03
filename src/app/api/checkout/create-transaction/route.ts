import { NextResponse } from 'next/server';
import { midtrans } from '@/lib/midtrans/client';
import { db } from '@/lib/db/dbAdapter';
import { PackageTier, TransactionRecord } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invitationId, packageTier, customerName, customerEmail, customerPhone, userId } = body;

    if (!invitationId || !packageTier || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Parameter transaksi tidak lengkap.' },
        { status: 400 }
      );
    }

    const pkg = db.getPackageById(`package-${packageTier}`);
    if (!pkg) {
      return NextResponse.json({ error: 'Paket tidak ditemukan.' }, { status: 404 });
    }

    const orderId = `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create transaction in Midtrans (or sandbox simulation)
    const midtransRes = await midtrans.createTransaction({
      orderId,
      grossAmount: pkg.price,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '+6281200000000',
      invitationId,
      packageTier: packageTier as PackageTier,
    });

    // Record transaction locally
    const tx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      orderId,
      userId: userId || 'user-demo',
      invitationId,
      packageTier: packageTier as PackageTier,
      type: 'initial_package',
      amount: pkg.price,
      status: 'pending',
      snapToken: midtransRes.token,
      snapRedirectUrl: midtransRes.redirectUrl,
      createdAt: new Date().toISOString(),
    };

    db.createTransaction(tx);

    return NextResponse.json({
      success: true,
      orderId,
      snapToken: midtransRes.token,
      redirectUrl: midtransRes.redirectUrl,
      isMock: midtransRes.isMock,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Gagal memproses transaksi.' },
      { status: 500 }
    );
  }
}
