<script setup>
const { t } = useI18n()

const links = ref([
  { id: 0, label: t('HOME__MAIN_BOTTOM_LINK_HOME'), icon: 'i-mdi-home-outline', activeIcon: 'i-mdi-home', page: '/' },
  { id: 1, label: t('HOME__MAIN_BOTTOM_LINK_PLACES'), icon: 'i-mdi-map-marker-outline', activeIcon: 'i-mdi-map-marker', page: '/place' },
  { id: 2, label: 'Vendre', icon: 'i-mdi-plus-circle-outline', activeIcon: 'i-mdi-plus-circle', page: '/sell' },
  { id: 3, label: t('HOME__MAIN_BOTTOM_LINK_ORDERS'), icon: 'i-mdi-package-variant-closed', activeIcon: 'i-mdi-package-variant', page: '/order' },
  { id: 4, label: t('HOME__MAIN_BOTTOM_LINK_MENU'), icon: 'i-mdi-menu', activeIcon: 'i-mdi-menu', page: '/account' }
])
</script>

<template>
  <div class="h-auto w-100% bg-white border-t-solid border-t-1 border-grey-3 z-20 fixed left-0 bottom-0">
    <nav class="container p-0 max-w-2xl">
      <ul class="grid grid-cols-5">
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          v-slot="{ isExactActive }"
          class="no-outline relative block"
          :to="link.page"
          exact
        >
          <li class="flex flex-col items-center self-stretch pt-3 pb-4 border-solid border-3 border-transparent focus:border-black ">
            <div v-if="isExactActive" class="absolute top-0 w-80% border-b-solid border-b-3px border-b border-rd-b-3px border-primary" />
            <div :class="isExactActive ? link.activeIcon : link.icon" class="w-6 h-6" />
            <nav class="text-xs lh-200% truncate-1">
              {{ link.label }}
            </nav>
          </li>
        </NuxtLink>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  --at-apply:  color-primary
}
</style>
