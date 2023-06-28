import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'
import UserService from '@/services/UserService'
import { useConfig } from '@/composables/config'

const config = useConfig()

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      networkOnline: true,
      country: useStorage('country', 'CI') as RemovableRef<string | null>,
      language: useStorage('language', null) as RemovableRef<string | null>,
      timezone: 0
    }
  },

  getters: {
    countryConfig: state => config.getCountryConfig(state.country)
  },


  actions: {
    setNetworkStatusListener() {
      this.networkOnline = navigator.onLine
      window.addEventListener('online', () => (this.networkOnline = true))
      window.addEventListener('offline', () => (this.networkOnline = false))
    },

    async initCountry() {
      // If country is not yet selected, try to find user location based on IP
      if (!this.country) {
        const { status, guessedCountry } = await UserService.getUserCountry()
        // Guessed country is only taken into account if a matching configuration exists
        // Otherwise set country to the first one defined in configuration
        if (status === 'ok' && guessedCountry)
          this.country = config.countryCodes.value.includes(guessedCountry) ? guessedCountry : config.countryCodes.value[0]
        else this.country = config.countryCodes.value[0]
      }
    },

    async initLanguage() {
      // If language is not yet selected, try to define one using navigator.language API
      if (!this.language) {
        // If navigator langauge not found or not supported by Mahali take the first one defined in configuration
        const navigatorLocale = navigator.language.split('-')
        const navigatorLanguage = navigatorLocale[0].toLocaleLowerCase()
        this.language = config.supportedLanguages.value.includes(navigatorLanguage) ? navigatorLanguage : config.supportedLanguages.value[0]
      }
    },

    initTimezone() {
      const timeOffsetInHours = -(new Date().getTimezoneOffset() / 60)
      this.timezone = timeOffsetInHours
    }
  }
})
