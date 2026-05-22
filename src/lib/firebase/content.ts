// src/lib/firebase/content.ts
import { db } from './client';
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';

/** ───────────────────────── SIGNUPS ──────────────────────────
 * Collection: signups
 * Fields: email, locale, createdAt (serverTimestamp)
 */
export async function addSignup(email: string, locale: string): Promise<void> {
  await addDoc(collection(db, 'signups'), {
    email: email.trim().toLowerCase(),
    locale,
    createdAt: serverTimestamp(),
  });
}

/** ───────────────────────── ABOUT US ─────────────────────────
 * Collection: pages
 * Doc ID:     about_us
 * Fields:
 *   content: { en: string, de: string, ar: string }
 *   cards: [
 *     { key: string, icon: string,
 *       title: { en: string, de: string, ar: string },
 *       body:  { en: string, de: string, ar: string }
 *     }, ...
 *   ]
 *   updatedAt: timestamp
 */
export type AboutUsCard = {
  key: string;
  icon?: string; // "rocket_launch" | "favorite" | "mail" | ...
  title: Record<string, string>;
  body: Record<string, string>;
};

export type AboutUsDoc = {
  content: Record<string, string>; // { en, de, ar }
  cards?: AboutUsCard[];
  updatedAt?: any; // Firestore Timestamp or ms
};

export async function getAboutUs(): Promise<AboutUsDoc | null> {
  const ref = doc(db, 'pages', 'about_us');
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as AboutUsDoc) : null;
}

export function listenAboutUs(cb: (d: AboutUsDoc | null) => void) {
  const ref = doc(db, 'pages', 'about_us');
  return onSnapshot(ref, (snap) => cb(snap.exists() ? (snap.data() as AboutUsDoc) : null));
}

/** ─────────────────────── PRIVACY / TERMS ─────────────────────
 * Collection: pages
 * Docs: "privacy", "terms"
 * Fields:
 *   locales: { en: {title, body}, de: {...}, ar: {...} }
 *   type: "privacy" | "terms"
 *   version?: string
 *   updatedAt?: timestamp
 */
export type LocalizedBlock = { title?: string; body?: string };

export type PolicyDoc = {
  locales: Record<string, LocalizedBlock>;
  type: 'privacy' | 'terms';
  version?: string;
  updatedAt?: any; // Firestore Timestamp or ms
};

export async function getPolicy(type: 'privacy' | 'terms'): Promise<PolicyDoc | null> {
  const ref = doc(db, 'pages', type);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as PolicyDoc) : null;
}

export function listenPolicy(type: 'privacy' | 'terms', cb: (d: PolicyDoc | null) => void) {
  const ref = doc(db, 'pages', type);
  return onSnapshot(ref, (snap) => cb(snap.exists() ? (snap.data() as PolicyDoc) : null));
}

/** ───────────────────────── SUPPORT FAQS ──────────────────────
 * Collection: support_faqs
 * Docs: one per FAQ (id is any uid)
 * Fields:
 *   question: { en, de, ar }
 *   answer:   { en, de, ar }
 */
export type SupportFaq = {
  id: string;
  question: Record<string, string>;
  answer: Record<string, string>;
};

export async function getSupportFaqs(): Promise<SupportFaq[]> {
  const snap: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'support_faqs'));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SupportFaq, 'id'>) }));
}

export function listenSupportFaqs(cb: (items: SupportFaq[]) => void) {
  return onSnapshot(collection(db, 'support_faqs'), (snap) => {
    const out: SupportFaq[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SupportFaq, 'id'>) }));
    cb(out);
  });
}
