<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch(`https://dummyjson.com/products/${route.params.id}`,
  {
    pick: ['title', 'description', 'images'],
    key: `/post/${route.params.id}`
  })

useHead({
  title: data.value.title,
  meta: [
    { name: 'description', content: data.value.description },
    { property: 'og:description', content: data.value.description },
    { property: 'og:image', content: data.value.images[0] },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})
</script>

<template>
  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>