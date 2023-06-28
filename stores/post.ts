import { defineStore } from 'pinia'
import type { Post } from '@/services/model/post.model'

export const usePostStore = defineStore('post', () => {

  // --------------------------------------------------------------------------------------------------------------------------
  // Posts for a given country according (displayed in home page)
  // --------------------------------------------------------------------------------------------------------------------------
  const posts = ref<Post[]>([])
  const total = ref(0)
  const hasMore = computed(() => posts.value.length < total.value)

  // watch for coordinates to load or update, get a new location
  watch(() => useGlobalStore().country, () => getPosts())

  // Get posts for the current country
  async function getPosts(more = false) {
    // Do not load posts again if already loaded
    if (!more && posts.value.length) return
    const globalStore = useGlobalStore()
    const { total: returnedTotal, posts: returnedPosts } = await PostService.get({ country: globalStore.country ?? undefined, offset: more ? posts.value.length : 0 })
    total.value = returnedTotal
    more ? posts.value.push(...returnedPosts) : posts.value = returnedPosts
  }

  // --------------------------------------------------------------------------------------------------------------------------
  // Posts of a given seller (displayed in seller page)
  // --------------------------------------------------------------------------------------------------------------------------
  const sellerPosts = ref<Post[]>([])
  const totalSellerPosts = ref(0)
  const hasMoreSellerPosts = computed(() => sellerPosts.value.length < totalSellerPosts.value)

  // Get posts of a seller in the current country
  async function getSellerPosts({ userId, more = false }:{userId: string, more?: boolean}) {
    const globalStore = useGlobalStore()
    const { total: returnedTotal, posts: returnedPosts } = await PostService.get({ userId, country: globalStore.country ?? undefined, offset: more ? sellerPosts.value.length : 0 })
    totalSellerPosts.value = returnedTotal
    more ? sellerPosts.value.push(...returnedPosts) : sellerPosts.value = returnedPosts
  }

  // Clear seller posts
  async function clearSellerPosts() {
    sellerPosts.value = []
    totalSellerPosts.value = 0
  }

  // --------------------------------------------------------------------------------------------------------------------------
  // Current selected post to view detail
  // --------------------------------------------------------------------------------------------------------------------------
  const post = ref<Post | null>()

  async function getPostById(id: string) {
    post.value = [...posts.value, ...sellerPosts.value].find(item => item.id === id)
    if (!post.value)
      post.value = await PostService.getById(id)
    return post.value
  }

  // async function updatePost(postPatch: PostPatch):Promise<Post | null> {
  //   const updatedPost = await PostService.update(postPatch);
  //   // Update post in the current lists if already loaded
  //   if (updatedPost) {
  //     const index = posts.value.findIndex(p => p.id === updatedPost.id);
  //     if (index > -1)
  //       posts.value[index] = { ...posts.value[index], ...updatedPost };
  //   }
  //   return updatedPost;
  // }

  // async function deletePostById(id: string) {
  //   const deleted = await PostService.deleteById(id);
  //   // Remove post from current list if already loaded
  //   if (deleted) {
  //     const index = posts.value.findIndex(p => p.id === id);
  //     if (index > -1) {
  //       posts.value.splice(index, 1);
  //       total.value--;
  //     }
  //   }
  //   return deleted;
  // }

  return { posts, total, hasMore, getPosts,
    sellerPosts, totalSellerPosts, hasMoreSellerPosts, getSellerPosts, clearSellerPosts,
    post, getPostById
    // updatePost, deletePostById
  }
})
