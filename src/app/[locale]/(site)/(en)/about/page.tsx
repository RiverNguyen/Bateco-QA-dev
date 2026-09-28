import { notFound } from 'next/navigation'

import AboutModule from '@/modules/about'
import aboutUsService from '@/services/about-us'
import fieldService from '@/services/field'
import homepageService from '@/services/homepage'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const [acfData, aboutUsData, fieldsData] = await Promise.all([
    homepageService.getAcfData(locale),
    aboutUsService.getAcfData(locale),
    fieldService.getData(locale),
  ])

  return (
    <AboutModule
      areasOfOperation={acfData?.acf?.areas_of_operation}
      data={aboutUsData}
      fields={fieldsData?.data ?? []}
    />
  )
}

export default AboutPage
