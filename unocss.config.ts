
import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts
} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  rules: [
    ['border-rounded-lg', { 'border-radius': '0.75rem' }],
    [/^truncate-(\d+)$/, ([, d]) => ({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': `${d}`
    })]
  ],
  shortcuts: {
    // shortcuts to multiple utilities
    'no-outline': 'decoration-none outline-none link-color-inherit hover-color-inherit visited-color-inherit active-color-inherit',
    'btn': 'text-white bg-primary border-rd-2 px-6 py-2 fw-500'
  },
  presets: [
    presetUno(),
    presetIcons({
      customizations: {
        iconCustomizer(collection, icon, props) {
          props.width = '24px'
          props.height = '24px'
        }
      }
    }),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: 'Roboto'
      }
    })
  ],
  transformers: [
    transformerDirectives()
  ],
  theme: {
    colors: {
      'primary': '#5a69e6',
      'primary-light': '#9faaf1',
      'primary-dark': '#242854',
      'alert': '#c91c00',
      'success': '#217645',
      'warning': '#9e5400',
      'info': '#1068bf',
      'alert-light': '#fcf1ef',
      'success-light': '#ecf4ee',
      'warning-light': '#fdf1dd',
      'info-light': '#e9f3fc',
      'grey-1': '#eeeeee',
      'grey-2': '#dddddd',
      'grey-3': '#cccccc',
      'grey-4': '#999999',
      'grey-5': '#666666',
      'silver': '#cccccc',
      // Do not use anymore
      'secondary': '#dfe3f7',
      'lightgrey': '#eeeeee',
      'darkgrey': '#666666',
      'grey': '#999999',
      'orange': '#f77f00'
    }
  }
})