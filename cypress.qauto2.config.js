import { defineConfig } from 'cypress'
import baseConfig from './cypress.config.js'

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto2.forstudy.space',
  },
  env: {
    BASIC_AUTH_USERNAME: 'guest',
    BASIC_AUTH_PASSWORD: 'welcome2qauto',
    USER_EMAIL: 'aqa.garage.qauto2@example.com',
    USER_PASSWORD: 'Password123',
  },
})
