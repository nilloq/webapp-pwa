<script setup lang="ts">
import type { Post } from '@/services/model/post.model'
import { useShare } from '@vueuse/core'
import { isClient } from '@vueuse/shared'

const props = defineProps({
  post: { type: Object as PropType<Post>, required: true }
})

const userAvatarUrl = computed(() => props.post.sellerAvatarUrl ? props.post.sellerAvatarUrl : '/img/seller.svg' )
const imageError = ref(false)

const options = ref({
  title: props.post.sellerCompanyName,
  text: props.post.description,
  url: isClient ? `${location.href}/post/${props.post.id}` : ''
})

const { share, isSupported } = useShare(options)

function startShare() {
  return share()
}
</script>

<template>
  <NuxtLink
    :to="`/post/${post.id}`"
    class="block no-outline border border-solid border-silver sm:hover:border-black border-rounded-lg max-w-xl"
  >
    <!-- Header -->
    <div class="flex items-center p-2 pr-4">
      <UserAvatar :avatar-url="userAvatarUrl" />
      <p class="fw-bold ml-2 truncate-1">
        {{ post.sellerCompanyName }}
      </p>
      <div class="i-mdi-share-variant ml-auto" @click.prevent="startShare" />
    </div>
    <!-- Picture -->
    <div v-if="post.images?.length && !imageError" class="w-full h-0 pb-56.25% overflow-hidden">
      <img
        :src="post.images[0]"
        loading="lazy"
        class="aspect-video object-cover"
        @error="imageError = true"
      >
    </div>
    <!-- Description -->
    <div class="p-4">
      <p class="truncate-3 mb-1">
        {{ post.description }}
      </p>

      <!-- Prices -->
      <PostProductPrice :post="post" />
    </div>
  </NuxtLink>
</template>