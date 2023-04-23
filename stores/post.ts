import { defineStore } from 'pinia'
import type { Post } from '@/services/model/post.model'
import PostService from '@/services/PostService'
// import { useGlobalStore } from './global'


export const usePostStore = defineStore('post', () => {

  const posts = ref<Post[]>([])
  const total = ref(0)

  const hasMore = computed(() => posts.value.length < total.value)

  // watch for coordinates to load or update, get a new location
  // watch(() => useGlobalStore().country, () => getPosts())

  async function getPosts(more = false) {
    // const globalStore = useGlobalStore()
    // const { total: returnedTotal, posts: returnedPosts } = await PostService.get({ country: globalStore.country ?? '', offset: more ? posts.value.length : 0 })
    const { total: returnedTotal, posts: returnedPosts } = await PostService.get({ country: 'CI', offset: more ? posts.value.length : 0 })
    total.value = returnedTotal
    more ? posts.value.push(...returnedPosts) : posts.value = returnedPosts
  }


  async function getPostById(id: string) {
    const post = posts.value.find(item => item.id === id)
    if (post)
      return post
    else
      return await PostService.getById(id)
  }

  // async function deletePostById(id: string) {
  //   const deleted = await PostService.deleteById(id);
  //   // Revbmoe post from current list if already loaded
  //   if (deleted) {
  //     const index = posts.value.findIndex(p => p.id === id);
  //     if (index > -1) {
  //       posts.value.splice(index, 1);
  //       total.value--;
  //     }
  //   }
  //   return deleted;
  // }

  // return { posts, total, hasMore, getPosts, getPostById, deletePostById }
  return { posts, total, hasMore, getPosts, getPostById }
}
)
