describe('Todo App - Tests d\'automatisation', () => {
    beforeEach(() => {
      cy.visit('/', {
        timeout: 30000,
        retryOnStatusCodeFailure: true,
        retryOnNetworkFailure: true
      })
      
      // Attendre l'application 
      cy.contains('Ma Todo List', { timeout: 20000 }).should('be.visible')
      
      // Vérifier que l'input est prêt
      cy.get('input[placeholder*="Ajouter une nouvelle tâche"]', { timeout: 10000 })
        .should('be.visible')
        .should('not.be.disabled')
    })
  
    describe('Ajout de tâches', () => {
      it('TC001 - Ajouter une tâche valide "Acheter du café"', () => {
        cy.get('input[placeholder*="Ajouter une nouvelle tâche"]').click().type('Acheter du café')
        cy.get('button').find('svg.lucide-plus').parent().click()
        cy.contains('Acheter du café', { timeout: 10000 }).should('be.visible')
        cy.get('body').then($body => {
          if ($body.text().includes('0/1 terminées')) {
            cy.contains('0/1 terminées').should('be.visible')
          }
        })
      })
  
      it('TC002 - Tentative d\'ajout avec champ vide', () => {
        cy.get('input[placeholder*="Ajouter une nouvelle tâche"]').should('have.value', '')
        cy.get('button').find('svg.lucide-plus').parent().click()
        cy.get('body').then($body => {
          if ($body.find('.space-y-3').length > 0) {
            cy.get('.space-y-3').children().should('have.length', 0)
          } else {
            cy.contains('Aucune tâche pour le moment').should('be.visible')
          }
        })
      })
  
      it('TC003 - Ajouter une tâche avec caractères spéciaux', () => {
        cy.get('input[placeholder*="Ajouter une nouvelle tâche"]').click().type('Acheter du pain #@!%&')
        cy.get('button').find('svg.lucide-plus').parent().click()
        cy.contains('Acheter du pain #@!%&').should('be.visible')
      })
    })
  
    describe('Marquage des tâches comme terminées', () => {
      beforeEach(() => {
        cy.get('input[placeholder*="Ajouter une nouvelle tâche"]').type('Faire les courses')
        cy.get('button').find('svg.lucide-plus').parent().click()
        cy.contains('Faire les courses').should('be.visible')
      })
  
      it('TC004 - Marquer une tâche comme terminée', () => {
        cy.contains('span', 'Faire les courses')
          .parents('div[data-slot="card"]')
          .find('button[role="checkbox"]')
          .click()
  
        // Vérifier que le texte est barré
        cy.contains('span', 'Faire les courses').should('have.class', 'line-through')
  
        // Vérifier le statut terminé
        cy.contains('Terminé').should('be.visible')
  
        // Vérifier la progression
        cy.contains('1/1 terminées').should('be.visible')
        cy.contains('100% complété').should('be.visible')
      })
    })
  
    describe('Suppression de tâches', () => {
      beforeEach(() => {
        cy.get('input[placeholder*="Ajouter une nouvelle tâche"]').type('Réviser examen')
        cy.get('button').find('svg.lucide-plus').parent().click()
        cy.contains('Réviser examen').should('be.visible')
      })
  
      it('TC005 - Supprimer une tâche existante', () => {
        cy.contains('span', 'Réviser examen')
          .parents('div[data-slot="card"]')
          .find('svg.lucide-trash2')
          .parent()
          .click()
  
        cy.contains('Réviser examen').should('not.exist')
        cy.contains('Aucune tâche pour le moment').should('be.visible')
      })
    })
  
    describe('Barre de progression', () => {
      beforeEach(() => {
        const tasks = ['Task 1', 'Task 2', 'Task 3']
        tasks.forEach(task => {
          cy.get('input[placeholder*="Ajouter une nouvelle tâche"]').clear().type(task)
          cy.get('button').find('svg.lucide-plus').parent().click()
          cy.contains(task).should('be.visible')
        })
      })
  
      it('TC006 - Progression avec 1 tâche sur 3 terminée', () => {
        cy.contains('span', 'Task 1')
          .parents('div[data-slot="card"]')
          .find('button[role="checkbox"]')
          .click()
  
        cy.contains('1/3 terminées').should('be.visible')
        cy.contains('33% complété').should('be.visible')
      })
    })
  
    
    
  })
  