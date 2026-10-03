import {
  InvitationData,
  InvitationTemplate,
  PackagePlan,
  GuestItem,
  RsvpItem,
  WishItem,
  TransactionRecord,
  AuditLogItem,
  SystemSettings,
  FaqItem,
  UserProfile,
  TransactionStatus,
} from '@/types';
import {
  defaultPackages,
  defaultTemplates,
  defaultDemoInvitation,
  defaultSampleGuests,
  defaultSampleWishes,
  defaultFaqs,
  defaultSystemSettings,
} from '@/lib/data/defaultData';

// In-Memory store as source of truth for dev/demo and fallback mode
class LocalDataStore {
  private invitations: Map<string, InvitationData> = new Map();
  private templates: Map<string, InvitationTemplate> = new Map();
  private packages: Map<string, PackagePlan> = new Map();
  private guests: Map<string, GuestItem> = new Map();
  private rsvps: Map<string, RsvpItem> = new Map();
  private wishes: Map<string, WishItem> = new Map();
  private transactions: Map<string, TransactionRecord> = new Map();
  private auditLogs: AuditLogItem[] = [];
  private users: Map<string, UserProfile> = new Map();
  private settings: SystemSettings = { ...defaultSystemSettings };
  private faqs: FaqItem[] = [...defaultFaqs];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;

    // Seed default packages
    defaultPackages.forEach((p) => this.packages.set(p.id, p));

    // Seed default templates
    defaultTemplates.forEach((t) => this.templates.set(t.id, t));

    // Seed demo invitation
    this.invitations.set(defaultDemoInvitation.id, { ...defaultDemoInvitation });

    // Seed sample guests & wishes
    defaultSampleGuests.forEach((g) => this.guests.set(g.id, g));
    defaultSampleWishes.forEach((w) => this.wishes.set(w.id, w));

    // Seed default admin user
    const adminUser: UserProfile = {
      id: 'admin-super-01',
      email: 'admin@invitatum.com',
      displayName: 'Super Admin Invitatum',
      whatsappNumber: '+6281234567890',
      role: 'admin',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    this.users.set(adminUser.id, adminUser);

    // Seed regular demo user
    const demoUser: UserProfile = {
      id: 'user-demo',
      email: 'demo@invitatum.com',
      displayName: 'Alya & Budi',
      whatsappNumber: '+6281298765432',
      role: 'user',
      createdAt: '2026-03-01T00:00:00Z',
      updatedAt: '2026-03-01T00:00:00Z',
    };
    this.users.set(demoUser.id, demoUser);

    // Initial audit log
    this.auditLogs.push({
      id: 'audit-001',
      adminId: 'admin-super-01',
      adminEmail: 'admin@invitatum.com',
      action: 'SYSTEM_INITIALIZATION',
      targetType: 'system',
      targetId: 'invitatum-core',
      details: 'Platform Invitatum diinisialisasi dengan konfigurasi default dan 5 template utama.',
      timestamp: new Date().toISOString(),
    });

    this.isInitialized = true;
  }

