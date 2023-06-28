import configData from '@/data/config.json'

/* eslint-disable no-unused-vars */
export enum Languages {
  FR = 'fr',
  EN = 'en',
  ZH = 'zh'
}

export interface Currency {
  code: string;
  symbol: string;
}

export interface CountryConfig {
  currency: string;
  minPrice: number;
  maxPrice: number;
  stepPrice: number;
  phonePrefix: string;
  phoneNumberSize: string,
  phoneNumberStripZero: boolean,
  omUssdOrders: string;
  omUssdPayment: string;
}

export interface Countries {
  code: string;
  config : CountryConfig;
}

export interface Config {
  countries: Countries[];
  languages: Languages;
}

export function useConfig() {

  const countryCodes = computed(() => configData.countries.map(c => c.code))
  const supportedCountryPhoneNumbers = computed(() => configData.countries.map(c => ({
    country: c.code,
    prefix: c.config.phonePrefix,
    size: c.config.phoneNumberSize,
    stripZero: c.config.phoneNumberStripZero
  })))
  const supportedLanguages = ref(configData.languages)

  function getCountryConfig(countryCode: string | null): CountryConfig {
    const defaultCountryConfig:CountryConfig = {
      currency: 'XOF',
      minPrice: 0,
      maxPrice: 1000000,
      stepPrice: 1,
      phonePrefix: '225',
      phoneNumberSize: '10',
      phoneNumberStripZero: false,
      omUssdOrders: '#144#',
      omUssdPayment: '#144#'
    }
    const countryConfig = configData.countries.find(c => c.code === countryCode)?.config ?? configData.countries[0].config
    return { ...defaultCountryConfig, ...countryConfig }
  }

  return { countryCodes, supportedLanguages, supportedCountryPhoneNumbers, getCountryConfig }
}
