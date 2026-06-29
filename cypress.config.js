import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  screenshotOnRunFailure: false,
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
})
