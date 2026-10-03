import { describe, it, expect } from 'bun:test';
import { db } from '../src/lib/db/dbAdapter';
import { midtrans } from '../src/lib/midtrans/client';

describe('Invitatum Platform Core QA Test Suite', () => {
  it('should initialize with default packages and templates', () => {
    const packages = db.getPackages();
    expect(packages.length).toBe(3);

    const basicPkg = packages.find((p) => p.tier === 'basic');
    expect(basicPkg?.price).toBe(25000);
    expect(basicPkg?.activeMonths).toBe(6);

    const premiumPkg = packages.find((p) => p.tier === 'premium');
    expect(premiumPkg?.price).toBe(45000);
    expect(premiumPkg?.activeMonths).toBe(12);

    const exclusivePkg = packages.find((p) => p.tier === 'exclusive');
    expect(exclusivePkg?.price).toBe(69000);
    expect(exclusivePkg?.activeMonths).toBe(24);

    const templates = db.getTemplates();
    expect(templates.length).toBeGreaterThanOrEqual(3);
  });

  it('should retrieve demo invitation and sample data', () => {
    const demoInv = db.getInvitationById('demo-invitation-alya-budi');
    expect(demoInv).toBeDefined();
    expect(demoInv?.slug).toBe('alyadanbudi');
    expect(demoInv?.couple.groomNickname).toBe('Budi');
    expect(demoInv?.couple.brideNickname).toBe('Alya');

    const guests = db.getGuests('demo-invitation-alya-budi');
    expect(guests.length).toBeGreaterThanOrEqual(2);

    const wishes = db.getWishes('demo-invitation-alya-budi');
    expect(wishes.length).toBeGreaterThanOrEqual(2);
  });

  it('should check in guest and prevent duplicate check-in', () => {
    const res1 = db.checkInGuest('demo-invitation-alya-budi', 'QR-ALYA-BUDI-001', 'Meja A');
    expect(res1.success).toBe(true);

    const res2 = db.checkInGuest('demo-invitation-alya-budi', 'QR-ALYA-BUDI-001', 'Meja B');
    expect(res2.success).toBe(false);
    expect(res2.alreadyCheckedIn).toBe(true);
  });

  it('should process transaction settlement and activate invitation entitlement', () => {
    const orderId = `TEST-ORDER-${Date.now()}`;
    const testInvId = 'demo-invitation-alya-budi';

    db.createTransaction({
      id: `tx-${Date.now()}`,
      orderId,
      userId: 'user-demo',
      invitationId: testInvId,
      packageTier: 'exclusive',
      type: 'initial_package',
      amount: 69000,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    const updatedTx = db.updateTransactionStatus(orderId, 'settlement');
    expect(updatedTx?.status).toBe('settlement');

    const inv = db.getInvitationById(testInvId);
    expect(inv?.status).toBe('paid');
    expect(inv?.packageTier).toBe('exclusive');
    expect(inv?.expiresAt).toBeDefined();
  });

  it('should verify Midtrans sandbox signature and mapping', () => {
    const isValid = midtrans.verifySignature('ORDER-123', '200', '45000', 'mock-sig');
    expect(isValid).toBe(true);

    expect(midtrans.mapTransactionStatus('settlement')).toBe('settlement');
    expect(midtrans.mapTransactionStatus('pending')).toBe('pending');
    expect(midtrans.mapTransactionStatus('expire')).toBe('cancel');
  });

  it('should add and retrieve admin audit logs', () => {
    db.addAuditLog({
      adminId: 'admin-super-01',
      adminEmail: 'admin@invitatum.com',
      action: 'UNIT_TEST_ACTION',
      targetType: 'test',
      targetId: 'test-1',
      details: 'Audit log unit test verified',
    });

    const logs = db.getAuditLogs();
    const latest = logs.find((l) => l.action === 'UNIT_TEST_ACTION');
    expect(latest).toBeDefined();
  });
});
