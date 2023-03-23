<script setup lang="ts">
const { t } = useI18n()

useHead({
  titleTemplate: title => title ? `${title} · ${t('HOME__MAIN_PAGE_TITLE')}` : t('HOME__MAIN_PAGE_TITLE')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
