// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// ESelect
import fixtures from '../fixtures/fixtures'

Cypress.Commands.add('openSelect', () => {
  cy.get('.select-container').click()
})

// todo разбить на 2 функции
Cypress.Commands.add('selectDateTime', () => {
  cy.get('input#calendar-input--date').click()
  cy.get('.calendar__days li.--current').click()
  cy.get('.footer .picker .select.select--hours').click()
  cy.get('.dropdown-items .dropdown-item').first().click()

  cy.get('.footer .picker .select.select--minutes').click()
  cy.get('.select.select--minutes .dropdown-items .dropdown-item').eq(5).click()

  cy.get('.footer .picker .select.ampm').click()
  cy.get('.select.ampm .dropdown-items .dropdown-item').eq(1).click()
})
