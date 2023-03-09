// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  // runtimeConfig: {
  //   public: {
  //     baseURL: process.env.BASE_URL || 'https://localhost:3000/api/v1'
  //   }
  // },
  vite: {
    server: {
      proxy: {
        '/api/v1': {
          target: 'https://preview.mahali.me/',
          changeOrigin: true,
          secure: false
        }
      }
    }
  },
  css: [
    '@unocss/reset/tailwind.css'
  ],
  sourcemap: {
    server: true,
    client: false
  },
  i18n: {
    langDir: 'lang',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'fr', file: 'fr.json' }
    ],
    lazy: true,
    defaultLocale: 'fr',

    vueI18n: {
      legacy: false,
      fallbackLocale: 'en'
    }
  }
})
