/// <reference types="cypress" />
import { mount } from '@cypress/vue'
import ESelect from './ESelect.vue'
import fixtures from '../../../../cypress/fixtures/fixtures'

function preMount(data) {
  return mount(ESelect, {
    props: {
      data,
    },
  })
}

describe('Styles & Render', () => {
  it('should render ESelect', () => {
    preMount(fixtures.ESelectProps)
    cy.get('.select').should('be.visible')
    cy.get('.dropdown-component').should('not.be.visible')
    cy.get('.select-label').should('be.visible').should('have.text', 'Select label')
  })

  it('should not displaying ClearButton when dropdown is open', () => {
    preMount(fixtures.ESelectProps)
    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.mask-icon-subtract').should('exist')

    cy.openSelect()
    cy.get('.mask-icon-subtract').should('not.exist')
  })

  it('should render dropdown options', () => {
    preMount(fixtures.ESelectProps)
    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item').should('have.length', 3)
  })
})

describe('Dropdown', () => {
  it('should open & close dropdown', () => {
    preMount(fixtures.ESelectProps)
    cy.get('.dropdown-component').should('not.be.visible')

    cy.openSelect()
    cy.get('.dropdown-component').should('be.visible')

    cy.openSelect()
    cy.get('.dropdown-component').should('not.be.visible')
  })

  it('should close dropdown on click outside', () => {
    preMount(fixtures.ESelectProps)

    cy.openSelect()
    cy.get('.dropdown-component').should('be.visible')
    cy.root().click(0, 0)
    cy.get('.dropdown-component').should('not.be.visible')
  })

  it('should close dropdown on Item select', () => {
    preMount(fixtures.ESelectProps)
    cy.openSelect()

    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.dropdown-component').should('not.be.visible')
  })

  it('should not close dropdown on Item select (closeDropdownAfterSelection = false prop)', () => {
    preMount({ ...fixtures.ESelectProps, closeDropdownAfterSelection: false })

    cy.openSelect()
    cy.get('.dropdown-component').should('be.visible')

    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.dropdown-component').should('be.visible')
  })

  it('should render correct empty dropdown text', () => {
    preMount({ ...fixtures.ESelectProps, emptyDropdownText: 'Empty', options: [] })
    cy.openSelect()

    cy.get('.dropdown-item')
      .should('have.class', 'dropdown-item--empty')
      .should('have.text', 'Empty')
  })
})

describe('Select', () => {
  it('should set selected option', () => {
    preMount(fixtures.ESelectProps)

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item')
      .first()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.selected').should('have.text', 'First')

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item')
      .last()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.selected').should('have.text', 'Third')

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item')
      .first()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.selected').should('have.text', 'First')
  })
})

describe('Clearing', () => {
  it('should clear select on ClearButton click', () => {
    preMount(fixtures.ESelectProps)

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.mask-icon-subtract').should('be.visible')

    cy.get('.mask-icon-subtract')
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.selected').should('have.text', '')
  })

  it('should have no ClearButton if Select is not clearable', () => {
    preMount({ ...fixtures.ESelectProps, clearable: false })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.mask-icon-subtract').should('not.exist')
  })
})

describe('Searchable', () => {
  it('should render search input in dropdown', () => {
    preMount({ ...fixtures.ESelectProps, searchable: true })
    cy.openSelect()
    cy.get('.dropdown-items #input-text').should('be.visible')
  })

  it('should search by options', () => {
    preMount({ ...fixtures.ESelectProps, searchable: true })
    cy.openSelect()

    cy.get('#input-text').type('secon')
    cy.get('.dropdown-items .dropdown-item').should('have.length', 1).should('have.text', 'Second')

    cy.get('#input-text').type('a')
    cy.get('.dropdown-items .dropdown-item').should('not.have.length')
  })

  it('should render options by shownKey and search correctly', () => {
    preMount({
      ...fixtures.ESelectProps,
      searchable: true,
      shownKey: 'title',
      options: [{ title: 'First Title' }, { title: 'Second Title' }],
    })

    cy.openSelect()

    cy.get('#input-text').type('first')
    cy.get('.dropdown-items .dropdown-item')
      .should('have.length', 1)
      .should('have.text', 'First Title')
  })
})

describe('Multiple', () => {
  it('should not close dropdown on select', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true, modelValue: [] })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.dropdown-component').should('be.visible')
  })

  it('should allow to select several values', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true, modelValue: [] })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item')
      .first()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.dropdown-items .dropdown-item').last().click()

    cy.get('.select-container__values .selected').should('have.length', 2)

    cy.get('.select-container__values .selected').first().should('have.text', 'First')
    cy.get('.select-container__values .selected').last().should('have.text', 'Third')
  })

  it('should delete selected value on X icon click', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true, modelValue: [] })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.selected svg.bi')
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.select-container__values .selected').should('not.exist')
  })

  it('should delete selected option by second click in dropdown', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item')
      .first()
      .click()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })

    cy.get('.select-container__values .selected').should('not.exist')
  })

  it('should clear on ClearButton', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.root().click(0, 0)
    cy.get('.mask-icon-subtract').click()
    cy.get('.select-container').should('not.have.text')
  })
})

