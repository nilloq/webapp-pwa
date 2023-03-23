
import productApi from '@/api/ProductApi'
import type { ProductDto, GetProductApiResponse } from '@/api/dto/product.dto'
import type { Post, GetPostsResponse } from './model/post.model'

class ProductService {

  static #toPost(productDto:ProductDto):Post {
    return {
      id: productDto.id.toString(),
      sellerCompanyName: productDto.title,
      sellerAvatarUrl: productDto.thumbnail,
      images: productDto.images,
      description: productDto.description,
      price: Math.round(productDto.price * (1 - productDto.discountPercentage / 100)),
      priceOriginal: productDto.price,
      currency: 'EUR'
    }
  }

  async get(): Promise<GetPostsResponse> {
    try {
      const response:GetProductApiResponse = await productApi.get()
      return { total: 100, posts: response.products.map(ProductService.#toPost) }
    }
    catch {
      return { total: 0, posts: [] }
    }
  }
}

export default new ProductService()