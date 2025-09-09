import './commands'

// Masquer les erreurs de fetch/XHR 
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorer les erreurs de réseau 
  if (err.message.includes('NetworkError') || err.message.includes('fetch')) {
    return false
  }
 
  return true
})

// Configuration globale avant chaque test
beforeEach(() => {
  // Vider le localStorage avant chaque test
  cy.window().then((win) => {
    win.localStorage.clear()
    win.sessionStorage.clear()
  })
})