<script setup lang="ts">
const productStore = useProductStore()

productStore.getProducts()
</script>

<template>
  <PostList mode="product" />
</template>