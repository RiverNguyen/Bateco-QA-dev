import type { Metadata } from 'next'
import { Barlow_Condensed, Be_Vietnam_Pro } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import '@/app/globals.css'
import { routing } from '@/i18n/routing'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['vietnamese', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body
        className={`${beVietnamPro.variable} ${barlowCondensed.variable} font-sans antialiased`}
      >
        <Script
          id='preloader-boot'
          strategy='beforeInteractive'
        >
          {
            "(function(){try{if(sessionStorage.getItem('bateco-preloader-seen')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.preloader='done'}}catch(e){}})();"
          }
        </Script>
        {children}
      </body>
    </html>
  )
}
