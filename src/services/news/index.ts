import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const newsService = {
  getAcfData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.news[lang as 'vi' | 'en'],
      option: {
        next: {
          revalidate: 3600,
          tags: ['news', `news-${lang}`],
        },
      },
    })
  },
  getData: async (lang: string, limit = 6) => {
    return await fetchData({
      api: ENDPOINTS.news.getData(lang, limit),
      option: {
        next: {
          revalidate: 3600,
          tags: ['news', `news-${lang}`],
        },
      },
    })
  },
  getPostData: async ({
    limit,
    paged,
    lang,
    orderby,
    order,
    tax,
    categoryPost,
    search,
  }: {
    limit: number
    paged: number
    lang: string
    orderby: 'date' | 'title'
    order: 'ASC' | 'DESC'
    tax?: 'categories_post'
    categoryPost?: string
    search?: string
  }) => {
    return await fetchData({
      api: ENDPOINTS.news.post_data({
        limit,
        paged,
        lang,
        orderby,
        order,
        tax,
        categoryPost,
        search,
      }),
      option: {
        next: {
          revalidate: 3600,
          tags: ['news', `news-${lang}`],
        },
      },
    })
  },
  getTaxonomies: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.news.taxonomies(lang),
      option: {
        next: {
          revalidate: 3600,
          tags: ['news', `news-${lang}`],
        },
      },
    })
  },
  getDetail: async (slug: string, lang: string) => {
    return await fetchData({
      api: ENDPOINTS.news.getDetail(slug, lang),
      option: {
        next: {
          revalidate: 3600,
          tags: ['news', `news-${slug}`, `news-${lang}`],
        },
      },
    })
  },
}

export default newsService
