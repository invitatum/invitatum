import crypto from 'crypto';
import { TransactionRecord, PackageTier, TransactionStatus } from '@/types';

export interface CreateTransactionParams {
  orderId: string;
  grossAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  invitationId: string;
  packageTier: PackageTier;
  itemDetails?: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
}

export class MidtransClient {
  private serverKey: string;
  private clientKey: string;
  private isProduction: boolean;

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-MOCK-SANDBOX-KEY';
    this.clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-MOCK-SANDBOX-KEY';
    this.isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
  }

  getSnapUrl(): string {
    return this.isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
  }

  getApiBaseUrl(): string {
    return this.isProduction
      ? 'https://app.midtrans.com/snap/v1'
      : 'https://app.sandbox.midtrans.com/snap/v1';
  }

  // Create Snap transaction token
  async createTransaction(params: CreateTransactionParams): Promise<{
    token: string;
    redirectUrl: string;
    isMock: boolean;
  }> {
    // If running in development without real Midtrans credentials, return sandbox mock token
    const isMock = !process.env.MIDTRANS_SERVER_KEY || this.serverKey.includes('MOCK');

    if (isMock) {
      const mockToken = `snap-token-mock-${Date.now()}-${params.orderId}`;
      const mockRedirectUrl = `/checkout/simulated-payment?order_id=${params.orderId}&status=success`;
      return {
        token: mockToken,
        redirectUrl: mockRedirectUrl,
        isMock: true,
      };
    }

    const payload = {
      transaction_details: {
        order_id: params.orderId,
        gross_amount: Math.round(params.grossAmount),
      },
      customer_details: {
        first_name: params.customerName,
        email: params.customerEmail,
        phone: params.customerPhone,
      },
      item_details: params.itemDetails || [
        {
          id: `pkg-${params.packageTier}`,
          price: Math.round(params.grossAmount),
          quantity: 1,
          name: `Paket Undangan Invitatum (${params.packageTier.toUpperCase()})`,
        },
      ],
      custom_field1: params.invitationId,
      custom_field2: params.packageTier,
    };

    const authHeader = Buffer.from(`${this.serverKey}:`).toString('base64');

    const res = await fetch(`${this.getApiBaseUrl()}/transactions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Midtrans API Error: ${res.status} ${errText}`);
    }

    const data = await res.json();
    return {
      token: data.token,
      redirectUrl: data.redirect_url,
      isMock: false,
    };
  }

  // Verify Midtrans notification webhook signature
  verifySignature(
    orderId: string,
    statusCode: string,
    grossAmount: string,
    signatureKey: string
  ): boolean {
    if (this.serverKey.includes('MOCK')) {
      // In development mock mode, pass validation
      return true;
    }

    const rawString = `${orderId}${statusCode}${grossAmount}${this.serverKey}`;
    const hash = crypto.createHash('sha512').update(rawString).digest('hex');
    return hash.toLowerCase() === signatureKey.toLowerCase();
  }

  // Map Midtrans status string to Invitatum TransactionStatus
  mapTransactionStatus(midtransStatus: string, fraudStatus?: string): TransactionStatus {
    if (midtransStatus === 'capture') {
      if (fraudStatus === 'challenge') return 'pending';
      return 'settlement';
    }
    if (midtransStatus === 'settlement') return 'settlement';
    if (midtransStatus === 'pending') return 'pending';
    if (['deny', 'cancel', 'expire'].includes(midtransStatus)) return 'cancel';
    if (midtransStatus === 'refund') return 'failed';
    return 'pending';
  }
}

export const midtrans = new MidtransClient();
