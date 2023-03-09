
import type { GetAnnoucementApiResponse } from './dto/announcement.dto'

class AnnouncementApi {
  // Get announcements for a given country
  async get({ country, limit = 10, offset = 0 }:{country: string, limit:number, offset: number}):Promise<GetAnnoucementApiResponse> {
    const params = new URLSearchParams({ country, limit: String(limit), offset: String(offset) })
    // Default sort by weight then by creation date
    params.append('sort', 'weight,-creation_date')
    const query = { country, limit, offset, sort: 'weight,-creation_date' }
    try {
      const data = await $fetch('/api/v1/announcements', { query })
      return { total: data.total, announcements: data.items }
    }
    catch(err) {
      throw new Error('Failed to fetch partners: Unknow error')
    }
  }

}
export default new AnnouncementApi()
