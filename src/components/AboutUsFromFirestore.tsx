'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { AboutUsDoc, AboutUsCard, getAboutUs, listenAboutUs } from '@/lib/firebase/content';
import { sanitizeHtml } from '@/lib/sanitize';

const ICON_MAP: Record<string, string> = {
  rocket_launch: '🚀',
  favorite: '❤️',
  mail: '✉️',
};

function CardItem({ card, locale }: { card: AboutUsCard; locale: string }) {
  const title = card.title?.[locale] ?? card.title?.en ?? '';
  const body  = card.body?.[locale]  ?? card.body?.en  ?? '';
  const glyph = ICON_MAP[card.icon ?? ''] ?? '✨';

  return (
    <div className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
        <div style={{
          width:36, height:36, borderRadius:10,
          display:'grid', placeItems:'center',
          background:'color-mix(in oklab, var(--bg) 92%, #fff)',
          border:'1px solid var(--border)', fontSize:18
        }}>{glyph}</div>
        <h3 className="h3" style={{ margin:0 }}>{title}</h3>
      </div>
      <p style={{ margin:0, color:'var(--muted)' }}>{body}</p>
    </div>
  );
}

export default function AboutUsFromFirestore() {
  const locale = useLocale();
  const [data, setData] = useState<AboutUsDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | null = null;
    setLoading(true);
    getAboutUs().then((d) => { setData(d); setLoading(false); });
    unsub = listenAboutUs((d) => setData(d));
    return () => { unsub && unsub(); };
  }, []);

  const body = data?.content?.[locale] ?? data?.content?.en ?? '';

  return (
    <section className="section">
      <div className="container stack">
        <h1 className="h1">{locale === 'de' ? 'Über uns' : locale === 'ar' ? 'من نحن' : 'About Us'}</h1>
        {loading && !data ? (
          <div className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70">Loading…</div>
        ) : (
          <>
            <article className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }} />
            {data?.cards?.length ? (
              <div className="features-grid">
                {data.cards.map((c) => (
                  <CardItem key={c.key} card={c} locale={locale} />
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
