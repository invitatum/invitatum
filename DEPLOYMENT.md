# INVITATUM — PANDUAN DEPLOYMENT & KONFIGURASI PRODUKSI

Dokumen ini berisi instruksi lengkap untuk menghubungkan domain, Vercel, Firebase, dan Midtrans agar platform **Invitatum** siap melayani pengguna secara live di domain utama dan subdomain.

---

## 1. STRUKTUR & VARIABEL ENVIRONMENT

Buat file environment di dashboard Vercel (**Project Settings > Environment Variables**):

| Nama Variable | Deskripsi | Contoh Nilai |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | URL domain utama platform | `https://invitatum.com` |
| `NEXT_PUBLIC_MAIN_DOMAIN` | Host domain utama untuk routing subdomain | `invitatum.com` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | API Key dari Firebase Console | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domain autentikasi Firebase | `invitatum-prod.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID Firebase | `invitatum-prod` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket Storage Firebase | `invitatum-prod.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Sender ID Firebase | `123456789012` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID web Firebase | `1:123456789012:web:...` |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Private Key JSON Firebase Admin (stringified) | `{"type":"service_account",...}` |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Client Key Midtrans | `Mid-client-...` |
| `MIDTRANS_SERVER_KEY` | Server Key Midtrans (Rahasia di Backend) | `Mid-server-...` |
| `MIDTRANS_IS_PRODUCTION` | Flag mode produksi Midtrans | `true` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Email resmi bantuan | `bantuan@invitatum.com` |
| `NEXT_PUBLIC_SUPPORT_WHATSAPP` | Nomor WhatsApp customer service | `+6281234567890` |
| `SUPERADMIN_EMAIL` | Email akun Super Admin pertama | `admin@invitatum.com` |

---

## 2. DEPLOYMENT KE VERCEL

1. **Hubungkan Repository**:
   - Push repository Invitatum ke GitHub / GitLab.
   - Buka [vercel.com](https://vercel.com) > **Add New Project** > Pilih repository `invitatum`.

2. **Framework Preset**:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (atau direktori project)
   - Build Command: `next build` (atau `bun run build`)

3. **Deploy**:
   - Klik **Deploy**. Vercel akan otomatis melakukan proses build dan optimasi SSR/SSG.

---

## 3. KONFIGURASI DOMAIN & WILDCARD SUBDOMAIN

Setiap undangan diakses menggunakan format subdomain:
`alyadanbudi.invitatum.com` dan `alyadanbudi.invitatum.com/untuk/nama-tamu`

### Pengaturan DNS (Domain Registrar / Cloudflare):
1. **Domain Utama**:
   - Tipe: `A` / `CNAME`
   - Name: `@`
   - Content: `76.76.21.21` (atau `cname.vercel-dns.com`)

2. **Wildcard Subdomain**:
   - Tipe: `CNAME`
   - Name: `*`
   - Content: `cname.vercel-dns.com`
   - Proxy status: DNS only (jika menggunakan Cloudflare)

3. **Vercel Domains**:
   - Masukkan `invitatum.com`
   - Masukkan `*.invitatum.com` (Wildcard Domain)
   - Vercel akan menerbitkan sertifikat SSL/TLS wildcard otomatis melalui Let's Encrypt.

---

## 4. KONFIGURASI FIREBASE

1. **Authentication**:
   - Aktifkan provider **Email/Password** dan **Google Sign-In**.
   - Tambahkan domain `invitatum.com` dan `*.invitatum.com` ke daftar **Authorized Domains**.

2. **Firestore Database**:
   - Jalankan aturan keamanan yang terdapat pada file `src/lib/firebase/rules/firestore.rules`.
   - Seluruh role Super Admin divalidasi ketat di sisi server.

3. **Storage**:
   - Terapkan aturan file `src/lib/firebase/rules/storage.rules`.
   - Batas file: Foto maks. 5MB, Musik maks. 8MB, Video maks. 50MB.

---

## 5. KONFIGURASI PAYMENT GATEWAY MIDTRANS

1. **Pendaftaran & Mode Produksi**:
   - Daftarkan akun di [midtrans.com](https://midtrans.com).
   - Masuk ke menu **Settings > Configuration**.

2. **Payment Notification URL (Webhook)**:
   - Masukkan URL webhook endpoint:
     `https://invitatum.com/api/webhooks/midtrans`

3. **Metode Pembayaran**:
   - Aktifkan QRIS (GoPay, OVO, Dana, ShopeePay).
   - Aktifkan Virtual Account (BCA, Mandiri, BNI, BRI, Permata).
   - Aktifkan Kartu Kredit/Debit bila diinginkan.

---

## 6. BACKUP RUTIN MINGGUAN & RETENSI DATA

- **Jadwal Backup**: Setiap hari Minggu pukul 02.00 WIB.
- **Retensi Kedaluwarsa**: 90 hari setelah paket berakhir untuk memberikan kesempatan perpanjangan (renewal).
- **Retensi Tempat Sampah**: 30 hari setelah undangan dihapus pengguna sebelum data dihapus permanen.
