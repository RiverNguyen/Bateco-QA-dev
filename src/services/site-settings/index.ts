import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const siteSettingsService = {
  getData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.siteSettings.getData(lang),
    })
  },
}

export default siteSettingsService
