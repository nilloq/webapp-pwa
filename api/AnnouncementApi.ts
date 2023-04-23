
import type { AnnouncementDto, GetAnnoucementApiResponse } from './dto/announcement.dto'

interface ApiResponse {
  total: number;
  items: []
}

class AnnouncementApi {
  // Get announcements for a given country
  async get({ country, limit = 10, offset = 0 }:{country: string, limit:number, offset: number}):Promise<GetAnnoucementApiResponse> {
    const params = new URLSearchParams({ country, limit: String(limit), offset: String(offset) })
    // Default sort by weight then by creation date
    params.append('sort', '-weight,-creation_date')
    const query = { country, limit, offset, sort: 'weight,-creation_date' }
    const { data } = await useApiFetch('/announcements', { query })
    const res = data.value as ApiResponse
    return { total: res.total, announcements: res.items }
  }

  // Get an announcement from its Id
  async getById(id: string):Promise<AnnouncementDto> {
    const { data } = await useApiFetch(`/announcements/${id}`, { key: id })
    const post = data.value as AnnouncementDto
    return post
  }
}
export default new AnnouncementApi()
