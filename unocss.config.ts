
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
      primary: '#0227cc',
      secondary: '#dfe3f7',
      alert: '#bc3d46',
      success: '#03a678',
      warning: '#f6c244',
      silver: '#cccccc',
      lightgrey: '#eeeeee',
      grey: '#999999'
    }
  }
})