Feature: Gestion des tâches dans la Todo List

  Scenario: Ajouter une tâche valide
    Given je suis sur la page "Ma Todo List"
    When je saisis "Acheter du café" dans le champ "Ajouter une nouvelle tâche"
    And je clique sur le bouton "+"
    Then la tâche "Acheter du café" apparaît dans la liste
    And la barre de progression se met à jour

  Scenario: Ajouter une tâche vide
    Given je suis sur la page "Ma Todo List"
    When je laisse le champ vide
    And je clique sur le bouton "+"
    Then aucune tâche n’est ajoutée
    And un message d’erreur doit s’afficher

  Scenario: Marquer une tâche comme terminée
    Given une tâche "Faire les courses" est dans la liste
    When je coche la case à gauche de "Faire les courses"
    Then la tâche "Faire les courses" est affichée comme "Terminée"
    And la barre de progression se met à jour

  Scenario: Supprimer une tâche
    Given une tâche "Réviser examen" est dans la liste
    When je clique sur l’icône "poubelle" de cette tâche
    Then la tâche "Réviser examen" disparaît de la liste
    And la barre de progression se met à jour

  Scenario: Vérifier la mise à jour de la progression
    Given 3 tâches sont présentes dans la liste
    When je coche 1 tâche comme "Terminée"
    Then la barre de progression affiche "1/3 terminée" et "33% complété"

  Scenario: Réorganiser l’ordre des tâches
    Given j’ai les tâches "task1", "task2" et "task3" affichées dans la liste
    When je fais glisser la tâche "task3" au-dessus de la tâche "task1"
    Then la tâche "task3" apparaît en première position dans la liste
    And la progression reste inchangée
  
  Scenario: Conserver l’ordre des tâches après rafraîchissement
    Given j’ai réorganisé les tâches pour que "task3" soit en premier
    When je rafraîchis la page
    Then "task3" est toujours en première position dans la liste

  Scenario: Ajouter une tâche avec des caractères spéciaux
    Given je suis connecté et sur la page "Todo List"
    When je saisis "Acheter du pain #@!%&" dans le champ tâche
    And je clique sur "Ajouter"
    Then un message d’erreur "Écrire une tâche avec un titre valide" s’affiche
    And la tâche "Acheter du pain #@!%&" n’apparaît pas dans la liste
