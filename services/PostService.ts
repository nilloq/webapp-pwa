/* eslint-disable camelcase */
import announcementApi from '@/api/AnnouncementApi'
import type { AnnouncementDto, AnnouncementViewDto, GetAnnoucementApiResponse } from '@/api/dto/announcement.dto'
import type { Post, GetPostsResponse } from './model/post.model'
import { useFile } from '@/composables/file'

const { getCloudinaryImageUrl, getCloudinarySquareImageUrl, getCloudinaryShortLink } = useFile()

class PostService {

  static #announcementDtoToPost(announcementViewDto:AnnouncementDto):Post {
    const image = announcementViewDto.images?.length
      ? getCloudinaryImageUrl(announcementViewDto.images[0], 'mahali_post') : undefined
    return {
      id: announcementViewDto.id,
      sellerId: announcementViewDto.user_id,
      images: image ? [image] : undefined,
      description: announcementViewDto.text ?? '',
      productName: announcementViewDto.title,
      productPriceOriginal: announcementViewDto.price_original,
      productPriceDiscount: announcementViewDto.price_discount,
      currency: announcementViewDto.currency,
      weight: announcementViewDto.weight,
      status: announcementViewDto.status
    }
  }

  static #announcementViewDtoToPost(announcementViewDto:AnnouncementViewDto):Post {
    const sellerPicture = announcementViewDto.user?.picture ? getCloudinarySquareImageUrl(announcementViewDto.user?.picture) : ''
    const post = {
      ...PostService.#announcementDtoToPost(announcementViewDto.announcement),
      sellerCompanyName: announcementViewDto.user?.seller?.company_name ?? '',
      sellerAvatarUrl: sellerPicture,
      sellerPostCount: announcementViewDto.number_announcement
    }
    return post
  }

  async get({ country, limit = 5, offset = 0 }:{country: string, limit?:number, offset?: number}): Promise<GetPostsResponse> {
    try {
      const response:GetAnnoucementApiResponse = await announcementApi.get({ country, limit, offset })
      return { total: response.total, posts: response.announcements.map(PostService.#announcementViewDtoToPost) }
    }
    catch {
      return { total: 0, posts: [] }
    }
  }

  async getById(id: string): Promise<Post | null> {
    try {
      const response:AnnouncementViewDto = await announcementApi.getById(id)
      return PostService.#announcementViewDtoToPost(response)
    }
    catch {
      return null
    }
  }

  // // Create a new post
  // async post(post: Post): Promise<Post | null> {
  //   try {
  //     const response = await announcementApi.post(PostService.#toAnnouncementDto(post))
  //     return PostService.#toPost(response)
  //   }
  //   catch {
  //     return null
  //   }
  // }

  // async deleteById(id: string): Promise<boolean> {
  //   try {
  //     await announcementApi.delete(id)
  //     return true
  //   }
  //   catch {
  //     return false
  //   }
  // }
}

export default new PostService()