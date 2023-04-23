<script setup lang="ts">
definePageMeta({ layout: 'full' })
</script>

<template>
  <div class="container flex flex-col justify-center items-center">
    <div class="p-4">
      <img src="@/assets/img/deleted-post.png">
    </div>
    <p class="fw-bold text-5 mb-2">
      {{ $t("POSTS__DELETED_ERROR_TITLE") }}
    </p>
    <p class="text-center p-4">
      {{ $t("POSTS__DELETED_ERROR_TEXT") }}
    </p>
    <div class="p-4 color-orange">
      <NuxtLink
        to="/" replace
        class="btn flex items-center"
      >
        <span class="i-mdi-home block" />
        <span class="pl-2">{{ $t('POSTS__PUBLISH_ERROR_BACK') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>