import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const siteSettingsService = {
  getData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.siteSettings.getData(lang),
      option: {
        next: {
          revalidate: 60,
          tags: ['site-settings', `site-settings-${lang}`],
        },
      },
    })
  },
}

export default siteSettingsService
