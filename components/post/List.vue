<script setup lang="ts">
import { usePostStore } from '@/stores/post'

const { t } = useI18n()
const postStore = usePostStore()

const isLoading = ref(false)

onMounted(async() => {
  if (!postStore.total) {
    isLoading.value = true
    await postStore.getPosts()
    isLoading.value = false
  }
})

async function loadMore() {
  await postStore.getPosts()
}

</script>

<template>
  <div class="container">
    <h2 class="mb-3">
      {{ t("POSTS__LIST_TITLE") }}
    </h2>
    <transition name="fade" mode="out-in">
      <div v-if="isLoading">
        <PostCardLoading />
      </div>
      <div v-else>
        <div v-for="post in postStore.posts" :key="post.id">
          <PostCard :post="post" class="mb-4" />
        </div>
        <ScrollLoader v-if="postStore.hasMore" class="max-w-xl" @load="loadMore" />
      </div>
    </transition>
  </div>
</template>
