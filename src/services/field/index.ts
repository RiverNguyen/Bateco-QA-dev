import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const fieldService = {
  getData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.field.getData(lang),
      option: {
        next: {
          revalidate: 60,
          tags: ['field', `field-${lang}`],
        },
      },
    })
  },
  getDetail: async (lang: string, slug: string) => {
    return await fetchData({
      api: ENDPOINTS.field.getDetail(lang, slug),
      option: {
        next: {
          revalidate: 60,
          tags: ['field', `field-${slug}`],
        },
      },
    })
  },
}

export default fieldService
