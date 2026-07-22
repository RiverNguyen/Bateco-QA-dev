import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import ContactModule from '@/modules/contact'
import contactService from '@/services/contact'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'vi') notFound()

  const pageData = await contactService.getPageData(locale)

  return <ContactModule data={pageData?.acf} />
}
