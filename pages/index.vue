<script setup lang="ts">
const postStore = usePostStore()

postStore.getPosts()
</script>

<template>
  <PostList />
</template>