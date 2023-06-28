// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt'
    // '@vite-pwa/nuxt'
  ],

  imports: {
    dirs: ['stores', 'services']
  },

  routeRules: {
    '/demo/spa': { ssr: false },
    '/demo/static': { static: true },
    '/demo/swr': { swr: true }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.mahali.me'
    }
  },

  nitro: {
    routeRules: {
      // '/api/v1/**': { proxy: 'https://preview.mahali.me/api/v1/**' }
      '/api/v1': { proxy: 'https://mahali-mvp-dev.apps.fr01.paas.tech.orange/api/v1' }
    }
  },

  sourcemap: {
    server: true,
    client: false
  },


  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/main.scss'
  ],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },

  i18n: {
    defaultLocale: 'fr',
    langDir: 'lang',
    locales: [
      { code: 'en', iso: 'en-GB', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json' }
    ],
    lazy: true,
    precompile: {
      strictMessage: false
    },
    vueI18n: './i18n.config.ts'
  }
})