  // --- Users ---
  getUserById(id: string): UserProfile | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): UserProfile | undefined {
    return Array.from(this.users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  saveUser(user: UserProfile): void {
    this.users.set(user.id, user);
  }

  getAllUsers(): UserProfile[] {
    return Array.from(this.users.values());
  }

  // --- Invitations ---
  getInvitationById(id: string): InvitationData | undefined {
    return this.invitations.get(id);
  }

  getInvitationBySlug(slug: string): InvitationData | undefined {
    const cleanSlug = slug.toLowerCase().trim();
    return Array.from(this.invitations.values()).find(
      (inv) => inv.slug.toLowerCase() === cleanSlug && inv.status !== 'deleted'
    );
  }

  getUserInvitations(userId: string): InvitationData[] {
    return Array.from(this.invitations.values()).filter(
      (inv) => inv.userId === userId && inv.status !== 'deleted'
    );
  }

  getAllInvitations(): InvitationData[] {
    return Array.from(this.invitations.values());
  }

  saveInvitation(invitation: InvitationData): void {
    invitation.updatedAt = new Date().toISOString();
    this.invitations.set(invitation.id, { ...invitation });
  }

  softDeleteInvitation(id: string): boolean {
    const inv = this.invitations.get(id);
    if (!inv) return false;
    inv.status = 'deleted';
    inv.deletedAt = new Date().toISOString();
    this.invitations.set(id, inv);
    return true;
  }

  restoreInvitation(id: string): boolean {
    const inv = this.invitations.get(id);
    if (!inv || inv.status !== 'deleted') return false;
    inv.status = 'draft';
    delete inv.deletedAt;
    this.invitations.set(id, inv);
    return true;
  }

  // --- Templates ---
  getTemplates(): InvitationTemplate[] {
    return Array.from(this.templates.values());
  }

  getTemplateById(id: string): InvitationTemplate | undefined {
    return this.templates.get(id);
  }

  getTemplateBySlug(slug: string): InvitationTemplate | undefined {
    return Array.from(this.templates.values()).find((t) => t.slug === slug);
  }

  saveTemplate(template: InvitationTemplate): void {
    template.updatedAt = new Date().toISOString();
    this.templates.set(template.id, { ...template });
  }

  deleteTemplate(id: string): boolean {
    return this.templates.delete(id);
  }

  // --- Packages ---
  getPackages(): PackagePlan[] {
    return Array.from(this.packages.values());
  }

  getPackageById(id: string): PackagePlan | undefined {
    return this.packages.get(id);
  }

  savePackage(pkg: PackagePlan): void {
    this.packages.set(pkg.id, { ...pkg });
  }

  // --- Guests ---
  getGuests(invitationId: string): GuestItem[] {
    return Array.from(this.guests.values()).filter((g) => g.invitationId === invitationId);
  }

  getGuestBySlug(invitationId: string, guestSlug: string): GuestItem | undefined {
    return Array.from(this.guests.values()).find(
      (g) => g.invitationId === invitationId && g.slug.toLowerCase() === guestSlug.toLowerCase()
    );
  }

  getGuestByQrToken(qrToken: string): GuestItem | undefined {
    return Array.from(this.guests.values()).find((g) => g.qrToken === qrToken);
  }

  saveGuest(guest: GuestItem): void {
    this.guests.set(guest.id, { ...guest });
  }

  deleteGuest(id: string): boolean {
    return this.guests.delete(id);
  }

  checkInGuest(invitationId: string, qrToken: string, operatorName: string = 'Petugas Resepsionis'): {
    success: boolean;
    guest?: GuestItem;
    message: string;
    alreadyCheckedIn?: boolean;
  } {
    const guest = Array.from(this.guests.values()).find(
      (g) => g.invitationId === invitationId && (g.qrToken === qrToken || g.id === qrToken)
    );

    if (!guest) {
      return { success: false, message: 'Kode QR tidak dikenali atau tidak terdaftar pada acara ini.' };
    }

    if (guest.isCheckedIn) {
      return {
        success: false,
        alreadyCheckedIn: true,
        guest,
        message: `Tamu "${guest.name}" sudah melakukan check-in pada ${new Date(
          guest.checkedInAt || ''
        ).toLocaleTimeString('id-ID')}.`,
      };
    }

    guest.isCheckedIn = true;
    guest.checkedInAt = new Date().toISOString();
    guest.checkedInBy = operatorName;
    this.guests.set(guest.id, guest);

    return {
      success: true,
      guest,
      message: `Check-in berhasil untuk "${guest.name}" (${guest.attendeesCount} orang).`,
    };
  }

  // --- RSVPs ---
  getRsvps(invitationId: string): RsvpItem[] {
    return Array.from(this.rsvps.values()).filter((r) => r.invitationId === invitationId);
  }

  saveRsvp(rsvp: RsvpItem): void {
    this.rsvps.set(rsvp.id, { ...rsvp });

    // Also update guest status if matched
    if (rsvp.guestId && this.guests.has(rsvp.guestId)) {
      const g = this.guests.get(rsvp.guestId)!;
      g.rsvpStatus = rsvp.status;
      g.attendeesCount = rsvp.attendeesCount;
      if (rsvp.notes) g.notes = rsvp.notes;
      this.guests.set(g.id, g);
    }
  }

  // --- Wishes ---
  getWishes(invitationId: string, approvedOnly = false): WishItem[] {
    const list = Array.from(this.wishes.values()).filter((w) => w.invitationId === invitationId && !w.isSpam);
    return approvedOnly ? list.filter((w) => w.isApproved) : list;
  }

  saveWish(wish: WishItem): void {
    this.wishes.set(wish.id, { ...wish });
  }

  toggleWishApproval(id: string, isApproved: boolean): boolean {
    const wish = this.wishes.get(id);
    if (!wish) return false;
    wish.isApproved = isApproved;
    this.wishes.set(id, wish);
    return true;
  }

  deleteWish(id: string): boolean {
    return this.wishes.delete(id);
  }

  // --- Transactions ---
  getTransactions(userId?: string): TransactionRecord[] {
    const all = Array.from(this.transactions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (!userId) return all;
    return all.filter((t) => t.userId === userId);
  }

  getTransactionByOrderId(orderId: string): TransactionRecord | undefined {
    return Array.from(this.transactions.values()).find((t) => t.orderId === orderId);
  }

  createTransaction(tx: TransactionRecord): void {
    this.transactions.set(tx.id, { ...tx });
  }

  updateTransactionStatus(orderId: string, status: TransactionStatus): TransactionRecord | undefined {
    const tx = this.getTransactionByOrderId(orderId);
    if (!tx) return undefined;

    tx.status = status;
    if (status === 'settlement') {
      tx.settledAt = new Date().toISOString();

      // Automatically activate entitlement on the invitation
      const inv = this.invitations.get(tx.invitationId);
      if (inv) {
        inv.status = 'paid';
        inv.paidAt = tx.settledAt;
        inv.packageTier = tx.packageTier;

        // Calculate expiration date
        const pkg = this.packages.get(`package-${tx.packageTier}`);
        const activeMonths = pkg ? pkg.activeMonths : 12;
        const exp = new Date();
        exp.setMonth(exp.getMonth() + activeMonths);
        inv.expiresAt = exp.toISOString();

        this.invitations.set(inv.id, inv);
      }
    }

    this.transactions.set(tx.id, tx);
    return tx;
  }

  // --- Audit Logs ---
  getAuditLogs(): AuditLogItem[] {
    return [...this.auditLogs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  addAuditLog(log: Omit<AuditLogItem, 'id' | 'timestamp'>): void {
    const newLog: AuditLogItem = {
      ...log,
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
  }

  // --- Settings & FAQs ---
  getSettings(): SystemSettings {
    return { ...this.settings };
  }

  updateSettings(settings: Partial<SystemSettings>): SystemSettings {
    this.settings = { ...this.settings, ...settings };
    return { ...this.settings };
  }

  getFaqs(): FaqItem[] {
    return [...this.faqs];
  }

  saveFaq(faq: FaqItem): void {
    const index = this.faqs.findIndex((f) => f.id === faq.id);
    if (index >= 0) {
      this.faqs[index] = faq;
    } else {
      this.faqs.push(faq);
    }
  }

  deleteFaq(id: string): void {
    this.faqs = this.faqs.filter((f) => f.id !== id);
  }
}

// Global singleton instance
export const db = new LocalDataStore();
