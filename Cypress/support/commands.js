Cypress.Commands.add('addTodoUpdated', (todoText) => {
    cy.get('input[placeholder*="Ajouter une nouvelle tâche"]').clear().type(todoText)
    cy.get('button').find('svg.lucide-plus').parent().click()
    cy.contains(todoText, { timeout: 5000 }).should('be.visible')
  })
  
  Cypress.Commands.add('toggleTodoUpdated', (todoText) => {
    cy.contains('span', todoText)
      .parents('div[data-slot="card"]')
      .find('button[role="checkbox"]')
      .click()
  })
  
  Cypress.Commands.add('deleteTodoUpdated', (todoText) => {
    cy.contains('span', todoText)
      .parents('div[data-slot="card"]')
      .find('svg.lucide-trash2')
      .parent()
      .click()
    cy.contains(todoText).should('not.exist')
  })
  
  Cypress.Commands.add('checkProgressUpdated', (completed, total, percentage) => {
    if (total > 0) {
      cy.contains(`${completed}/${total} terminées`).should('be.visible')
      cy.contains(`${percentage}% complété`).should('be.visible')
    }
  })
  
  // Exemple avec commandes personnalisées
  describe('Tests avec commandes personnalisées', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.contains('Ma Todo List').should('be.visible')
    })
  
    it('Exemple d\'utilisation des commandes personnalisées', () => {
      cy.addTodoUpdated('Première tâche')
      cy.addTodoUpdated('Deuxième tâche')
      cy.addTodoUpdated('Troisième tâche')
  
      cy.toggleTodoUpdated('Première tâche')
      cy.checkProgressUpdated(1, 3, 33)
  
      cy.deleteTodoUpdated('Deuxième tâche')
      cy.checkProgressUpdated(1, 2, 50)
    })
  })
  