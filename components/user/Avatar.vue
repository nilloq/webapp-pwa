<script setup lang="ts">
defineProps({
  avatarUrl: { type: String, default: undefined }
})
const avatarImageError = ref(false)
</script>

<template>
  <div class="flex items-center">
    <div v-if="avatarUrl && !avatarImageError" class="user-avatar">
      <img
        class="asset-team-maintainers__avatar__image"
        :src="avatarUrl"
        loading="lazy"
        @error="avatarImageError = true"
      >
    </div>
    <div
      v-else
      class="user-avatar fw-bold bg-black opacity-4"
    />
  </div>
</template>

<style lang="scss" scoped>
 .user-avatar {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      height: 32px;
      min-width: 32px;
      max-width: 32px;

      &__image {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
</style>