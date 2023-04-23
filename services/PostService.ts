/* eslint-disable camelcase */
import announcementApi from '@/api/AnnouncementApi'
import type { AnnouncementDto, GetAnnoucementApiResponse } from '@/api/dto/announcement.dto'
import type { Post, GetPostsResponse } from './model/post.model'
import { useFile } from '@/composables/file'

const { getCloudinaryImageUrl, getCloudinarySquareImageUrl, getCloudinaryShortLink } = useFile()

class PostService {

  static #toPost(announcementDto:AnnouncementDto):Post {
    const image = announcementDto.images?.length ? getCloudinaryImageUrl(announcementDto.images[0], 'mahali_post') : undefined
    const sellerPicture = announcementDto.user?.picture ? getCloudinarySquareImageUrl(announcementDto.user?.picture) : ''
    return {
      id: announcementDto.id,
      sellerCompanyName: announcementDto.user?.seller?.company_name ?? '',
      sellerAvatarUrl: sellerPicture,
      sellerId: announcementDto.user_id,
      sellerPostCount: announcementDto.number_announcement,
      images: image ? [image] : undefined,
      description: announcementDto.text ?? '',
      productName: announcementDto.title,
      productPriceOriginal: announcementDto.price_original,
      productPriceDiscount: announcementDto.price_discount,
      currency: announcementDto.currency,
      weight: announcementDto.weight,
      status: announcementDto.status
    }
  }

  static #toAnnouncementDto(post:Post):AnnouncementDto {
    const imageLink = post.images?.length ? getCloudinaryShortLink(post.images[0], 'mahali_post') : undefined
    return {
      country: post.country ?? '',
      end_date: {
        seconds: Math.round((post.endDate?.valueOf() ?? 0) / 1000),
        nanos: 0
      },
      currency: post.currency,
      id: post.id,
      images: imageLink ? [imageLink] : undefined,
      text: post.description,
      title: post.productName,
      price_original: post.productPriceOriginal,
      price_discount: post.productPriceDiscount,
      weight: post.weight,
      status: post.status
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

  async getById(id: string): Promise<Post | null> {
    try {
      const response:AnnouncementDto = await announcementApi.getById(id)
      return PostService.#toPost(response)
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