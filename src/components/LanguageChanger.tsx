'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Option = { code: string; label: string; emoji?: string };

type Props = {
  options?: Option[];
  /** initial fallback if nothing is stored */
  defaultLocale?: string;
  /** If true, shows as compact icon-only button */
  compact?: boolean;
};

const DEFAULTS: Option[] = [
  { code: 'en', label: 'English', emoji: '🇬🇧' },
  { code: 'de', label: 'Deutsch', emoji: '🇩🇪' },
  { code: 'ar', label: 'العربية', emoji: '🇸🇦' },
];

export default function LanguageChanger({
  options = DEFAULTS,
  defaultLocale = 'en',
  compact = false,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState(defaultLocale);
  const map = useMemo(() => new Map(options.map(o => [o.code, o])), [options]);

  // Load saved locale on mount
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) || defaultLocale;
    setLocale(saved);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    }
  }, [defaultLocale]);

  // Helper to propagate locale change
  const applyLocale = (next: string) => {
    setLocale(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', next);
      // Update <html>
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      // If your I18nProvider exposes a global setter, call it
      (window as any).setLocale?.(next);
      // Also emit a custom event some providers can listen to
      window.dispatchEvent(new CustomEvent('i18n:change', { detail: { locale: next } }));
    }
    // Re-render client components
    router.refresh();
  };

  const current = map.get(locale) || { code: locale, label: locale.toUpperCase() };

  return (
    <div className="i18n-switcher" onBlur={() => setOpen(false)}>
      <button
        type="button"
        className="i18n-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        title="Change language"
      >
        {compact ? (
          <span className="i18n-current">{current.emoji ?? '🌐'}</span>
        ) : (
          <>
            <span className="i18n-current">{current.emoji ?? '🌐'}</span>
            <span className="i18n-label">{current.label}</span>
          </>
        )}
        <span className="i18n-caret">▾</span>
      </button>

      {open && (
        <ul className="i18n-menu" role="listbox" aria-label="Languages">
          {options.map(opt => (
            <li
              key={opt.code}
              role="option"
              aria-selected={opt.code === locale}
              className={`i18n-item ${opt.code === locale ? 'active' : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { setOpen(false); applyLocale(opt.code); }}
            >
              <span className="i18n-emoji">{opt.emoji ?? '🌐'}</span>
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
