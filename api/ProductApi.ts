
import type { GetProductApiResponse } from './dto/product.dto'

class ProductApi {
  // Get announcements for a given country
  async get():Promise<GetProductApiResponse> {

    try {
      const { data } = await useFetch('https://dummyjson.com/products')
      const { products } = data.value as GetProductApiResponse
      return { products }
    }
    catch(err) {
      throw new Error('Failed to fetch products: Unknow error')
    }
  }

}
export default new ProductApi()