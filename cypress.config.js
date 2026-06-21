import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  screenshotsOnRunFailure: false,
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
  },
})
