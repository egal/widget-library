/// <reference types="cypress" />
// import { mount } from '@cypress/vue'
import EInput from '../../../src/components/inputs/Input/EInput.vue'
import { mountCallback } from '@cypress/vue'

describe('first test', () => {
  beforeEach(mountCallback(EInput))

  it('loads the app', () => {
    cy.visit('/')
    // console.log(EInput)
    // // console.log(cy)
    // // cy.get('.todoapp').should('be.visible')
    // mount(EInput, {
    //   propsData: {
    //     id: 'from-cypress',
    //   },
    // })
    // cy.get('#test-input').should('be.visible')
  })
})
