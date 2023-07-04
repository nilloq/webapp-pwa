<script setup lang="ts">
import type { User } from '@/services/model/user.model'

const { getCloudinarySquareImageUrl } = useCloudinary()

const props = defineProps({
  title: { type: String, default: '' },
  user: { type: Object as PropType<User>, default: undefined },
  postCount: { type: Number, default: undefined },
  isLoading: { type: Boolean, default: false }
})

const userAvatarUrl = computed(() => {
  if (props.user?.picture)
    return getCloudinarySquareImageUrl(props.user.picture)
  else
    return props.user?.profile ? `/img/${props.user.profile}.svg` : ''
})

</script>

<template>
  <div class="container">
    <p class="fw-bold mb-4">
      {{ title }}
    </p>
    <div class="flex items-center">
      <UserAvatar :avatar-url="userAvatarUrl" :size="48" />
      <div class="flex flex-col ml-4">
        <p>{{ user?.seller?.companyName }}</p>
        <p v-if="postCount" class="pt-2 text-sm text-darkgrey">
          {{ $t("POSTS__COUNT_LABEL", {count: postCount}, postCount) }}
        </p>
      </div>
      <div class="i-mdi-information-outline color-orange ml-auto" />
    </div>
  </div>
</template>