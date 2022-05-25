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

// describe('Styles + Render', () => {
//   it('should render ECalendar', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('input#calendar-input--date').should('exist').should('be.visible')
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar').should('exist').should('be.visible')
//
//     cy.get('.calendar__controls').should('exist').should('be.visible')
//     cy.get('.calendar__controls-left').should('exist').should('be.visible')
//     cy.get('.calendar__controls-month').should('exist').should('be.visible')
//     cy.get('.calendar__controls-right').should('exist').should('be.visible')
//     cy.get('.calendar__weekdays').should('exist').should('be.visible')
//     cy.get('.calendar__days').should('exist').should('be.visible')
//     // cy.get('.calendar__days li').should('have.text', 34)
//     cy.get('.footer .picker').should('exist').should('be.visible')
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar').should('not.exist')
//   })
//
//   it('should render correct month, weekdays and days', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('input#calendar-input--date').click()
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//     let [currentMonth, currentDay, currentYear] = currentDate.split(' ')
//     currentDay = new Date().getDate()
//
//     cy.get('.calendar__controls-month').should('have.text', `${currentMonth} ${currentYear}`)
//     cy.get('.calendar__weekdays li').should('have.length', 7)
//     cy.get('.calendar__days li.--current').should('exist').should('have.text', `${currentDay}`)
//
//     //todo how to check if Days rendered correctly with weekdays
//     // console.log(new Date().getDay())
//     // const newDay = new Date()
//     // let dayCopy = newDay
//     // dayCopy.setDate(1)
//     // console.log(dayCopy.getDay())
//   })
//
//   it('should render weekdays depending on locale', () => {
//     preMount({ ...fixtures.ECalendarProps, locale: 'ru-RU' })
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__weekdays li').first().should('have.text', 'Вс')
//   })
//
//   it('should have "filled" class to both date and time inputs on focus', () => {
//     preMount(fixtures.ECalendarProps)
//     cy.selectDateTime()
//     cy.get('.input.left .input-container').should('have.class', 'filled')
//     cy.get('.input.right .input-container').should('have.class', 'filled')
//
//     cy.get('input#calendar-input--date').click().click()
//     cy.get('.input.left .input-container').should('have.class', 'filled')
//     cy.get('.input.right .input-container').should('have.class', 'filled')
//   })
//
//   it('should have "focused" class on inputs container on click', () => {
//     preMount(fixtures.ECalendarProps)
//     cy.get('input#calendar-input--date').click()
//     cy.get('.date-inputs').should('have.class', 'focused')
//   })
//
//   it('should not have "doubled" class if there are no time selectors', () => {
//     preMount({ ...fixtures.ECalendarProps, timePicker: null })
//     cy.get('input#calendar-input--date').click()
//     cy.get('.date-inputs').should('not.have.class', 'doubled')
//   })
//
//   it('should not have "filled" class to both date and time inputs on focus ( showFilled: false )', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       inputData: {
//         showFilled: false,
//         size: 'md',
//       },
//     })
//     cy.selectDateTime()
//     cy.get('.input.left .input-container').should('not.have.class', 'filled')
//     cy.get('.input.right .input-container').should('not.have.class', 'filled')
//
//     cy.get('input#calendar-input--date').click().click()
//     cy.get('.input.left .input-container').should('not.have.class', 'filled')
//     cy.get('.input.right .input-container').should('not.have.class', 'filled')
//   })
// })

// describe('Select Single Date & Time', () => {
//   it('should display selected date in input', () => {
//     //   todo check emit
//     preMount({ ...fixtures.ECalendarProps, timePicker: null })
//
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__days li.--current').click()
//
//     cy.get('#calendar-input--date').should('have.value', currentDate)
//   })
//
//   it('should display selected date and time in input', () => {
//     //   todo check emit
//     preMount(fixtures.ECalendarProps)
//
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.selectDateTime()
//     cy.get('#calendar-input--date').should('have.value', currentDate)
//     cy.get('#calendar-input--time').should('have.value', '12:05 PM')
//   })
//
//   it('should allow to select time in 24hours format', () => {
//     //   todo check emit
//     preMount({
//       ...fixtures.ECalendarProps,
//       locale: 'ru-RU',
//       timePicker: {
//         isAMPM: false,
//       },
//     })
//
//     const currentDate = new Date().toLocaleDateString('ru-RU', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__days li.--current').click()
//     cy.get('.footer .picker .select.select--hours').click()
//     cy.get('.dropdown-items .dropdown-item').eq(1).click()
//
//     cy.get('.footer .picker .select.select--minutes').click()
//     cy.get('.select.select--minutes .dropdown-items .dropdown-item').eq(5).click()
//
//     cy.get('#calendar-input--date').should('have.value', currentDate)
//     cy.get('#calendar-input--time').should('have.value', '01:05')
//   })
//
// })

// Функционал Даты
// 2. Можно выбрать диапазон дат и они корректно отобразится в инпуте + эмит
// 4. отображение в инпуте корректно для диапазона дат
// 6. отображение в инпуте корректно диапазона даты + время

describe('Select Date Range & Time', () => {
  it('should display selected date range in input', () => {
    preMount({ ...fixtures.ECalendarProps, timePicker: null, isRange: true })

    const firstOfCurrMonthDate = new Date(new Date().setDate(1)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    const fifthOfCurrMonthDate = new Date(new Date().setDate(5)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    console.log(firstOfCurrMonthDate, fifthOfCurrMonthDate)

    cy.get('input#calendar-input--date').click()
    // todo search Month by text
    cy.get('.calendar__days li').contains('1').click()
    cy.get('.calendar__days li').contains('5').click()

    cy.get('#calendar-input--date').should(
      'have.value',
      firstOfCurrMonthDate + ' - ' + fifthOfCurrMonthDate,
    )
  })

  // it('should display selected date and time in input', () => {
  //   preMount({...fixtures.ECalendarProps, isRange: true })
  //
  //   const currentDate = new Date().toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   })
  //
  //   cy.selectDateTime()
  //   cy.get('#calendar-input--date').should('have.value', currentDate)
  //   cy.get('#calendar-input--time').should('have.value', '12:05 PM')
  // })
  //
  // it('should allow to select time in 24hours format', () => {
  //
  //   preMount({
  //     ...fixtures.ECalendarProps,
  //     locale: 'ru-RU',
  //     timePicker: {
  //       isAMPM: false,
  //     }, isRange: true
  //   })
  //
  //   const currentDate = new Date().toLocaleDateString('ru-RU', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   })
  //
  //   cy.get('input#calendar-input--date').click()
  //   cy.get('.calendar__days li.--current').click()
  //   cy.get('.footer .picker .select.select--hours').click()
  //   cy.get('.dropdown-items .dropdown-item').eq(1).click()
  //
  //   cy.get('.footer .picker .select.select--minutes').click()
  //   cy.get('.select.select--minutes .dropdown-items .dropdown-item').eq(5).click()
  //
  //   cy.get('#calendar-input--date').should('have.value', currentDate)
  //   cy.get('#calendar-input--time').should('have.value', '01:05')
  // })
})
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
