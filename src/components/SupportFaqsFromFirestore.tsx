'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getSupportFaqs as getSupportFaqsFromAPI, SupportFaq } from '@/lib/api';

export default function SupportFaqsFromFirestore() {
  const t = useTranslations('faqs');
  const locale = useLocale();
  const [faqs, setFaqs] = useState<SupportFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch from backend API
  useEffect(() => {
    setLoading(true);
    setError(null);
    getSupportFaqsFromAPI(locale).then((items) => {
      setFaqs(items);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching FAQs:', error);
      setError(error instanceof Error ? error.message : 'Failed to load FAQs');
      setLoading(false);
    });
  }, [locale]);

  const localized = useMemo(() => {
    return faqs.map((f) => ({
      id: f.id,
      q: f.question,
      a: f.answer,
    }));
  }, [faqs]);

  // refs & handlers
  const detailsRefs = useRef<HTMLDetailsElement[]>([]);
  const cleanupFns = useRef<(() => void)[]>([]);

  useEffect(() => {
    // clean previous listeners
    cleanupFns.current.forEach((fn) => fn());
    cleanupFns.current = [];

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    detailsRefs.current.forEach((details) => {
      if (!details) return;
      const summary = details.querySelector('summary') as HTMLElement | null;
      const panel = details.querySelector('.faq-a') as HTMLElement | null;
      if (!summary || !panel) return;

      // ensure initial state
      if (details.open) {
        panel.style.height = 'auto';
        panel.style.opacity = '1';
      } else {
        panel.style.height = '0px';
        panel.style.opacity = '0';
      }

      let animating = false;
      const duration = reduced ? 0 : 240;

      const collapse = () => {
        if (animating) return;
        animating = true;
        // set fixed height from current, then animate to 0
        const start = panel.scrollHeight;
        panel.style.height = `${start}px`;
        panel.style.opacity = '1';
        // force reflow
        // @ts-ignore
        panel.offsetHeight;
        panel.style.transition = `height ${duration}ms ease, opacity ${duration}ms ease`;
        panel.style.height = '0px';
        panel.style.opacity = '0';
        const onEnd = () => {
          panel.style.transition = '';
          // finally close the details
          details.open = false;
          animating = false;
          panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
      };

      const expand = () => {
        if (animating) return;
        animating = true;
        // mark as open first so content is available for measuring
        details.open = true;
        // start from 0
        panel.style.height = '0px';
        panel.style.opacity = '0';
        // force reflow
        // @ts-ignore
        panel.offsetHeight;
        const target = panel.scrollHeight;
        panel.style.transition = `height ${duration}ms ease, opacity ${duration}ms ease`;
        panel.style.height = `${target}px`;
        panel.style.opacity = '1';
        const onEnd = () => {
          panel.style.transition = '';
          panel.style.height = 'auto'; // so content resize inside won’t break
          animating = false;
          panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
      };

      // intercept click to prevent native snap
      const onClick = (e: Event) => {
        e.preventDefault();
        details.open ? collapse() : expand();
      };

      // keyboard support (Space/Enter on summary)
      const onKeyDown = (e: KeyboardEvent) => {
        const code = e.code || (e as any).key || '';
        if (code === 'Space' || code === 'Enter') {
          e.preventDefault();
          details.open ? collapse() : expand();
        }
      };

      summary.addEventListener('click', onClick);
      summary.addEventListener('keydown', onKeyDown);

      // store cleanup
      cleanupFns.current.push(() => {
        summary.removeEventListener('click', onClick);
        summary.removeEventListener('keydown', onKeyDown);
      });
    });

    return () => {
      cleanupFns.current.forEach((fn) => fn());
      cleanupFns.current = [];
    };
  }, [localized]);

  return (
    <div className="faqs">
      <h2 className="h2 section-title-lg">{t('title')}</h2>

      {loading && localized.length === 0 ? (
        <div className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70">Loading…</div>
      ) : error ? (
        <div className="card backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
          <p className="text-red-500 font-semibold">Error: {error}</p>
          <p className="text-sm mt-2 opacity-70">Please ensure NEXT_PUBLIC_API_URL is configured in .env.local</p>
        </div>
      ) : (
        <div className="faq-list">
          {localized.map((it, i) => (
            <details
              key={it.id}
              className="faq-item card gradient-border backdrop-blur-md bg-white/70 dark:bg-gray-900/70"
              ref={(el) => { if (el) detailsRefs.current[i] = el; }}
            >
              <summary className="faq-q h3">
                <span className="q-text">{it.q}</span>
                {/* chevron arrow */}
                <svg className="chev" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </summary>

              <div className="faq-a">
                <p className="faq-a-text">{it.a}</p>
              </div>
            </details>
          ))}
        </div>
      )}

      <style jsx>{`
        .faq-list { display: grid; gap: 12px; }
        .faq-item { overflow: hidden; border-radius: 16px; }

        .faq-q {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          cursor: pointer;
          text-align: start; /* RTL-aware */
        }
        .faq-q::-webkit-details-marker { display: none; }

        /* Arrow rotates when open */
        details[open] .chev { transform: rotate(180deg); }
        .chev { transition: transform .22s ease; opacity: .9; }

        /* Animated panel; transition is applied inline per open/close to avoid conflicts */
        .faq-a {
          overflow: hidden;
          text-align: start; /* RTL-aware */
        }
        .faq-a-text { margin: 8px 2px 10px; line-height: 1.65; }
      `}</style>
    </div>
  );
}
