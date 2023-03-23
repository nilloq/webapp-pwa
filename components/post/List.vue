<script setup lang="ts">
const postStore = usePostStore()
const productStore = useProductStore()

const isLoading = ref(true)

const props = defineProps({
  mode: { type: String, default: 'post' }
})

// props.mode === 'post' ? postStore.getPosts() : productStore.getProducts()

isLoading.value = false

async function loadMore() {
  // await postStore.getPosts()
  return
}

</script>

<template>
  <div class="container">
    <h2 class="mb-3">
      {{ $t("POSTS__LIST_TITLE") }}
    </h2>
    <transition name="fade" mode="out-in">
      <div v-if="isLoading">
        <PostCardLoading />
      </div>
      <div v-else>
        <div v-if="mode === 'post'">
          <div v-for="post in postStore.posts" :key="post.id">
            <NuxtLink :to="`/post/${post.id}`">
              <PostCard :post="post" class="mb-4" />
            </NuxtLink>
          </div>
        </div>
        <div v-else>
          <div v-for="post in productStore.products" :key="post.id">
            <NuxtLink :to="`/sell/${post.id}`">
              <PostCard :post="post" class="mb-4" />
            </NuxtLink>
          </div>
        </div>
        <ScrollLoader v-if="postStore.hasMore" class="max-w-xl" @load="loadMore" />
      </div>
    </transition>
  </div>
</template>
