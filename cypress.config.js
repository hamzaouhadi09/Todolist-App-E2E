// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Configuration de base (remplace cypress.env.json)
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts plus généreux
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,
    
    // Configuration pour la stabilité
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 1
    },
    
    // Configuration des fichiers
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    setupNodeEvents(on, config) {
      // Gestion des tâches pour debugging
      on('task', {
        log(message) {
          console.log(`🔍 Test Log: ${message}`)
          return null
        }
      })
      
      return config
    },
  },
})