describe('Grouped', () => {
  it('should render grouped options', () => {
    preMount({
      ...fixtures.ESelectProps,
      grouped: true,
      options: [
        {
          groupName: 'First group',
          options: [
            {
              name: 'Option one',
              key: 1,
            },
            {
              name: 'Option two',
              key: 2,
            },
            {
              name: 'Option three',
              key: 3,
            },
          ],
        },
        {
          groupName: 'Second group',
          options: [
            {
              name: 'Option four',
              key: 4,
            },
            {
              name: 'Option five',
              key: 5,
            },
          ],
        },
      ],
    })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-groups').should('exist')
    cy.get('.dropdown-groups .group').should('exist').should('have.length', 2)

    cy.get('.dropdown-groups .group:first span').should('have.text', 'First group')

    cy.get('.dropdown-groups .group:first .dropdown-item')
      .should('have.length', 3)
      .first()
      .should('have.text', 'Option one')
  })

  it('should set option name as selected value', () => {
    preMount({
      ...fixtures.ESelectProps,
      grouped: true,
      options: [
        {
          groupName: 'First group',
          options: [
            {
              name: 'Option one',
              key: 1,
            },
            {
              name: 'Option two',
              key: 2,
            },
            {
              name: 'Option three',
              key: 3,
            },
          ],
        },
        {
          groupName: 'Second group',
          options: [
            {
              name: 'Option four',
              key: 4,
            },
            {
              name: 'Option five',
              key: 5,
            },
          ],
        },
      ],
    })

    cy.openSelect()
    cy.get('.dropdown-groups .group:first .dropdown-item').first().click()
    cy.get('.selected').should('have.text', 'Option one')

    cy.openSelect()
    cy.get('.dropdown-groups .group:last .dropdown-item').first().click()
    cy.get('.selected').should('have.text', 'Option four')
  })
})

describe('Show More', () => {
  it('should render Show More button and emit event', () => {
    preMount({
      ...fixtures.ESelectProps,
      showMoreButtonDisplay: true,
      isLocalOptions: false,
      nonLocalOptionsTotalCount: 4,
      showMoreButtonText: 'Показать больше',
    })
    // fixtures.ESelectProps.options = [{ name: 'First' }, { name: 'Second' }, { name: 'Third' }]

    cy.openSelect()

    cy.get('.dropdown-button .show-more-btn').should('exist').should('have.text', 'Показать больше')
    cy.get('.dropdown-button .show-more-btn')
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'show-more')
      })
  })

  it('should hide Show More button if options.length > nonLocalOptionsTotalCount', () => {
    preMount({
      ...fixtures.ESelectProps,
      showMoreButtonDisplay: true,
      isLocalOptions: false,
      nonLocalOptionsTotalCount: 4,
      showMoreButtonText: 'Показать больше',
    })
    // fixtures.ESelectProps.options = [{ name: 'First' }, { name: 'Second' }, { name: 'Third' }]

    cy.openSelect()

    // cy.get('.dropdown-button .show-more-btn')
    //   .click()
    //   .then(() => {
    //     cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'show-more')
    //   })

    Cypress.vueWrapper.componentVM.$nextTick(() => {
      fixtures.ESelectProps.options.push({ name: '1' })
    })

    cy.get('.dropdown-button .show-more-btn').should('not.exist')
  })

  it('should not render Show More button with specific props', () => {
    // nonLocalOptionsTotalCount should be less than options.length
    preMount({
      ...fixtures.ESelectProps,
      showMoreButtonDisplay: true,
      isLocalOptions: false,
      nonLocalOptionsTotalCount: 1,
      showMoreButtonText: 'Показать больше',
    })
    fixtures.ESelectProps.options.pop()

    cy.openSelect()

    cy.get('.dropdown-button .show-more-btn').should('not.exist')
  })
})

describe('Searchable Input', () => {
  it('should search via searchable Input', () => {
    preMount({ ...fixtures.ESelectProps, searchableInput: true })

    cy.get('.input-container.search input#input-text').click()
    cy.get('.dropdown-component').should('be.visible')

    cy.get('.input-container.search input#input-text').type('secon')
    cy.get('.dropdown-items .dropdown-item').should('have.length', 1)

    cy.get('.dropdown-items .dropdown-item')
      .first()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
  })
})

describe('Validation', () => {
  it('should validate selected value', () => {
    const validator = (value) => {
      return value.name !== 'First' ? '' : 'errorText'
    }

    preMount({
      ...fixtures.ESelectProps,
      validators: [validator],
    })

    cy.openSelect()
    cy.get('.dropdown-items .dropdown-item')
      .first()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
      })

    cy.get('.select.select--md').should('have.class', 'select--error')
  })
})

describe('Chips', () => {
  it('should select chips', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true, searchableInput: true, modelValue: [] })

    cy.get('.input-container').click()
    cy.get('.dropdown-items .dropdown-item')
      .first()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.dropdown-items .dropdown-item').last().click()

    cy.get('.chips-container').should('exist').should('be.visible')
    cy.get('.con-chip').should('have.length', 2)
    cy.get('.con-chip').first().should('have.text', 'First')
    cy.get('.con-chip').last().should('have.text', 'Third')
  })

  it('should clear chips', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true, searchableInput: true, modelValue: [] })

    cy.get('.input-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.dropdown-items .dropdown-item').last().click()

    cy.get('.bi.chip--close').should('have.length', 2)

    cy.get('.bi.chip--close')
      .first()
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.chips-container').should('have.length', 1).should('have.text', 'Third')

    cy.get('.bi.chip--close').first().click()
    cy.get('.chips-container').should('not.have.length')
  })

  it('should add chip on Enter', () => {
    preMount({ ...fixtures.ESelectProps, multiple: true, searchableInput: true, modelValue: [] })

    cy.get('.input-container')
      .type('Some chip')
      .trigger('keydown', { key: 'Enter' })
      .then(async () => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
    cy.get('.bi.chip--close').should('have.length', 1)

    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.bi.chip--close').should('have.length', 2)
  })
})
