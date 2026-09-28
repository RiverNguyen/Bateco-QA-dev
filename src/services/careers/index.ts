import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const careersService = {
  getCareersData: async ({
    limit,
    paged,
    lang,
    orderby,
    order,
    tax,
    categoryCareers,
    search,
  }: {
    limit: number
    paged: number
    lang: string
    orderby: 'date' | 'title'
    order: 'ASC' | 'DESC'
    tax?: 'careers_tax'
    categoryCareers?: string
    search?: string
  }) => {
    return await fetchData({
      api: ENDPOINTS.careers.post_data({
        limit,
        paged,
        lang,
        orderby,
        order,
        tax,
        categoryCareers,
        search,
      }),
      option: {
        next: {
          revalidate: 60,
          tags: ['careers', `careers-${lang}`],
        },
      },
    })
  },
  getTaxonomies: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.careers.taxonomies(lang),
      option: {
        next: {
          revalidate: 60,
          tags: ['careers', `careers-${lang}`],
        },
      },
    })
  },
  getDetail: async (slug: string, lang: string) => {
    return await fetchData({
      api: ENDPOINTS.careers.getDetail(slug, lang),
      option: {
        next: {
          revalidate: 60,
          tags: ['careers', `careers-${slug}`, `careers-${lang}`],
        },
      },
    })
  },
}

export default careersService
