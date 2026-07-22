import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const aboutUsService = {
  getAcfData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.about[lang as 'vi' | 'en'],
      option: {
        next: {
          revalidate: 3600,
          tags: ['about-us', `about-us-${lang}`],
        },
      },
    })
  },
}

export default aboutUsService
