<script setup lang="ts">

const props = defineProps({
  avatarUrl: { type: String, default: undefined },
  size: { type: Number, default: 32 }
})

const avatarImageError = ref(false)

const avatarStyle = computed(() => ({
  'height': `${props.size}px`,
  'width': `${props.size}px`,
  'min-width': `${props.size}px`
}))

</script>

<template>
  <div class="flex items-center">
    <div
      v-if="avatarUrl && !avatarImageError"
      class="overflow-hidden flex items-center justify-center border-rd-50% bg-secondary"
      :style="avatarStyle"
    >
      <img
        :src="avatarUrl"
        loading="lazy"
        class="object-cover w-100% h-100%"
        @error="avatarImageError = true"
      >
    </div>
    <div
      v-else
      class="overflow-hidden flex items-center justify-center border-rd-50% bg-secondary"
      :style="avatarStyle"
    />
  </div>
</template>