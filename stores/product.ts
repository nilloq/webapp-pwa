import type { Post } from '@/services/model/post.model'
import ProductService from '@/services/ProductService'
// import { useGlobalStore } from './global'


export const useProductStore = defineStore('product', {
  state: () => {
    return {
      products: [] as Post[],
      total: 0
    }
  },

  getters: {
    hasMore: state => state.products.length < state.total
  },

  actions: {
    // Get posts for a given country
    async getProducts() {
      const { total, posts } = await ProductService.get()
      this.total = total
      this.products.push(...posts)
    }
  }
})
