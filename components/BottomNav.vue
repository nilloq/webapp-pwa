<script setup>
const { t } = useI18n()

const links = ref([
  { id: 0, label: t('HOME__MAIN_BOTTOM_LINK_HOME'), icon: 'i-mdi-home-outline', page: '/' },
  { id: 1, label: t('HOME__MAIN_BOTTOM_LINK_PLACES'), icon: 'i-mdi-text-search-variant', page: '/place' },
  { id: 2, label: 'Vendre', icon: 'i-mdi-plus-circle-outline', page: '/sell' },
  { id: 3, label: t('HOME__MAIN_BOTTOM_LINK_ORDERS'), icon: 'i-mdi-list-box-outline', page: '/order' },
  { id: 4, label: 'Compte', icon: 'i-mdi-account-outline', page: '/account' }
])
</script>

<template>
  <div class="bottom-nav h-54px w-100% bg-white border-t border-silver z-24 fixed left-0 bottom-0 color-grey">
    <div class="container max-w-768px m-auto">
      <div class="grid grid-cols-5">
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          class="relative -top-1px p-2 border-t-2px border-transparent "
          :to="link.page"
          exact
        >
          <div class="flex flex-col m-auto items-center">
            <div :class="link.icon" class="m-auto w-20px h-20px" />
            <div class="text-xs truncate-1">
              {{ link.label }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.router-link-active {
  --at-apply:  border-t-primary color-primary
}

//Add a blur effect just above the bottom nav
.bottom-nav:after {
  content: "";
  position: absolute;
  bottom: 54px;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 90%
  );
  width: 100%;
  height: 30px;
}
</style>
