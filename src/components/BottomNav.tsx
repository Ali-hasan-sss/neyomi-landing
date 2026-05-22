'use client'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import ThemeToggle from './ThemeToggle'

export default function BottomNav() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const links = [
    { href: '/', label: t('features'), anchor: '#features' },
    { href: '/', label: t('pricing'), anchor: '#pricing' },
    { href: '/about', label: t('about') },
    { href: '/', label: t('faqs'), anchor: '#faqs' },
  ]

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {links.map(({ href, label, anchor }) => {
        const isActive = pathname === href
        return anchor ? (
          <a key={label} href={anchor} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
            {label}
          </a>
        ) : (
          <Link key={label} href={href} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
            {label}
          </Link>
        )
      })}
      <ThemeToggle />
    </nav>
  )
}
