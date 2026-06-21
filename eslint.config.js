import pluginCypress from 'eslint-plugin-cypress'

export default [
  pluginCypress.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
]
