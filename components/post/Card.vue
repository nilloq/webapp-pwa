<script setup lang="ts">
import type { Post } from '@/services/model/post.model'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  post: { type: Object as PropType<Post>, required: true }
})

const currencySymbol = computed(() => t(`CURRENCY_${props.post.currency}`))
</script>

<template>
  <div
    :to="{ name: 'post', params: { id: post.id } }"
    class="block no-outline border border-solid border-silver border-rounded-lg max-w-xl"
  >
    <!-- Header -->
    <div class="flex items-center p-2 pr-4">
      <UserAvatar :avatar-url="post.sellerAvatarUrl" />
      <p class="fw-bold ml-2">
        {{ post.sellerCompanyName }}
      </p>
      <div class="i-mdi-share-variant ml-auto" />
    </div>
    <!-- Picture -->
    <div v-if="post.images?.length" class="w-full h-0 pb-56.25% overflow-hidden">
      <img
        :src="post.images[0]"
        loading="lazy"
        class="aspect-video object-cover"
      >
    </div>
    <!-- Description -->
    <div class="p-4">
      <p class="truncate-3 mb-1">
        {{ post.description }}
      </p>
      <!-- Prices -->
      <div v-if="post.price" class="flex items-baseline">
        <p class="text-xl fw-bold">
          {{ `${post.price.toLocaleString()} ${currencySymbol}` }}
        </p>
        <p v-if="post.priceOriginal" class="ml-2 text-silver decoration-line-through">
          {{ `${post.priceOriginal.toLocaleString()} ${currencySymbol}` }}
        </p>
      </div>
    </div>
  </div>
</template>