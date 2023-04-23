<script setup lang="ts">
import type { Post } from '@/services/model/post.model'

const { t } = useI18n()

const props = defineProps({
  post: { type: Object as PropType<Post>, required: true }
})

const productPrice = computed(() => props.post.productPriceDiscount && props.post.productPriceOriginal
  ? props.post.productPriceOriginal - props.post.productPriceDiscount
  : props.post.productPriceOriginal)
const currencySymbol = computed(() => t(`CURRENCY_${props.post.currency}`))
</script>

<template>
  <div v-if="productPrice" class="flex items-baseline">
    <p class="text-xl fw-bold">
      {{ `${productPrice.toLocaleString()} ${currencySymbol}` }}
    </p>
    <p v-if="post.productPriceDiscount && post.productPriceOriginal" class="ml-2 text-silver decoration-line-through">
      {{ `${post.productPriceOriginal.toLocaleString()} ${currencySymbol}` }}
    </p>
  </div>
</template>