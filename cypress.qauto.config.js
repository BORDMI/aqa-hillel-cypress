import { defineConfig } from 'cypress'
import baseConfig from './cypress.config.js'

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto.forstudy.space',
  },
  env: {
    ...baseConfig.env,
    USER_EMAIL: 'aqa.garage.qauto@example.com',
  },
})
