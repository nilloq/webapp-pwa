/* eslint-disable camelcase */
// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase'
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

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/favicon.svg', type: 'images/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ]
    }
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
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Mahali',
      background_color: '#ffffff',
      theme_color: '#5a69e6',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      icons: [
        {
          src: '/android-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/maskable-android-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 3600
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
