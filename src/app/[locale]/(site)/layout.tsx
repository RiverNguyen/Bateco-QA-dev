import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'

import Preloader from '@/components/providers/preloader'
import SmoothScroll from '@/components/providers/smooth-scroll'
import CTA from '@/layouts/cta'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import fieldService from '@/services/field'
import siteSettingsService from '@/services/site-settings'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const [siteSettings, fieldsData] = await Promise.all([
    siteSettingsService.getData(locale),
    fieldService.getData(locale),
  ])
  const fields = fieldsData?.data ?? []

  return (
    <NuqsAdapter>
      <NextIntlClientProvider>
        <NextTopLoader
          color='#6b9078'
          height={2}
          crawl
          crawlSpeed={320}
          initialPosition={0.1}
          showSpinner={false}
          easing='cubic-bezier(0.16, 1, 0.3, 1)'
          speed={520}
          shadow={false}
          zIndex={51}
        />
        <SmoothScroll>
          <Preloader />
          <Header
            data={siteSettings?.data?.header}
            fields={fields}
          />
          <main className='pt-[var(--header-height)]'>{children}</main>
          <Footer
            data={siteSettings?.data?.footer}
            fields={fields}
          />
          <CTA />
          <Toaster
            theme='light'
            richColors
            closeButton
          />
        </SmoothScroll>
      </NextIntlClientProvider>
    </NuqsAdapter>
  )
}
