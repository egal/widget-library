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

// Функционал Даты
// 1. Можно выбрать одну дату и она корректно отобразится в инпуте + эмит
// 2. Можно выбрать диапазон дат и они корректно отобразится в инпуте + эмит
// 3. отображение в инпуте корректно для одной даты
// 4. отображение в инпуте корректно для диапазона дат
// 5. отображение в инпуте корректно даты + время
// 6. отображение в инпуте корректно диапазона даты + время

// Диапазон
// 1. Выбор диапазона с прошедшей даты до текущей в этом месяце
// 2. Выбор диапазона между двмя прощедщими датами в этом месяце
// 2. Выбор диапазона с прошедшей даты до будущей в этом месяце
// 3. Выбор диапазона с текущей даты до будущей в этом месяце
// 4. Выбор диапазона между двмя будущими датами в этом месяце
// 5. В обратном порядке: с будущей до текущей в этом месяце
// 5. В обратном порядке: с текущей до прошедшей в этом месяце
// 6. В обратном порядке: между двмя прощедщими датами в этом месяце
// 7. В обратном порядке: между двмя будущими датами в этом месяце
// 8. Выбор Диапазона в след месяце
// 9. Выбор диапазона на стыке двух месяцев

// Время
// 1. Можно выбрать время в формате AMPM
// 2. время в 24часовом формате

// Месяцы
// 1. Можно переключать месяцы вперед и назад корректно

// Двойной календарь и условия со временм и диапазоном
// что там было

describe('Styles + Render', () => {
  // it('should render ECalendar', () => {
  //   preMount(fixtures.ECalendarProps)
  //
  //   cy.get('input#calendar-input--date').should('exist').should('be.visible')
  //
  //   cy.get('input#calendar-input--date').click()
  //   cy.get('.calendar').should('exist').should('be.visible')
  //
  //   cy.get('.calendar__controls').should('exist').should('be.visible')
  //   cy.get('.calendar__controls-left').should('exist').should('be.visible')
  //   cy.get('.calendar__controls-month').should('exist').should('be.visible')
  //   cy.get('.calendar__controls-right').should('exist').should('be.visible')
  //   cy.get('.calendar__weekdays').should('exist').should('be.visible')
  //   cy.get('.calendar__days').should('exist').should('be.visible')
  //   // cy.get('.calendar__days li').should('have.text', 34)
  //   cy.get('.footer .picker').should('exist').should('be.visible')
  //
  //   cy.get('input#calendar-input--date').click()
  //   cy.get('.calendar').should('not.exist')
  // })
  //
  // it('should render correct month, weekdays and days', () => {
  //   preMount(fixtures.ECalendarProps)
  //
  //   cy.get('input#calendar-input--date').click()
  //   const currentDate = new Date().toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   })
  //   let [currentMonth, currentDay, currentYear] = currentDate.split(' ')
  //   currentDay = new Date().getDate()
  //
  //   cy.get('.calendar__controls-month').should('have.text', `${currentMonth} ${currentYear}`)
  //   cy.get('.calendar__weekdays li').should('have.length', 7)
  //   cy.get('.calendar__days li.--current').should('exist').should('have.text', `${currentDay}`)
  //
  //   //todo how to check if Days rendered correctly with weekdays
  //   // console.log(new Date().getDay())
  //   // const newDay = new Date()
  //   // let dayCopy = newDay
  //   // dayCopy.setDate(1)
  //   // console.log(dayCopy.getDay())
  // })
  //
  // it('should render weekdays depending on locale', () => {
  //   preMount({ ...fixtures.ECalendarProps, locale: 'ru-RU' })
  //
  //   cy.get('input#calendar-input--date').click()
  //   cy.get('.calendar__weekdays li').first().should('have.text', 'Вс')
  // })

  // 1. проверка что при клике стили остаются filled,если showFilled = true
  // 2. проверка что при фокусе стили остаются filled,если showFilled = true
  // 3. проверка что при клике стилей нет,если showFilled = false
  // 4. проверка что при фокусе стилей нет,если showFilled = false
  it('should ste "filled" class to both date and time inputs on focus', () => {
    preMount(fixtures.ECalendarProps)

    cy.get('input#calendar-input--date').click()
    cy.get('.calendar__days li').first().click()
    cy.get('.footer .picker .select').first().click()
    cy.get('.dropdown-items .dropdown-item').first().click()

    cy.get('.footer .picker .select').first().next().next().click()
    cy.get('.dropdown-items .dropdown-item').first().next().click()
  })
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
