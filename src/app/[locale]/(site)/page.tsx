import HomepageModule from '@/modules/home'
import homepageService from '@/services/homepage'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [acfData, newsData] = await Promise.all([
    homepageService.getAcfData(locale),
    homepageService.getNews(locale),
  ])

  return (
    <HomepageModule
      data={acfData?.acf}
      news={newsData?.data}
    />
  )
}
