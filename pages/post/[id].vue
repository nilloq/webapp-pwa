<script setup lang="ts">
import type { User } from '@/services/model/user.model'

definePageMeta({ layout: 'full' })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const postStore = usePostStore()

const isLoadingSeller = ref(true)
const seller = ref<User | undefined>()
const imageError = ref(false)

await postStore.getPostById(route.params.id as string)

if (postStore.post) {
  useHead({
    title: postStore.post.productName ?? t('POSTS__NEWS_TITLE'),
    meta: [
      { name: 'description', content: postStore.post.description },
      { property: 'og:description', content: postStore.post.description },
      { property: 'og:image', content: postStore.post.images??[0] },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  })
  // Load the seller details
  seller.value = postStore.post.sellerId ? await UserService.getUserPublicInformation(postStore.post.sellerId) : undefined
  isLoadingSeller.value = false
}
else { router.replace('/post/deleted') }

// For the moment, we consider a post is a prodcut if it has a price
const isProduct = computed(() => !!postStore.post?.productPriceOriginal)

// Return true is the current connected user is the publisher of the post
// const isPublisher = computed(() => post.value?.sellerId === userStore.getUserId)


// function showSeller() {
//   // router.push({ name: "user-show", params: { id: post.value?.sellerId } });
// }

// function modifyPost() {
//   return
// }

// const isDeleteConfirmationVisible = ref(false)

// async function deletePost() {
//   const deleted = await postStore.deletePostById(post.value?.id ?? '')
//   if (deleted) {
//     store.dispatch('snackbar/setSnackbar', { message: t('POST__DELETE_SUCCESS') })
//     router.replace({ name: 'home' })
//   }
//   else {
//     store.dispatch('snackbar/setSnackbar', { message: t('GENERAL__ERRORS_RETRY_LATER') })
//   }
//   isDeleteConfirmationVisible.value = false
// }
</script>

<template>
  <div class="container pb-120px flex flex-col sm:flex-row">
    <!-- pictures -->
    <div v-if="postStore.post?.images?.length && !imageError" class="w-full sm:w-50%">
      <img
        :src="postStore.post?.images[0]"
        loading="lazy"
        class="aspect-square sm:aspect-auto object-cover"
        @error="imageError = true"
      >
    </div>
    <div class="w-100%" :class="{'sm:w-50%': postStore.post?.images?.length && !imageError}">
      <!-- description -->
      <div class="p-4 border-b-1 border-b-solid border-silver max-w-2xl">
        <p class="mb-2">
          {{ postStore.post?.description }}
        </p>
        <!-- Prices -->
        <PostProductPrice v-if="postStore.post" :post="postStore.post" />
      </div>
      <!-- seller information -->
      <div class="p-4">
        <ShopCard
          :title="t('GENERAL__SELLER')"
          :user="seller"
          :post-count="postStore.post?.sellerPostCount"
          :is-loading="isLoadingSeller"
          class="max-w-2xl m-initial"
        />
      </div>
      <!-- footer -->
      <div class="w-100% bg-white border-t-1 border-t-solid border-silver sm:border-none z-24 fixed sm:relative left-0 bottom-0">
        <div class="container p-4 text-center sm:text-left">
          <RouterLink to="/">
            <div role="button" class="btn">
              HOME
            </div>
          </RouterLink>
        </div>
      </div>
      <!-- <div class="w-100% bg-white border-t-1 border-t-solid border-silver sm:border-none z-24 fixed sm:relative left-0 bottom-0">
        <div class="container text-center sm:text-left">
          <div v-if="isPublisher">
            <BaseButton class="icon-left w-100% sm:min-w-16rem sm:w-auto" icon="pencil" @click="modifyPost">
              {{ t('POSTS__MODIFY') }}
            </BaseButton>
            <div class="mt-2">
              <BaseButton
                class="btn-secondary icon-left w-100% sm:min-w-16rem sm:w-auto"
                icon="delete"
                :loading="isDeleteConfirmationVisible === true"
                @click="isDeleteConfirmationVisible = true"
              >
                {{ t('POSTS__DELETE') }}
              </BaseButton>
            </div> -->
      <!-- Delete confirmration popup -->
      <!-- <Modal
              v-if="isDeleteConfirmationVisible"
              :body="t('POSTS__DELETE_CONFIRM')"
              :validate-label="t('GENERAL__BUTTONS_VALIDATE')"
              @cancel="isDeleteConfirmationVisible = false"
              @validate="deletePost"
            />
          </div>
          <div v-else>
            <BaseButton v-if="isArticle" class="icon-left w-100% sm:w-auto" icon="cart" :disabled="!seller" @click="showSeller">
              {{ t('POSTS__ARTICLE_ORDER') }}
            </BaseButton>
            <BaseButton v-else class="icon-left w-100% sm:w-auto" icon="account" :disabled="!seller" @click="showSeller">
              {{ t('POSTS__NEWS_CONTACT_SELLER') }}
            </BaseButton>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>