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
  helperText: 'Enter some text',
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
//
// const WrapperComp = {
//   template: `
//     <div :style="{width: '350px'}">
//       <EInput  />
//     </div>
//   `,
//   components: {
//     EInput
//   }
// }

function preMount(props) {
  // beforeEach(() => {
  mount(EInput, {
    props: {
      data: props,
    },
  })
  // })
}

describe('Styles test', () => {
  it('renders EInput', () => {
    preMount(propsData)
    cy.get('input#test-input').should('be.visible')
    cy.get('input#test-input').should('have.attr', 'placeholder')
    cy.get('label.input-label').should('be.visible')
    cy.get('p.helper-text').should('be.visible')
  })

  it('has filled styles', () => {
    preMount(propsData)
    const inputText = 'Some text'

    cy.get('#test-input').type(inputText)
    cy.get('#test-input').should('have.value', inputText)
    cy.get('.input-container').should('have.class', 'filled')
  })

  it('has success styles', () => {
    preMount({ ...propsData, showSuccess: true, modelValue: 'text' })
    cy.get('.input-container').should('have.class', 'success')
  })

  it('has error styles', () => {
    preMount({ ...propsData, error: 'Some error text', modelValue: 'text' })
    cy.get('.input-container').should('have.class', 'error')
  })

  // todo
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
  })

  // rreadonly
  // chips
  // postfix
  //   icons
})

describe('Features test', () => {
  it('displays validation error', () => {
    const errorText = 'The field is required'
    const inputText = 'Some text'
    const validator = (value) => {
      return value ? '' : errorText
    }

    preMount({ ...propsData, validators: [validator] })

    cy.get('#test-input').type(inputText)
    cy.get('#test-input').clear()
    cy.get('.helper-text.helper-text--error').should('be.visible').should('have.text', errorText)
  })

  it('renders ClearButton and clears input value', () => {
    preMount({ ...propsData, clearable: true, type: 'text', showArrows: false })

    const inputText = 'Some text'

    cy.get('#test-input').type(inputText)
    cy.get('.mask-icon-subtract').should('be.visible')
    cy.get('.subtract-button').click()
    cy.get('#test-input').should('have.value', '')
    cy.get('.mask-icon-subtract').should('not.be.visible')
  })
})

describe('Type=number test', () => {
  it('has min value limit if type is "number"', () => {
    preMount({ ...propsData, type: 'number', min: 2, showArrows: true, clearable: false })

    cy.get('#test-input').type('0')
    cy.get('#test-input').should('have.value', '2')
    cy.get('#test-input').clear()

    cy.get('#test-input').type('2')
    cy.get('#test-input').should('have.value', '22')
  })

  it('has max value limit if type is "number"', () => {
    preMount({ ...propsData, type: 'number', max: 5, showArrows: true, clearable: false })

    cy.get('#test-input').type('3')
    cy.get('#test-input').should('have.value', '3')
    cy.get('#test-input').clear()

    cy.get('#test-input').type('80')
    cy.get('#test-input').should('have.value', '5')

    cy.get('#test-input').type('2')
    cy.get('#test-input').should('have.value', '52')
  })

  it('arrows decrease/increase value', () => {
    preMount({ ...propsData, type: 'number', showArrows: true, clearable: false })

    cy.get('.bi.icon.icon--increase').should('be.visible')
    cy.get('.bi.icon.icon--decrease').should('be.visible')

    cy.get('#test-input').type(2)
    cy.get('.bi.icon.icon--increase').click().click()
    cy.get('#test-input').should('have.value', 4)

    cy.get('.bi.icon.icon--decrease').click().click()
    cy.get('#test-input').should('have.value', 2)
  })

  //todo проверить работу с 0, -5, -5.5, -5,5
})

//check password type
// check search type
