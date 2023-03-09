module.exports = {
  root: true,

  env: {
    es6: true,
    browser: true,
    node: true
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:markdown/recommended'
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  plugins: ['@typescript-eslint'],

  ignorePatterns: [
    'dist',
    'coverage',
    'public',
    'packages-lock.json',
    '__snapshots__',
    'LICENSE'
  ],

  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['*.json', '*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'quotes': ['error', 'double'],
        'quote-props': ['error', 'always'],
        'comma-dangle': ['error', 'never']
      }
    },
    {
      // Code blocks in markdown file
      files: ['**/*.md/*.*'],
      rules: {
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-unresolved': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off'
      }
    }
  ],

  rules: {

    // override/add rules settings here, such as:
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    // 'vue/no-unused-vars': 'error'
    // "vue/no-v-html": "off",
    // "vue/require-prop-types": "off",
    // "vue/require-default-prop": "off",

    'no-undef': 'off',

    // Common
    'semi': ['error', 'never'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent-as-needed'],
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'block-spacing': ['error', 'always'],
    'camelcase': ['error', { properties: 'always' }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],

    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'eqeqeq': ['error', 'smart'],
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',
    'vars-on-top': 'error',
    'operator-linebreak': ['error', 'before'],

    'no-constant-condition': 'warn',
    'no-cond-assign': ['error', 'always'],
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],

    // ES6
    'no-var': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true
      }
    ],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

    'spaced-comment': ['error', 'always', {
      line: {
        markers: ['/'],
        exceptions: ['-', '+']
      },
      block: {
        markers: ['!'],
        exceptions: ['*'],
        balanced: true
      }
    }],

    // Typescript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off'
  }
}
