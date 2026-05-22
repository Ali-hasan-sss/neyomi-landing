'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { PolicyDoc, getPolicy, listenPolicy } from '@/lib/firebase/content';
import { sanitizeHtml } from '@/lib/sanitize';

export default function PolicyFromFirestore({ type }: { type: 'privacy' | 'terms' }) {
  const locale = useLocale();
  const [data, setData] = useState<PolicyDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | null = null;
    setLoading(true);
    getPolicy(type).then((d) => { setData(d); setLoading(false); });
    unsub = listenPolicy(type, (d) => setData(d));
    return () => { unsub && unsub(); };
  }, [type]);

  const block = data?.locales?.[locale] ?? data?.locales?.en ?? { title: '', body: '' };

  return (
    <section className="section">
      <div className="container stack">
        <h1 className="h1">{block.title || (type === 'privacy'
          ? (locale==='de' ? 'Datenschutzerklärung' : locale==='ar' ? 'سياسة الخصوصية' : 'Privacy Policy')
          : (locale==='de' ? 'Nutzungsbedingungen' : locale==='ar' ? 'الشروط والأحكام' : 'Terms & Conditions'))}
        </h1>

        {data?.version || data?.updatedAt ? (
          <div className="label" style={{ opacity:.8 }}>
            {data.version ? `Version ${data.version}` : null}
            {data.version && data.updatedAt ? ' • ' : ''}
            {data.updatedAt ? `Updated ${new Date(data.updatedAt.seconds ? data.updatedAt.seconds*1000 : data.updatedAt).toLocaleDateString()}` : ''}
          </div>
        ) : null}

        {loading && !data ? (
          <div className="card">Loading…</div>
        ) : (
          <article className="card" dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.body || '') }} />
        )}
      </div>
    </section>
  );
}
