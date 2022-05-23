/// <reference types="cypress" />
import { mount } from '@cypress/vue'
import ESelect from './ESelect.vue'

const propsData = {
  label: 'Select-label',
  placeholder: 'Select an option',
  size: 'md',
  clearable: true,
  searchable: false,
  multiple: false,
  options: [{ name: 'First' }, { name: 'Second' }, { name: 'Third' }],
  isLocalOptions: true,
  nonLocalOptionsTotalCount: 0,
  modelValue: [],
  shownKey: 'name',
  error: '',
  showError: true,
  validators: [],
  grouped: false,
  searchPlaceholder: 'Search',
  searchableInput: false,
  emptyDropdownText: 'no data',
  dropdownPosition: 'bottom',
  showMoreButtonDisplay: false,
  showMoreButtonText: 'Show more...',
  closeDropdownAfterSelection: true,
  openDropdown: false,
}

function preMount(data) {
  return mount(ESelect, {
    props: {
      data,
    },
  })
}

describe('Styles', () => {
  it('renders ESelect', () => {
    preMount(propsData)
    cy.get('.select').should('be.visible')
    cy.get('.dropdown-component').should('not.be.visible')
    cy.get('.select-label').should('be.visible')
  })
})

describe('Dropdown', () => {
  it('renders dropdown options', () => {
    preMount(propsData)
    cy.get('.dropdown-items .dropdown-item').should('have.length', 3)
  })

  it('toggles dropdown', () => {
    preMount(propsData)
    cy.get('.dropdown-component').should('not.be.visible')
    cy.get('.select-container').click()
    cy.get('.dropdown-component').should('be.visible')

    cy.get('.select-container').click()
    cy.get('.dropdown-component').should('not.be.visible')
  })

  it('closes dropdown on click outside', () => {
    preMount(propsData)
    cy.get('.dropdown-component').should('not.be.visible')
    cy.get('.select-container').click()
    cy.get('.dropdown-component').should('be.visible')
    cy.root().click(0, 0)
  })

  it('closes dropdown on select', () => {
    preMount(propsData)
    cy.get('.dropdown-component').should('not.be.visible')
    cy.get('.select-container').click()
    cy.get('.dropdown-component').should('be.visible')

    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.dropdown-component').should('not.be.visible')
  })

  it('not closing dropdown after select (with closeDropdownAfterSelection prop)', () => {
    preMount({ ...propsData, closeDropdownAfterSelection: false })

    cy.get('.select-container').click()
    cy.get('.dropdown-component').should('be.visible')

    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.dropdown-component').should('be.visible')
  })

  it('renders empty dropdown text', () => {
    preMount({ ...propsData, emptyDropdownText: 'Empty', options: [] })
    cy.get('.select-container').click()

    cy.get('.dropdown-item')
      .should('have.class', 'dropdown-item--empty')
      .should('have.text', 'Empty')
  })
})

describe('Select', () => {
  it('set selected option as value', () => {
    preMount(propsData)

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.selected').should('have.text', 'First')

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.selected').should('have.text', 'First')

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').last().click()
    cy.get('.selected').should('have.text', 'Third')
  })

  it('clears value on ClearButton', () => {
    preMount(propsData)

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.mask-icon-subtract').should('be.visible')

    cy.get('.mask-icon-subtract').click()
    cy.get('.selected').should('have.text', '')
  })

  it('has no ClearButton if Select is not clearable', () => {
    preMount({ ...propsData, clearable: false })

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.mask-icon-subtract').should('not.exist')
  })
})

