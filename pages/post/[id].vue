<script setup lang="ts">

const route = useRoute()

const { getCloudinaryImageUrl } = useFile()

const { data } = await useFetch(`https://preview.mahali.me/api/v1/announcements/${route.params.id}`,
  {
    pick: ['text', 'images', 'price'],
    key: `/post/${route.params.id}`
  })

useHead({
  title: data.value.title,
  meta: [
    { name: 'description', content: data.value.text },
    { property: 'og:description', content: data.value.text },
    { property: 'og:image', content: data.value.images[0].length ? getCloudinaryImageUrl(data.value.images[0]) : '' },
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