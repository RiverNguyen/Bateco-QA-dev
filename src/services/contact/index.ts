import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const contactService = {
  getPageData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.contact[lang as 'vi' | 'en'],
      option: {
        next: {
          revalidate: 3600,
          tags: ['contact', `contact-${lang}`],
        },
      },
    })
  },
}

export default contactService
