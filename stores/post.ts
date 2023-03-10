import type { Post } from '@/services/model/post.model'
import PostService from '@/services/PostService'
// import { useGlobalStore } from './global'


export const usePostStore = defineStore('post', {
  state: () => {
    return {
      posts: [] as Post[],
      total: 0
    }
  },

  getters: {
    hasMore: state => state.posts.length < state.total
  },

  actions: {
    // Get posts for a given country
    async getPosts() {
      // const globalStore = useGlobalStore()
      // const { total, posts } = await PostService.get({ country: globalStore.country ?? '', offset: this.posts.length })
      const { total, posts } = await PostService.get({ country: 'CI', offset: this.posts.length })
      this.total = total
      this.posts.push(...posts)
    }
  }
})
