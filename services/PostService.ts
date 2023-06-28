/* eslint-disable camelcase */
import announcementApi from '@/api/AnnouncementApi'
import type { AnnouncementDto, AnnouncementPatchDto, AnnouncementViewDto, GetAnnoucementApiResponse } from '@/api/dto/announcement.dto'
import type { Post, GetPostsResponse, PostPatch } from './model/post.model'

const { getCloudinaryImageUrl, getCloudinarySquareImageUrl, getCloudinaryShortLink } = useCloudinary()

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
      productPriceOriginal: announcementViewDto.price ? announcementViewDto.price + (announcementViewDto.price_discount ?? 0) : undefined,
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
      sellerPostCount: announcementViewDto.number_announcement,
      sellerAlias: announcementViewDto.user_alias?.length ? announcementViewDto.user_alias[0].alias : undefined
    }
    return post
  }

  static #postToAnnouncementDto(post:Post):AnnouncementDto {
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
      price_discount: post.productPriceDiscount,
      price: post.productPriceOriginal ? post.productPriceOriginal - (post.productPriceDiscount ?? 0) : undefined,
      weight: post.weight,
      status: post.status
    }
  }
  static #postPatchToAnnouncementPatchDto(postPatch:PostPatch):AnnouncementPatchDto {
    const imageLink = postPatch.images?.length ? getCloudinaryShortLink(postPatch.images[0], 'mahali_post') : undefined
    return {
      id: postPatch.id,
      images: imageLink ? [imageLink] : undefined,
      text: postPatch.description,
      title: postPatch.productName,
      price_discount: postPatch.productPriceDiscount,
      price: postPatch.productPriceOriginal ? postPatch.productPriceOriginal - (postPatch.productPriceDiscount ?? 0) : undefined
    }
  }

  async get({ userId, country, limit = 5, offset = 0 }:{userId?: string, country?: string, limit?:number, offset?: number}): Promise<GetPostsResponse> {
    try {
      const response:GetAnnoucementApiResponse = await announcementApi.get({ userId, country, limit, offset })
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
  //     const response = await announcementApi.post(PostService.#postToAnnouncementDto(post));
  //     return PostService.#announcementDtoToPost(response);
  //   }
  //   catch {
  //     return null;
  //   }
  // }

  // // Update an existing post
  // async update(postPatch: PostPatch): Promise<Post | null> {
  //   try {
  //     const response = await announcementApi.patch(PostService.#postPatchToAnnouncementPatchDto(postPatch));
  //     return PostService.#announcementDtoToPost(response);
  //   }
  //   catch {
  //     return null;
  //   }
  // }

  // async deleteById(id: string): Promise<boolean> {
  //   try {
  //     await announcementApi.delete(id);
  //     return true;
  //   }
  //   catch {
  //     return false;
  //   }
  // }
}

export default new PostService()