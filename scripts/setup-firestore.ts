import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import {
  defaultPackages,
  defaultTemplates,
  defaultDemoInvitation,
  defaultSampleGuests,
  defaultSampleWishes,
  defaultFaqs,
  defaultSystemSettings,
} from '../src/lib/data/defaultData';

async function main() {
  console.log('--- Inisialisasi Data Firestore Invitatum ---');

  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === 'invitatum-dev') {
    console.log('Project ID belum dikonfigurasi ke Firebase produksi. Silakan set NEXT_PUBLIC_FIREBASE_PROJECT_ID di .env.local.');
    return;
  }

  const app = !getApps().length
    ? initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    : getApps()[0];

  const db = getFirestore(app);

  console.log('1. Menulis data paket (packages)...');
  for (const pkg of defaultPackages) {
    await db.collection('packages').doc(pkg.id).set(pkg, { merge: true });
  }

  console.log('2. Menulis data template (templates)...');
  for (const tmpl of defaultTemplates) {
    await db.collection('templates').doc(tmpl.id).set(tmpl, { merge: true });
  }

  console.log('3. Menulis undangan demo (invitations)...');
  await db.collection('invitations').doc(defaultDemoInvitation.id).set(defaultDemoInvitation, { merge: true });

  console.log('4. Menulis data sampel tamu (guests)...');
  for (const guest of defaultSampleGuests) {
    await db.collection('invitations').doc(defaultDemoInvitation.id).collection('guests').doc(guest.id).set(guest, { merge: true });
  }

  console.log('5. Menulis ucapan sampel (wishes)...');
  for (const wish of defaultSampleWishes) {
    await db.collection('wishes').doc(wish.id).set(wish, { merge: true });
  }

  console.log('6. Menulis FAQ...');
  for (const faq of defaultFaqs) {
    await db.collection('faqs').doc(faq.id).set(faq, { merge: true });
  }

  console.log('7. Menulis pengaturan sistem...');
  await db.collection('systemSettings').doc('core').set(defaultSystemSettings, { merge: true });

  console.log('Selesai! Seluruh data awal berhasil disinkronkan ke Firestore.');
}

main().catch((err) => {
  console.error('Error inisialisasi Firestore:', err);
});
