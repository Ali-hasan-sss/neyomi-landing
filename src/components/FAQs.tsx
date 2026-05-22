// FAQs.tsx
export type FaqItem = { q: string; a: string };

const defaultItems: FaqItem[] = [
  { q: 'What is Neyome?', a: 'A family task & rewards app with points and approvals.' },
  { q: 'Is it free?', a: 'Yes, with optional premium tiers for power users.' },
  { q: 'How do rewards work?', a: 'Kids redeem points for rewards; parents approve every claim.' },
  { q: 'Multi-language?', a: 'Yes — change language from the menu anytime.' },
];

export default function FAQs({ items = defaultItems }: { items?: FaqItem[] }) {
  return (
    <div className="faqs">
      <h2 className="h2 section-title-lg">Frequently Asked Questions</h2>

      <div className="faq-list">
        {items.map((it, i) => (
          <details key={i} className="faq-item card gradient-border">
            <summary className="faq-q h3">{it.q}</summary>
            <div className="faq-a">
              <p className="faq-a-text">{it.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
