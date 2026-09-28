import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const homepageService = {
  getAcfData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage[lang as 'vi' | 'en'],
      option: {
        next: {
          revalidate: 60,
          tags: ['homepage', `homepage-${lang}`],
        },
      },
    })
  },
  getNews: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage.getNews(lang),
      option: {
        next: {
          revalidate: 60,
          tags: ['news', `news-${lang}`],
        },
      },
    })
  },
}

export default homepageService
