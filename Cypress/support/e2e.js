import './commands'

// Masquer les erreurs de fetch/XHR qui peuvent survenir pendant les tests
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorer les erreurs de réseau qui n'affectent pas les fonctionnalités testées
  if (err.message.includes('NetworkError') || err.message.includes('fetch')) {
    return false
  }
  // Laisser les autres erreurs être capturées
  return true
})

// Configuration globale avant chaque test
beforeEach(() => {
  // Vider le localStorage avant chaque test pour un état propre
  cy.window().then((win) => {
    win.localStorage.clear()
    win.sessionStorage.clear()
  })
})