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

function getNthDay(n) {
  return new Date(new Date().setDate(n)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getNthMonthLong(n) {
  return new Date(new Date().setMonth(n)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}

function getRangeFromTwoMonth() {
  const currentMonth = new Date().getMonth()
  const nextMonth = new Date(new Date().setMonth(currentMonth + 1))

  const firstDate = new Date(new Date().setDate(10)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const secondDate = new Date(nextMonth.setDate(10)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return { firstDate, secondDate }
}

function getCurrentDate() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  let [currentMonth, currentDay, currentYear] = currentDate.split(' ')
  currentDay = new Date().getDate()
  return { currentDate, currentMonth, currentDay, currentYear }
}

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
//
//     cy.get('.footer .picker').should('exist').should('be.visible')
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar').should('not.exist')
//   })
//
//   it('should emit "open" and "close" emits on calendar toggle', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('input#calendar-input--date')
//       .click()
//       .then(() => {
//         cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'open')
//       })
//
//     cy.get('input#calendar-input--date')
//       .click()
//       .then(() => {
//         cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'close')
//       })
//   })
//
//   it('should render correct current month, weekdays and days', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('input#calendar-input--date').click()
//
//     const { currentMonth, currentDay, currentYear } = getCurrentDate()
//     cy.get('.calendar__controls-month').should('have.text', `${currentMonth} ${currentYear}`)
//     cy.get('.calendar__weekdays li').should('have.length', 7)
//     cy.get('.calendar__days li.--current').should('exist').should('have.text', `${currentDay}`)
//   })
//
//   it('days that are not in the current month should exist', () => {
//     preMount({ ...fixtures.ECalendarProps, isRange: true })
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar__days li.--not-cur-month')
//       .should('exist')
//       .should('be.visible')
//       .should('have.class', '--not-cur-month')
//   })
//
//   it('days that are not in the current month should not be active for Range picker calendar', () => {
//     preMount({ ...fixtures.ECalendarProps, isDouble: true })
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar__days li.--not-cur-month').should('exist').should('be.visible')
//
//     cy.get('.left .calendar__days li').eq(10).click()
//     cy.get('.right .calendar__days li').eq(10).click()
//     cy.get('.calendar__days li.--not-cur-month')
//       .should('have.css', 'background-color')
//       .and('eq', 'rgb(255, 255, 255)')
//
//     cy.get('.calendar__days li.--not-cur-month')
//       .first()
//       .click()
//       .should('not.have.class', '--active')
//   })
//
//   it('should have "filled" class on both date and time inputs on focus and select', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.calendarSelectDateTime()
//     cy.get('.input.left .input-container').should('have.class', 'filled')
//     cy.get('.input.right .input-container').should('have.class', 'filled')
//
//     cy.get('input#calendar-input--date').click().click()
//     cy.get('.input.left .input-container').should('have.class', 'filled')
//     cy.get('.input.right .input-container').should('have.class', 'filled')
//   })
//
//   it('should have "focused" class on on both date and time inputs container on click', () => {
//     preMount(fixtures.ECalendarProps)
//     cy.get('input#calendar-input--date').click()
//     cy.get('.date-inputs').should('have.class', 'focused')
//   })
//
//   it('should not have "doubled" class if there are no time pickers', () => {
//     preMount({ ...fixtures.ECalendarProps, timePicker: null })
//     cy.get('input#calendar-input--date').click()
//     cy.get('.date-inputs').should('not.have.class', 'doubled')
//     cy.get('input#calendar-input--time').should('not.exist')
//   })
//
//   it('should not have "doubled" class if there is a date range select', () => {
//     preMount({ ...fixtures.ECalendarProps, isRange: true })
//     cy.get('input#calendar-input--date').click()
//     cy.get('.date-inputs').should('not.have.class', 'doubled')
//     cy.get('input#calendar-input--time').should('not.exist')
//   })
//
//   it('should have .single class if no time picker', () => {
//     preMount({ ...fixtures.ECalendarProps, timePicker: null })
//     cy.get('.calendar__input').should('have.class', 'single')
//   })
//
//   it('should not have .single class if time pickers exists', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('.input.input--md.calendar__input.left').should('not.have.class', 'single')
//   })
//
//   it('should not have "doubled" class if it is a Double Calendar', () => {
//     preMount({ ...fixtures.ECalendarProps, isDouble: true })
//     cy.get('input#calendar-input--date').click()
//     cy.get('.date-inputs').should('not.have.class', 'doubled')
//   })
// })

describe('Selecting Single Date or Date & Time', () => {
  it('should display one selected date in input and emit value', () => {
    preMount({ ...fixtures.ECalendarProps, timePicker: null })

    const { currentDate } = getCurrentDate()
    cy.get('input#calendar-input--date').click()
    cy.get('.calendar__days li.--current')
      .click()
      .then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:dateValue')

        cy.wrap(new Date(Cypress.vueWrapper.emitted()['update:dateValue'][0]).toISOString()).should(
          'eq',
          new Date(currentDate + ' ' + '07:00').toISOString(),
        )
      })

    cy.get('#calendar-input--date').should('have.value', currentDate)
  })

  it('should display one selected date + time in input and emit value', () => {
    preMount(fixtures.ECalendarProps)

    const { currentDate } = getCurrentDate()

    cy.get('.input-container').should('not.have.class', 'filled')
    cy.get('.input-container').should('not.have.class', 'filled')

    cy.calendarSelectDate().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:dateValue')
    })
    cy.get('.input-container').should('not.have.class', 'filled')
    cy.get('.input-container').should('not.have.class', 'filled')

    cy.calendarSelectTime().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:dateValue')
    })
    cy.get('.input-container').should('have.class', 'filled')
    cy.get('.input-container').should('have.class', 'filled')

    cy.get('#calendar-input--date').should('have.value', currentDate)
    cy.get('#calendar-input--time').should('have.value', '12:05 PM')
  })

  it('should render hours and minutes options for select (12h format)', () => {
    preMount(fixtures.ECalendarProps)
    cy.calendarSelectDate()
    cy.get('.footer .picker .select.select--hours').click()
    cy.get('.dropdown-items .dropdown-item').should('have.length', 12)
    cy.get('.footer .picker .select.select--minutes').click()
    cy.get('.select.select--minutes .dropdown-items .dropdown-item').should('have.length', 60)
  })

  it('should render hours and minutes options for select (24h format)', () => {
    preMount({
      ...fixtures.ECalendarProps,
      timePicker: {
        isAMPM: false,
      },
    })
    // cy.calendarSelectDate()
    // cy.get('.footer .picker .select.select--hours').click()
    // cy.get('.dropdown-items .dropdown-item').should('have.length', 12)
    // cy.get('.footer .picker .select.select--minutes').click()
    // cy.get('.select.select--minutes .dropdown-items .dropdown-item').should('have.length', 60)
  })
  //
  //   it('should allow to select time in 24hours format', () => {
  //     preMount({
  //       ...fixtures.ECalendarProps,
  //       locale: 'en-US',
  //       timePicker: {
  //         isAMPM: false,
  //       },
  //     })
  //
  //     const { currentDate } = getCurrentDate()
  //
  //     cy.calendarSelectDate()
  //     cy.get('.footer .picker .select.select--hours').click()
  //     cy.get('.dropdown-items .dropdown-item').eq(1).click()
  //
  //     cy.get('.footer .picker .select.select--minutes').click()
  //     cy.get('.select.select--minutes .dropdown-items .dropdown-item').eq(5).click()
  //
  //     cy.get('#calendar-input--date').should('have.value', currentDate)
  //     cy.get('#calendar-input--time').should('have.value', '01:05')
  //   })
})
//
// describe('Select Date Range & Time', () => {
//   it('should display selected date range in input', () => {
//     preMount({ ...fixtures.ECalendarProps, timePicker: null, isRange: true })
//
//     const firstOfCurrMonthDate = getNthDay(1)
//     const fifthOfCurrMonthDate = getNthDay(5)
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
//     const firstOfCurrMonthDate = getNthDay(1)
//     const fifthOfCurrMonthDate = getNthDay(5)
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
//   it('should allow to select date range between 2 months (Double calendar)', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isDouble: true,
//     })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar .left .calendar__days li').contains('10').click()
//     cy.get('.calendar .right .calendar__days li').contains('10').click()
//
//     cy.get('.calendar .left .calendar__days li').contains('10').should('have.class', '--active')
//     cy.get('.calendar .right .calendar__days li').contains('10').should('have.class', '--active')
//
//     const { firstDate, secondDate } = getRangeFromTwoMonth()
//
//     cy.get('#calendar-input--date').should('have.value', `${firstDate} - ${secondDate}`)
//   })
//
//   it('should allow to select date range between 2 months (Single calendar)', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isDouble: false,
//       isRange: true,
//     })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar__days li').contains('10').click()
//     cy.get('.calendar__controls-right').click()
//     cy.get('.calendar__days li').contains('10').click()
//
//     const { firstDate, secondDate } = getRangeFromTwoMonth()
//
//     cy.get('#calendar-input--date').should('have.value', `${firstDate} - ${secondDate}`)
//   })
// })
//
// describe('Time Select', () => {
//   it('should disable select time until at least 1 date selected', () => {
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
//
//     cy.get('.calendar__days li').eq(10).click()
//     cy.get('.footer .picker').should('not.have.class', 'disabled')
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
//     cy.calendarSelectDate()
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
//     cy.calendarSelectDate()
//     cy.get('.footer .picker').should('not.have.class', 'disabled')
//
//     cy.get('.select.ampm').should('not.exist')
//   })
// })
//
// describe('Month Select', () => {
//   it('should switch to next month', () => {
//     preMount(fixtures.ECalendarProps)
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__controls-right').should('be.visible').click()
//
//     const currentMonth = new Date().getMonth()
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
//
//     const currentMonth = new Date().getMonth()
//     const prevMonth = new Date(new Date().setMonth(currentMonth - 1)).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//     })
//
//     cy.get('.calendar__controls-month').should('have.text', prevMonth)
//   })
// })
//
// describe('Double calendar', () => {
//   it('should render double calendar', () => {
//     preMount({ ...fixtures.ECalendarProps, isDouble: true })
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar .left').should('exist').should('be.visible')
//     cy.get('.calendar .right').should('exist').should('be.visible')
//
//     cy.get('.calendar .left .calendar__controls-left').should('exist').should('be.visible')
//     cy.get('.calendar .left .calendar__controls-right').should('not.be.visible')
//
//     cy.get('.calendar .right .calendar__controls-left').should('not.be.visible')
//     cy.get('.calendar .right .calendar__controls-right').should('exist').should('be.visible')
//
//     const currentMonthLong = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//     })
//     const nextMonthLong = new Date(
//       new Date().setMonth(new Date().getMonth() + 1),
//     ).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//     })
//
//     cy.get('.calendar .left .calendar__controls-month')
//       .should('exist')
//       .should('be.visible')
//       .should('have.text', currentMonthLong)
//
//     cy.get('.calendar .right .calendar__controls-month')
//       .should('exist')
//       .should('be.visible')
//       .should('have.text', nextMonthLong)
//   })
//
//   it('should always allow to select only date range', () => {
//     preMount({ ...fixtures.ECalendarProps, isDouble: true, isRange: false })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar .left .calendar__days li').contains('10').click()
//     cy.get('.calendar .right .calendar__days li').contains('10').click()
//
//     const { firstDate, secondDate } = getRangeFromTwoMonth()
//     cy.get('#calendar-input--date').should('have.value', `${firstDate} - ${secondDate}`)
//   })
//
//   it('should change month correctly', () => {
//     preMount({ ...fixtures.ECalendarProps, isDouble: true })
//
//     const currMonthNumber = new Date().getMonth()
//
//     const currentMonthLong = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//     })
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar .left').should('be.visible')
//     // initial moths
//     cy.get('.calendar .left .calendar__controls-month').should('have.text', currentMonthLong)
//     cy.get('.calendar .right .calendar__controls-month').should(
//       'have.text',
//       getNthMonthLong(currMonthNumber + 1),
//     )
//
//     // go to next 2 month
//     cy.get('.calendar .right .calendar__controls-right').click()
//     cy.get('.calendar .left .calendar__controls-month').should(
//       'have.text',
//       getNthMonthLong(currMonthNumber + 2),
//     )
//     cy.get('.calendar .right .calendar__controls-month').should(
//       'have.text',
//       getNthMonthLong(currMonthNumber + 3),
//     )
//
//     // go to prev 2 month
//     cy.get('.calendar .left .calendar__controls-left').click().click()
//     cy.get('.calendar .left .calendar__controls-month').should(
//       'have.text',
//       getNthMonthLong(currMonthNumber - 2),
//     )
//     cy.get('.calendar .right .calendar__controls-month').should(
//       'have.text',
//       getNthMonthLong(currMonthNumber - 1),
//     )
//   })
// })
//
// describe('Conditions', () => {
//   it('should display calendar if no input', () => {
//     preMount({ ...fixtures.ECalendarProps, showInput: false })
//     cy.get('input#calendar-input--date').should('not.exist')
//     cy.get('.calendar').should('exist').should('be.visible')
//   })
//   // -----------------------------------------------------
//
//   //todo ?
//   // 7.1 <SelectTime
//   //           v-if="mergedData?.timePicker && !mergedData.isDouble && !mergedData.isRange"
//   //
// })
//
// describe('Preset Values', () => {
//   it('should render preselected date range', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isRange: true,
//       timePicker: null,
//       date: {
//         date_from: '2022-05-26',
//         date_to: '2022-05-28',
//       },
//     })
//
//     const firstDate = new Date('2022-05-26').toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     const secondDate = new Date('2022-05-28').toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//     cy.get('#calendar-input--date').should('have.value', `${firstDate} - ${secondDate}`)
//
//     cy.get('input#calendar-input--date').click()
//
//     cy.get('.calendar__controls-month').should(
//       'have.text',
//       new Date('2022-05-26').toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//       }),
//     )
//     cy.get('.calendar__days li.--active').should('have.length', 2)
//     cy.get('.calendar__days li.--active').first().should('have.text', '26')
//     cy.get('.calendar__days li.--active').last().should('have.text', '28')
//   })
//
//   it('should render preselected date_from', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isRange: false,
//       timePicker: null,
//       date: {
//         date_from: '2022-05-26',
//       },
//     })
//
//     const firstDate = new Date('2022-05-26').toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.get('#calendar-input--date').should('have.value', firstDate)
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__controls-month').should(
//       'have.text',
//       new Date('2022-05-26').toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//       }),
//     )
//     cy.get('.calendar__days li.--active').should('have.text', '26')
//   })
//
//   it('should render preselected date_from and 12h time', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isRange: false,
//       timePicker: {
//         isAMPM: true,
//       },
//       date: {
//         date_from: '2022-05-26T07:39:18.036Z',
//       },
//     })
//
//     const inputDate = new Date('2022-05-26T07:39:18.036Z').toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//     const inputTime = new Date('2022-05-26T07:39:18.036Z').toLocaleTimeString('en-US', {
//       hour12: true,
//       hour: '2-digit',
//       minute: '2-digit',
//     })
//
//     cy.get('#calendar-input--date').should('have.value', inputDate)
//     cy.get('#calendar-input--time').should('have.value', inputTime)
//   })
//
//   it('should render preselected date and 24h time', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isRange: false,
//       timePicker: {
//         isAMPM: false,
//       },
//       date: {
//         date_from: '2022-05-26T07:39:18.036Z',
//       },
//     })
//
//     const inputDate = new Date('2022-05-26T07:39:18.036Z').toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//     const inputTime = new Date('2022-05-26T07:39:18.036Z').toLocaleTimeString('en-US', {
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit',
//     })
//
//     cy.get('#calendar-input--date').should('have.value', inputDate)
//     cy.get('#calendar-input--time').should('have.value', inputTime)
//   })
//
//   it('should render preselected prev date', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isRange: false,
//       timePicker: null,
//       date: {
//         date_from: '2021-05-26',
//       },
//     })
//
//     const firstDate = new Date('2021-05-26').toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.get('#calendar-input--date').should('have.value', firstDate)
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__controls-month').should(
//       'have.text',
//       new Date('2021-05-26').toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//       }),
//     )
//     cy.get('.calendar__days li.--active').should('have.text', '26')
//   })
//
//   it('should render preselected next date', () => {
//     preMount({
//       ...fixtures.ECalendarProps,
//       isRange: false,
//       timePicker: null,
//       date: {
//         date_from: '2031-05-26',
//       },
//     })
//
//     const firstDate = new Date('2031-05-26').toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//
//     cy.get('#calendar-input--date').should('have.value', firstDate)
//
//     cy.get('input#calendar-input--date').click()
//     cy.get('.calendar__controls-month').should(
//       'have.text',
//       new Date('2031-05-26').toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//       }),
//     )
//     cy.get('.calendar__days li.--active').should('have.text', '26')
//   })
// })
// ------- Calendar Emits -------
// 1. close calendar: this.$emit('close')
// 2. open calendar: this.$emit('open', this.isOpen)

// ------- Days Emits -------
// 2. @mouseenter="$emit('mouse-enter', date)" (on Day hover)
