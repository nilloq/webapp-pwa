
import type { AnnouncementViewDto, GetAnnoucementApiResponse } from './dto/announcement.dto'

interface ApiResponse {
  total: number;
  items: []
}

class AnnouncementApi {
  // Get announcements for a given country
  async get({ userId, country, limit = 10, offset = 0 }:{userId?: string, country?: string, limit:number, offset: number}):Promise<GetAnnoucementApiResponse> {
    let query:any = { country, limit, offset, sort: '-announcement.weight,-announcement.creation_date' }
    if (userId) query = { userId, ...query }
    const { data } = await useApiFetch('/api/v1/announcements', { query })
    const res = data.value as ApiResponse
    return { total: res.total, announcements: res.items }
  }

  // Get an announcement from its Id
  async getById(id: string):Promise<AnnouncementViewDto> {
    const { data } = await useApiFetch(`/api/v1/announcements/${id}`, { key: id })
    const post = data.value as AnnouncementViewDto
    return post
  }
}
export default new AnnouncementApi()
