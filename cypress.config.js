import { defineConfig } from 'cypress'
import mochawesomePlugin from 'cypress-mochawesome-reporter/plugin.js'

export default defineConfig({
  allowCypressEnv: false,
  screenshotOnRunFailure: true,
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 10000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Qauto E2E report',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    html: true,
    json: true,
  },
  env: {
    USER_PASSWORD: 'Password123',
  },
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      mochawesomePlugin(on)
      return config
    },
  },
})
