/// <reference types="cypress" />
import { mount } from '@cypress/vue'
import ECalendar from './Calendar.vue'
import fixtures from '../../../cypress/fixtures/fixtures'

function preMount(data) {
  return mount(ECalendar, {
    props: {
      data,
    },
  })
}

describe('Styles', () => {
  it('renders EInput', () => {
    preMount(fixtures.ECalendarProps)
    // cy.get('input#test-input').should('be.visible')
    // cy.get('input#test-input').should('have.attr', 'placeholder')
    // cy.get('label.input-label').should('be.visible')
    // cy.get('p.helper-text').should('be.visible')
  })

  // it('has filled styles', () => {
  //   preMount(propsData)
  //   const inputText = 'Some text'
  //
  //   cy.get('#test-input').type(inputText)
  //   cy.get('#test-input').should('have.value', inputText)
  //   cy.get('.input-container').should('have.class', 'filled')
  // })
  //
  // it('has success styles', () => {
  //   preMount({ ...propsData, showSuccess: true, modelValue: 'text' })
  //   cy.get('.input-container').should('have.class', 'success')
  // })
  //
  // it('has error styles', () => {
  //   preMount({ ...propsData, error: 'Some error text', modelValue: 'text' })
  //   cy.get('.input-container').should('have.class', 'error')
  // })
  //
  // it('only allows maxLength value length', () => {
  //   mount(EInput, {
  //     props: {
  //       data: { ...propsData, type: 'number', inputMaxLength: 3 },
  //     },
  //   })
  //
  //   cy.get('#test-input').type(1).type(2).type(3).type(4)
  //   cy.get('#test-input').should('have.value', 123)
  // })
})

// describe('Features', () => {
//   it('displays validation error', () => {
//     const errorText = 'The field is required'
//     const inputText = 'Some text'
//     const validator = (value) => {
//       return value ? '' : errorText
//     }
//
//     preMount({ ...propsData, validators: [validator] })
//
//     cy.get('#test-input').type(inputText)
//     cy.get('#test-input').clear()
//     cy.get('.helper-text.helper-text--error').should('be.visible').should('have.text', errorText)
//   })
//
//   it('renders ClearButton and clears input value', () => {
//     preMount({ ...propsData, clearable: true, type: 'text', showArrows: false })
//
//     const inputText = 'Some text'
//     cy.get('#test-input').type(inputText)
//     cy.get('.mask-icon-subtract').should('be.visible')
//     cy.get('.subtract-button').click()
//
//     cy.get('#test-input').should('have.value', '')
//     cy.get('.mask-icon-subtract').should('not.be.visible')
//   })
//
//   it('has no ClearButton when has a Postfix', () => {
//     preMount({ ...propsData, postfix: 'gr' })
//     cy.get('.subtract-button').should('not.be.visible')
//     cy.get('.icon--right.postfix').should('be.visible')
//   })
//
//   it('has no ClearButton when has a Postfix and set as "clearable"', () => {
//     preMount({ ...propsData, postfix: 'gr', clearable: true })
//     cy.get('.subtract-button').should('not.be.visible')
//     cy.get('.icon--right.postfix').should('be.visible')
//   })
// })
//
// describe('Number type', () => {
//   it('has min value limit if type is "number"', () => {
//     preMount({ ...propsData, type: 'number', min: 2, showArrows: true, clearable: false })
//
//     cy.get('#test-input').type('0')
//     cy.get('#test-input').should('have.value', '2')
//     cy.get('#test-input').clear()
//
//     cy.get('#test-input').type('2')
//     cy.get('#test-input').should('have.value', '22')
//   })
//
//   it('has max value limit if type is "number"', () => {
//     preMount({ ...propsData, type: 'number', max: 5, showArrows: true, clearable: false })
//
//     cy.get('#test-input').type('3')
//     cy.get('#test-input').should('have.value', '3')
//     cy.get('#test-input').clear()
//
//     cy.get('#test-input').type('80')
//     cy.get('#test-input').should('have.value', '5')
//   })
//
//   it('arrows decrease/increase value', () => {
//     preMount({ ...propsData, type: 'number', showArrows: true, clearable: false })
//
//     cy.get('.bi.icon.icon--increase').should('be.visible')
//     cy.get('.bi.icon.icon--decrease').should('be.visible')
//
//     cy.get('#test-input').type(2)
//     cy.get('.bi.icon.icon--increase').click().click()
//     cy.get('#test-input').should('have.value', 4)
//
//     cy.get('.bi.icon.icon--decrease').click().click()
//     cy.get('#test-input').should('have.value', 2)
//   })
// })
//
// describe('Password type', () => {
//   it('shows and hides password', () => {
//     preMount({ ...propsData, type: 'password' })
//     cy.get('#test-input').type('12345')
//     cy.get('#test-input').should('have.attr', 'type', 'password')
//
//     cy.get('.bi.icon.icon--password').click()
//     cy.get('#test-input').should('have.attr', 'type', 'text')
//   })
// })
