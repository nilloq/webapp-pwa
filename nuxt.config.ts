// https://nuxt.com/docs/api/configuration/nuxt-config
/* eslint-disable camelcase */
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt'
  ],

  imports: {
    dirs: ['stores', 'services']
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.mahali.me/api/v1'
    }
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/main.scss'
  ],

  sourcemap: {
    server: true,
    client: false
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

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },

  pwa: {
    mode: 'development',
    base: '/',
    filename: 'service-worker.js',
    includeAssets: ['favicon.ico', 'robots.txt'],
    manifest: {
      name: 'Mahali',
      short_name: 'Mahali',
      icons: [
        {
          src: './android-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './android-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#FAFAFA',
      theme_color: '#FAFAFA'
    },
    workbox: {
      swDest: '.output/public/service-worker.js',
      offlineGoogleAnalytics: true,
      runtimeCaching: [
        // Caching first previously browsed places.
        // NetworkFirst ==> network but if fails use cache
        // e.g. of URL to be matched :
        // https://mahali-mvp-dev.apps.fr01.paas.diod.orange.com/api/v1/places/ACX
        // https://api.mahali.me/api/v1/places/ABK
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/places\//,
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after n seconds.
            networkTimeoutSeconds: 5
          }
        },
        // Caching NetworkFirst places list :
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/places\?/,
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after n seconds.
            networkTimeoutSeconds: 5
          }
        },
        // Caching NetworkFirst bookmarks list :
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/bookmarks\?/,
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after n seconds.
            networkTimeoutSeconds: 5
          }
        },
        // Caching NetworkFirst meetings list :
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/meetings\?/,
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after n seconds.
            networkTimeoutSeconds: 5
          }
        },
        // Caching NetworkFirst orders list :
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/orders\?/,
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after n seconds.
            networkTimeoutSeconds: 5
          }
        },
        // Caching NetworkFirst search result list :
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/places\/search\?/,
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after n seconds.
            networkTimeoutSeconds: 5
          }
        },
        // Caching NetworkFirst users information :
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/users\//,
          handler: 'NetworkFirst',
          options: {
            // Fall back to the cache after n seconds.
            networkTimeoutSeconds: 5
          }
        },
        // Caching partners list.
        // StaleWhileRevalidate ==> returns partners list from cache if available, then update cache with network request
        {
          urlPattern:
            /^https:\/\/(?:api\.mahali\.me)?(?:mahali-mvp-dev\.apps\.fr01\.paas\.diod\.orange\.com)?\/api\/v1\/partners\?/,
          handler: 'StaleWhileRevalidate'
        },
        // Caching places pictures from Cloudinary
        {
          urlPattern: /^https:\/\/res.cloudinary.com\/mahali\/image\/private/,
          handler: 'CacheFirst'
        },
        // caching again? pages and icons cause that seems to block`
        // https://mahali-dev.apps.fr01.paas.diod.orange.com/AEZ
        // Request URL: https://mahali-dev.apps.fr01.paas.diod.orange.com/img/icons/favicon-32x32.png
        // Request URL: https://mahali.me/img/icons/favicon-32x32.png
        {
          urlPattern:
            /^https:\/\/mahali(?:-dev\.apps\.fr01\.paas\.diod\.orange\.com)?(?:\.me)?\/img\/icons/,
          handler: 'CacheFirst'
        },

        // Caching StaleWhileRevalidate google fonts list : e.g. :
        // StaleWhileRevalidate ==> response and download in meantime
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets'
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 3,
              maxAgeSeconds: 60 * 60 * 24 * 365
            }
          }
        }
      ]
    }
  },

  devtools: false
})
