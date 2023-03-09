
import announcementApi from '@/api/AnnouncementApi'
import type { AnnouncementDto, GetAnnoucementApiResponse } from '@/api/dto/announcement.dto'
import type { Post, GetPostsResponse } from './model/post.model'
import { useFile } from '@/composables/file'

const { getCloudinaryImageUrl, getCloudinarySquareImageUrl } = useFile()

class PostService {

  static #toPost(announcementDto:AnnouncementDto):Post {
    const imageList = announcementDto.images[0].length ? [getCloudinaryImageUrl(announcementDto.images[0])] : []
    const sellerPicture = announcementDto.user?.picture ? getCloudinarySquareImageUrl(announcementDto.user?.picture) : ''
    return {
      id: announcementDto.id ?? '0',
      sellerCompanyName: announcementDto.user?.seller?.company_name ?? '',
      sellerAvatarUrl: sellerPicture,
      images: imageList,
      description: announcementDto.text ?? '',
      price: announcementDto.price,
      priceOriginal: announcementDto.price_original,
      currency: announcementDto.currency
    }
  }

  async get({ country, limit = 5, offset = 0 }:{country: string, limit?:number, offset?: number}): Promise<GetPostsResponse> {
    try {
      const response:GetAnnoucementApiResponse = await announcementApi.get({ country, limit, offset })
      return { total: response.total, posts: response.announcements.map(PostService.#toPost) }
    }
    catch {
      return { total: 0, posts: [] }
    }
  }
}

export default new PostService()