const ENDPOINTS = {
  siteSettings: {
    getData: (lang: string) => `api/v1/site-settings?locale=${lang}`,
  },
  homepage: {
    vi: 'wp/v2/pages/10?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/331?_fields=acf&acf_format=standard',
    getNews: (lang: string) => `api/v1/get-all/post?lang=${lang}&limit=6`,
  },
  about: {
    vi: 'wp/v2/pages/156?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/335?_fields=acf&acf_format=standard',
  },
  field: {
    getData: (lang: string) => `api/v1/get-all/field?lang=${lang}&limit=6`,
    getDetail: (lang: string, slug: string) => `api/v1/get-detail/field?slug=${slug}&lang=${lang}`,
  },
  news: {
    vi: 'wp/v2/pages/223?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/346?_fields=acf&acf_format=standard',
    getData: (lang: string, limit = 12) => `api/v1/get-all/post?lang=${lang}&limit=${limit}`,
    getDetail: (slug: string, lang: string) => `api/v1/get-detail/post?slug=${slug}&lang=${lang}`,
    post_data: ({
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
    }) =>
      `api/v1/get-all/post?lang=${lang}&paged=${paged}&limit=${limit}&acf=true&orderby=${orderby}&order=${order}${
        tax ? `&tax=${tax}` : ''
      }${categoryPost ? `&categories_post=${categoryPost}` : ''}${
        search ? `&search=${encodeURIComponent(search)}` : ''
      }`,
    taxonomies: (lang: string) => `api/v1/taxonomies/categories_post?lang=${lang}&parent=0`,
  },
  careers: {
    post_data: ({
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
    }) =>
      `api/v1/get-all/careers?lang=${lang}&paged=${paged}&limit=${limit}&acf=true&orderby=${orderby}&order=${order}${
        tax ? `&tax=${tax}` : ''
      }${categoryCareers ? `&careers_tax=${categoryCareers}` : ''}${
        search ? `&search=${encodeURIComponent(search)}` : ''
      }`,
    taxonomies: (lang: string) => `api/v1/taxonomies/careers_tax?lang=${lang}&parent=0`,
    getDetail: (slug: string, lang: string) =>
      `api/v1/get-detail/careers?slug=${slug}&lang=${lang}`,
    form_id: '325',
    unit_tag: 'd7bd0fc',
  },
  contact: {
    vi: 'wp/v2/pages/267?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/353?_fields=acf&acf_format=standard',
    form_id: '330',
    unit_tag: '56358f4',
  },
}

export default ENDPOINTS
