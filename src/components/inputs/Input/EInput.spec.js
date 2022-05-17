/// <reference types="cypress" />
import { mount, mountCallback } from '@cypress/vue'
import EInput from './EInput.vue'

const modelValue = ''

const propsData = {
  id: 'test-input',
  type: 'text',
  placeholder: 'placeholder',
  label: 'Input',
  error: '',
  showSuccess: false,
  showFilled: true,
  modelValue,
  disabled: false,
  validators: [],
  helperText: null,
  iconLeft: null,
  iconRight: null,
  postfix: '',
  size: 'md',
  showError: true,
  required: false,
  showArrows: true,
  min: undefined,
  max: undefined,
  inputMaxLength: undefined,
  readonly: false,
  clearable: true,
  chips: false,
  shownKey: 'name',
}

//todo split into several describes
describe('first test', () => {
   // before(() => {
   //   mount(EInput, {
   //     props: {
   //       data: propsData,
   //     },
   //   })
   // })

  it('EInput exists', () => {
    mount(EInput, {
      props: {
        data: propsData,
      },
    })

    cy.get('#test-input').should('be.visible')
  //  todo
  //  has label
  //   has placeholder
  })

  it('have styles when filled', () => {
    mount(EInput, {
      props: {
        data: propsData,
      },
    })


    const inputText = 'Some text'
    cy.get('#test-input').type(inputText)
    cy.get('#test-input').should('have.value', inputText)
    cy.get('.input-container').should('have.class', 'filled')
  })

  it('displays validation error', () => {
    mount(EInput, {
      props: {
        data: propsData,
      },
    })


    const errorText = 'The field is required'
    const inputText = 'Some text'
    const validator = (value) => {
      return value ? '' : errorText
    }

    Cypress.vue.data.validators.push(validator)

    cy.get('#test-input').type(inputText)
    cy.get('#test-input').clear()
    cy.get('#test-input').should('have.value', '')
    cy.get('.helper-text.helper-text--error').should('be.visible').should('have.text', errorText)

  })

  it('not writable when disabled', () => {
    //todo !
    mount(EInput, {
      props: {
        data: { ...propsData, disabled: true },
      },
    })


    cy.get('#test-input').should('have.attr', 'disabled')
  })

  //todo not working
  it('should display ClearButton if clearable and clear value', () => {
    mount(EInput, {
      props: {
        data: { clearable: true, type: 'text', showArrows: false },
      },
    })

    // todo mountCallback


    cy.get('.mask-icon-subtract').should('be.visible')
    cy.get('#test-input').type(12)
    cy.get('#test-input').should('have.value', 12)
    cy.get('.subtract-button').click()
    cy.get('#test-input').should('have.value', '')
  })


  it('only allows enter min and max values if type is "number"', () => {
    mount(EInput, {
      props: {
        data: { ...propsData, type: 'number', min: 2, max: 5, showArrows: true, clearable: false },
      },
    })


    cy.get('#test-input').type(1)
    cy.get('#test-input').should('have.value', 2)
    cy.get('#test-input').type(8)
    cy.get('#test-input').should('have.value', 5)

    //todo this case
    // el.type(3)
    // el.should('have.value', 3)
  })

  it('arrows should be clickable if type is "number"', () => {
    mount(EInput, {
      props: {
        data: { ...propsData, type: 'number', min: 2, max: 5, showArrows: true, clearable: false },
      },
    })


  // todo заменить все переменные на  cy.get
    cy.get('.bi.icon.icon--increase').should('be.visible')
    cy.get('.bi.icon.icon--decrease').should('be.visible')


    cy.get('#test-input').type(2)
    cy.get('.bi.icon.icon--increase').click()
    cy.get('#test-input').should('have.value', 3)

    cy.get('.bi.icon.icon--decrease').click().click()
    cy.get('#test-input').should('have.value', 2)


  })

  // describe('ButtonCounter', () => {
  //   beforeEach(mountCallback(ButtonCounter))
  //
  //   it('starts with zero', () => {
  //     cy.contains('button', '0')
  //   })
  //
  //   it('increments the counter on click', () => {
  //     cy.get('button').click().click().click().contains('3')
  //   })
  //
  //   it('emits "increment" event on click', () => {
  //     const spy = cy.spy()
  //     Cypress.vue.$on('increment', spy)
  //     cy.get('button')
  //       .click()
  //       .click()
  //       .then(() => {
  //         expect(spy).to.be.calledTwice
  //       })
  //   })
  // })

  it('should allow setted maxLength', () => {
    mount(EInput, {
      props: {
        data: { ...propsData, type: 'number', inputMaxLength: 3 },
      },
    })

    cy.get('#test-input').type(1).type(2).type(3).type(4)
    cy.get('#test-input').should('have.value', 123)
    // unmount()
  })


  // clerable
  // rreadonly
  // chips
  // postfix
})

describe('ButtonCounter', () => {
  beforeEach(mountCallback(EInput, {
    props: {
      data: { clearable: true, type: 'text', showArrows: false },
    },
  }))

  it('should display ClearButton if clearable and clear value', () => {
    // mount(EInput, {
    //   props: {
    //     data: { clearable: true, type: 'text', showArrows: false },
    //   },
    // })

    // todo mountCallback

    //
    // cy.get('.subtract-button').should('be.visible')
    // cy.get('#test-input').type(12)
    // cy.get('#test-input').should('have.value', 12)
    // cy.get('.subtract-button').click()
    // cy.get('#test-input').should('have.value', '')
  })
  // it('starts with zero', () => {
  //   cy.contains('button', '0')
  // })
  //
  // it('increments the counter on click', () => {
  //   cy.get('button').click().click().click().contains('3')
  // })
  //
  // it('emits "increment" event on click', () => {
  //   const spy = cy.spy()
  //   Cypress.vue.$on('increment', spy)
  //   cy.get('button')
  //     .click()
  //     .click()
  //     .then(() => {
  //       expect(spy).to.be.calledTwice
  //     })
  // })
})