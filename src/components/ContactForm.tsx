'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { addSignup } from '@/lib/firebase/content'

type ContactStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const t = useTranslations()
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<ContactStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      await addSignup(email, locale)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-box">
        <h2 className="h2">{t('sections.contactTitle')}</h2>

        {status === 'success' ? (
          <p role="status" className="contact-success">
            {t('contact.success')}
          </p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('contact.inputPlaceholder')}
              required
              disabled={status === 'submitting'}
            />
            <button
              className="btn btn-pill btn-primary"
              type="submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting'
                ? t('contact.submitting')
                : t('sections.contactButton')}
            </button>
            {status === 'error' && (
              <div role="alert" className="contact-error">
                {t('contact.error')}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
