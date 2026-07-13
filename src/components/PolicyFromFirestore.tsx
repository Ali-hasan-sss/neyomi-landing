'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { getPage } from '@/lib/api';
import RichHtml from '@/components/RichHtml';

export default function PolicyFromFirestore({ type }: { type: 'privacy' | 'terms' }) {
  const locale = useLocale();
  const [data, setData] = useState<{ title: string; body: string; version?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPage(type, locale).then((pageData) => {
      if (pageData) {
        setData({
          title: pageData.title,
          body: pageData.body,
          version: pageData.version,
        });
      }
      setLoading(false);
    }).catch((error) => {
      console.error(`Error fetching ${type} page:`, error);
      setError(error instanceof Error ? error.message : 'Failed to load page');
      setLoading(false);
    });
  }, [type, locale]);

  const block = data || { title: '', body: '' };

  return (
    <section className="section">
      <div className="container stack">
        <h1 className="h1">{block.title || (type === 'privacy'
          ? (locale==='de' ? 'Datenschutzerklärung' : locale==='ar' ? 'سياسة الخصوصية' : 'Privacy Policy')
          : (locale==='de' ? 'Nutzungsbedingungen' : locale==='ar' ? 'الشروط والأحكام' : 'Terms & Conditions'))}
        </h1>

        {data?.version ? (
          <div className="label" style={{ opacity:.8 }}>
            Version {data.version}
          </div>
        ) : null}

        {loading && !data ? (
          <div className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70">Loading…</div>
        ) : error ? (
          <div className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
            <p className="text-red-500 font-semibold">Error: {error}</p>
            <p className="text-sm mt-2 opacity-70">Please ensure API_URL is configured in .env.local</p>
          </div>
        ) : (
          <article className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
            <RichHtml html={block.body || ''} />
          </article>
        )}
      </div>
    </section>
  );
}
