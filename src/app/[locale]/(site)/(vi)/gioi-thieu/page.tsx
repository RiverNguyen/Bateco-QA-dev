import { notFound } from 'next/navigation'

import AboutModule from '@/modules/about'
import aboutUsService from '@/services/about-us'
import homepageService from '@/services/homepage'

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  if (locale !== 'vi') notFound()

  const [acfData, aboutUsData] = await Promise.all([
    homepageService.getAcfData(locale),
    aboutUsService.getAcfData(locale),
  ])

  return (
    <AboutModule
      areasOfOperation={acfData?.acf?.areas_of_operation}
      data={aboutUsData}
    />
  )
}

export default AboutPage
