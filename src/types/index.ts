export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  whatsappNumber: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type EventCategory = 'wedding' | 'engagement';

export type PackageTier = 'basic' | 'premium' | 'exclusive';

export interface PackagePlan {
  id: string;
  tier: PackageTier;
  name: string;
  price: number;
  activeMonths: number;
  maxPhotos: number;
  maxVideos: number;
  features: string[];
  description: string;
  isActive: boolean;
}

export type InvitationStatus =
  | 'demo'
  | 'draft'
  | 'pending_payment'
  | 'paid'
  | 'ready_to_publish'
  | 'scheduled'
  | 'published'
  | 'unpublished'
  | 'expired'
  | 'deleted';

export interface EventDetail {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  dressCode?: string;
  notes?: string;
}

export interface LoveStoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface BankAccountGift {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisImageUrl?: string;
}

export interface InvitationData {
  id: string;
  userId: string;
  slug: string;
  title: string;
  category: EventCategory;
  templateId: string;
  packageTier: PackageTier;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  expiresAt?: string;
  scheduledPublishAt?: string;
  language: 'id' | 'en';
  isPrivate: boolean;
  accessPasswordHash?: string;

  // Couple profiles
  couple: {
    groomName: string;
    groomNickname: string;
    groomFather: string;
    groomMother: string;
    groomPhoto: string;
    groomInstagram?: string;
    brideName: string;
    brideNickname: string;
    brideFather: string;
    brideMother: string;
    bridePhoto: string;
    brideInstagram?: string;
    quote: string;
    quoteSource: string;
  };

  // Events
  events: EventDetail[];

  // Countdown
  countdown: {
    isEnabled: boolean;
    targetDate: string;
    timezone: string;
  };

  // Love story
  loveStory: LoveStoryMilestone[];

  // Gallery
  gallery: {
    photos: Array<{ id: string; url: string; caption?: string }>;
    videos: Array<{ id: string; url: string; title?: string }>;
  };

  // Background music
  music: {
    isEnabled: boolean;
    title: string;
    artist: string;
    audioUrl: string;
    autoplay: boolean;
  };

  // RSVP settings
  rsvpSettings: {
    isEnabled: boolean;
    allowPlusOne: boolean;
    maxGuestsPerRsvp: number;
    deadline?: string;
  };

  // Guestbook settings
  guestbookSettings: {
    isEnabled: boolean;
    moderationMode: 'auto' | 'manual' | 'filter';
  };

  // Digital envelope / gift
  digitalGift: {
    isEnabled: boolean;
    accounts: BankAccountGift[];
    shippingAddress?: string;
  };

  // Live streaming
  liveStream: {
    isEnabled: boolean;
    platform: 'youtube' | 'zoom' | 'other';
    url: string;
    note?: string;
  };

  // QR Check-in
  qrCheckIn: {
    isEnabled: boolean;
  };

  // Theme customization
  themeCustomization: {
    primaryColor: string;
    secondaryColor: string;
    fontSerif: string;
    fontSans: string;
    animationType: 'fade' | 'envelope' | 'floral' | 'slide';
    openingCoverType: 'wax_seal' | 'curtain' | 'card' | 'floral_arch';
    backgroundMusicUrl?: string;
  };

  // SEO & Social sharing
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };

  // Counters & flags
  templateChangeUsed: boolean;
  slugChangeUsed: boolean;
  deletedAt?: string;
}

export interface GuestItem {
  id: string;
  invitationId: string;
  name: string;
  slug: string;
  group: string;
  customGreeting?: string;
  qrToken: string;
  isSent: boolean;
  sentVia?: 'whatsapp' | 'manual';
  rsvpStatus: 'pending' | 'attending' | 'declined';
  attendeesCount: number;
  notes?: string;
  isCheckedIn: boolean;
  checkedInAt?: string;
  checkedInBy?: string;
  createdAt: string;
}

export interface RsvpItem {
  id: string;
  invitationId: string;
  guestId?: string;
  guestName: string;
  status: 'attending' | 'declined';
  attendeesCount: number;
  eventId?: string;
  notes?: string;
  createdAt: string;
}

export interface WishItem {
  id: string;
  invitationId: string;
  guestName: string;
  relationship?: string;
  message: string;
  isApproved: boolean;
  isSpam: boolean;
  createdAt: string;
}

export type TransactionType = 'initial_package' | 'renewal' | 'template_change';
export type TransactionStatus = 'pending' | 'settlement' | 'expired' | 'failed' | 'cancel';

export interface TransactionRecord {
  id: string;
  orderId: string;
  userId: string;
  invitationId: string;
  packageTier: PackageTier;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  paymentType?: string;
  snapToken?: string;
  snapRedirectUrl?: string;
  createdAt: string;
  settledAt?: string;
  metadata?: Record<string, unknown>;
}

export type TemplateStyleTag =
  | 'floral'
  | 'minimalist'
  | 'classic'
  | 'luxury'
  | 'modern'
  | 'elegant'
  | 'traditional'
  | 'botanical'
  | 'romantic'
  | 'contemporary';

export interface InvitationTemplate {
  id: string;
  name: string;
  slug: string;
  category: EventCategory;
  description: string;
  thumbnail: string;
  previewDesktop: string;
  previewMobile: string;
  styleTags: TemplateStyleTag[];
  dominantColors: string[];
  fontPreset: {
    serif: string;
    sans: string;
  };
  supportedTiers: PackageTier[];
  status: 'draft' | 'published' | 'archived';
  purchaseCount: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogItem {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'payment';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  question: {
    id: string;
    en: string;
  };
  answer: {
    id: string;
    en: string;
  };
  category: string;
}

export interface SystemSettings {
  supportEmail: string;
  supportWhatsapp: string;
  templateChangeFee: number;
  weeklyBackupEnabled: boolean;
  lastBackupDate?: string;
}