describe('Searchable', () => {
  it('is searchable', () => {
    preMount({ ...propsData, searchable: true })
    cy.get('.select-container').click()
    cy.get('.dropdown-items #input-text').should('be.visible')
    cy.get('#input-text').type('secon')
    cy.get('.dropdown-items .dropdown-item').should('have.length', 1).should('have.text', 'Second')
  })

  it('shows and search options by shownKey', () => {
    preMount({
      ...propsData,
      searchable: true,
      shownKey: 'title',
      options: [
        { title: 'First Title', name: 'Name 1' },
        { title: 'Second Title', name: 'Name 2' },
      ],
    })
    cy.get('.select-container').click()
    cy.get('.dropdown-items #input-text').should('be.visible')
    cy.get('#input-text').type('first')
    cy.get('.dropdown-items .dropdown-item')
      .should('have.length', 1)
      .should('have.text', 'First Title')
  })
})

describe('Multiple', () => {
  it('select two values', () => {
    preMount({ ...propsData, multiple: true })

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click()
    cy.get('.dropdown-component').should('be.visible')
    cy.get('.dropdown-items .dropdown-item').last().click()

    cy.get('.select-container__values .selected').should('have.length', 2)

    cy.get('.select-container__values .selected').first().should('have.text', 'First')
    cy.get('.select-container__values .selected').last().should('have.text', 'Third')
  })

  it('clears multiple icon', () => {
    preMount({ ...propsData, multiple: true })

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.selected svg.bi').click()
    cy.get('.select-container__values .selected').should('not.exist')
  })

  it('remove selected option by second click', () => {
    preMount({ ...propsData, multiple: true })

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-item').first().click().click()

    cy.get('.select-container__values .selected').should('not.exist')
  })
})

describe('Grouped', () => {
  it('renders grouped options', () => {
    preMount({
      ...propsData,
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

    cy.get('.select-container').click()
    cy.get('.dropdown-items .dropdown-groups').should('exist')
    cy.get('.dropdown-groups .group').should('exist').should('have.length', 2)

    cy.get('.dropdown-groups .group:first span').should('have.text', 'First group')

    cy.get('.dropdown-groups .group:first .dropdown-item')
      .should('have.length', 3)
      .first()
      .should('have.text', 'Option one')
  })

  it('set option name as selected value and not group name', () => {
    preMount({
      ...propsData,
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

    cy.get('.select-container').click()
    cy.get('.dropdown-groups .group:first .dropdown-item').first().click()
    cy.get('.selected').should('have.text', 'Option one')

    cy.get('.select-container').click()
    cy.get('.dropdown-groups .group:last .dropdown-item').first().click()
    cy.get('.selected').should('have.text', 'Option four')
  })
})

describe('Show More', () => {
  it('renders Show More button correctly', () => {
    // todo check this btn works
    preMount({
      ...propsData,
      showMoreButtonDisplay: true,
      isLocalOptions: false,
      nonLocalOptionsTotalCount: 5,
      showMoreButtonText: 'Показать больше',
    })

    cy.get('.select-container').click()

    cy.get('.dropdown-button .show-more-btn').should('exist').should('have.text', 'Показать больше')

    //  todo @click - emits
    // cy.get('.show-more-btn')
    //   .click()
    //   .then(() => {
    //     propsData.options.push({ name: '1' }, { name: '2' }, { name: '3' })
    //   })
  })
})
// showMoreButtonDisplay, showMoreButtonText

//todo
describe('Searchable Input', () => {
  it('searchableInput', () => {
    preMount({ ...propsData, searchableInput: true })

    cy.get('.input-container.search input#input-text').click()
    cy.get('.dropdown-component').should('be.visible')

    cy.get('.input-container.search input#input-text').type('secon')
    cy.get('.dropdown-items .dropdown-item').should('have.length', 1)
  })

  it('searchableInput VS searchable', () => {
    preMount({ ...propsData, searchableInput: true, searchable: true })
  })
})

// describe('Is Local Options')
//nonLocalOptionsTotalCount

// describe('Validators')

// describe('Dropdown Position')

//     searchableInput: false,
//     isLocalOptions: true,
//     nonLocalOptionsTotalCount: 0,
//     validators: [],
//     dropdownPosition: 'bottom',
//     openDropdown: false,
