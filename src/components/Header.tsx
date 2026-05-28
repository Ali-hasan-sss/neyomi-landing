'use client'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import LangSwitcher from './LangSwitcher'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70' : ''}`}>
      <div className="container">
        <div className="nav">
          <Link href="/" className="brand">
            <Image 
              src="/Neyome_logo.png" 
              alt="Neyome" 
              width={80} 
              height={80}
              className="h-20 w-auto"
              priority
            />
          </Link>

          <div className="links">
            <Link
              href="/about"
              className={`link ${pathname === '/about' ? 'font-extrabold' : ''}`}
            >
              {t('about')}
            </Link>
            <Link
              href="/#features"
              className={`link ${pathname === '/' ? 'font-extrabold' : ''}`}
            >
              {t('features')}
            </Link>

            <span className="sep" />

            <Link href="/#pricing" className="link">{t('pricing')}</Link>
            <Link href="/#faqs" className="link">{t('faqs')}</Link>

            <LangSwitcher />
            <ThemeToggle />

            <Link href="/#contact" className="btn btn-pill btn-glass">
              {t('login')}
            </Link>
            <Link href="/#contact" className="btn btn-pill btn-primary">
              {t('getStarted')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
