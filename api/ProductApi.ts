
import type { GetProductApiResponse } from './dto/product.dto'

class ProductApi {
  // Get announcements for a given country
  async get():Promise<GetProductApiResponse> {
    const { data } = await useFetch('https://dummyjson.com/products')
    const { products } = data.value as GetProductApiResponse
    return { products }
  }

}
export default new ProductApi()