module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console":0,
    "no-unused-var":0,
    "no-unused-vars":0,
    'vue/multi-word-component-names': ['error', {
      'ignores': ['default']
    }]
  },
}
