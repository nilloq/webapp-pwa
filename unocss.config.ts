
import {
  defineConfig,
  presetIcons,
  presetUno
} from 'unocss'

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
    'no-outline': 'decoration-none outline-none link-color-inherit hover-color-inherit visited-color-inherit active-color-inherit'
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
    })
  ],
  theme: {
    colors: {
      primary: '#f77f00',
      seconday: '#0227cc',
      error: '#bc3d46',
      success: '#03a678',
      warning: '#f6c244',
      silver: '#cccccc',
      lightgrey: '#eeeeee'
    }
  }
})