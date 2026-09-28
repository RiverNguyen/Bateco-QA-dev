import HomepageModule from '@/modules/home'
import fieldService from '@/services/field'
import homepageService from '@/services/homepage'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [acfData, newsData, fieldsData] = await Promise.all([
    homepageService.getAcfData(locale),
    homepageService.getNews(locale),
    fieldService.getData(locale),
  ])

  return (
    <HomepageModule
      data={acfData?.acf}
      news={newsData?.data}
      fields={fieldsData?.data ?? []}
    />
  )
}
