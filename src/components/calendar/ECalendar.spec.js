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

// todo
// Диапазон
// 8. Выбор Диапазона в след месяце
// 9. Выбор диапазона на стыке двух месяцев

// todo
// Двойной календарь и условия со временм и диапазоном

// todo check .single class - if !timePicker
describe('Styles + Render', () => {
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
  // todo куда то вынести это в функцию
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
  // it('should have "single" class and 1 input if there are no time selectors', () => {
  //   preMount({ ...fixtures.ECalendarProps, timePicker: null })
  //   cy.get('.calendar__input').should('have.class', 'single')
  // })
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
})

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

// describe('Select Date Range & Time', () => {
//   it('should display selected date range in input', () => {
//     preMount({ ...fixtures.ECalendarProps, timePicker: null, isRange: true })
//
//     const firstOfCurrMonthDate = new Date(new Date().setDate(1)).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     const fifthOfCurrMonthDate = new Date(new Date().setDate(5)).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar__days li').contains('1').click()
//     cy.get('.calendar__days li').contains('5').click()
//
//     cy.get('#calendar-input--date').should(
//       'have.value',
//       firstOfCurrMonthDate + ' - ' + fifthOfCurrMonthDate,
//     )
//   })
//
//   it('should display backward selected date range in input', () => {
//     preMount({ ...fixtures.ECalendarProps, timePicker: null, isRange: true })
//
//     const firstOfCurrMonthDate = new Date(new Date().setDate(1)).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     const fifthOfCurrMonthDate = new Date(new Date().setDate(5)).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar__days li').contains('5').click()
//     cy.get('.calendar__days li').contains('1').click()
//
//     cy.get('#calendar-input--date').should(
//       'have.value',
//       firstOfCurrMonthDate + ' - ' + fifthOfCurrMonthDate,
//     )
//   })
//
//   it('should not render time selectors if is date range', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       timePicker: null,
//       isRange: true,
//     })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.footer .picker').should('not.exist')
//   })
//
//   it('should not render time selectors if is date range', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       timePicker: null,
//       isDouble: true,
//     })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.footer .picker').should('not.exist')
//   })
// })

// describe('Time Select', () => {
//   it('should not allow to select time until at least 1 date selected', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       timePicker: {
//         isAMPM: true,
//         label: 'Choose time',
//       },
//     })
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.footer .picker').should('have.class', 'disabled')
//   })
//
//   it('should allow to select time in 12hours format', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       timePicker: {
//         isAMPM: true,
//         label: 'Choose time',
//       },
//     })
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__days li.--current').click()
//     cy.get('.footer .picker').should('not.have.class', 'disabled')
//
//     cy.get('.select.ampm').should('exist').should('be.visible')
//   })
//
//   it('should allow to select time in 24hours format', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       timePicker: {
//         isAMPM: false,
//         label: 'Choose time',
//       },
//     })
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__days li.--current').click()
//     cy.get('.footer .picker').should('not.have.class', 'disabled')
//
//     cy.get('.select.ampm').should('not.exist')
//   })
// })

// describe('Month Select', () => {
//   it('should switch to next month', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__controls-right').should('be.visible').click()
//     const currentMonth = new Date().getMonth()
//
//     const nextMonth = new Date(new Date().setMonth(currentMonth + 1)).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//     })
//
//     cy.get('.calendar__controls-month').should('have.text', nextMonth)
//   })
//
//   it('should switch to prev month', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__controls-left').should('be.visible').click()
//     const currentMonth = new Date().getMonth()
//
//     const prevMonth = new Date(new Date().setMonth(currentMonth - 1)).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//     })
//
//     cy.get('.calendar__controls-month').should('have.text', prevMonth)
//   })
// })

//todo check preselected values: date, date + time
//todo check range in different month
//todo check inactive days (not in current month) should not be clickable
