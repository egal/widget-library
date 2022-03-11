// @ts-ignore
import { ISODate } from '@/components/calendar/Calendar.vue'

export const addLeadingZeros = (str: string): string => {
  if (str.length < 2) {
    return '0' + str
  }
  return str
}

export const capitalize = (word: string): string => {
  return word.split('').shift()?.toUpperCase() + word.slice(1) + ''
}

export const isDateInCurMonth = (date: ISODate | Date, curMonth: ISODate | Date): boolean => {
  return new Date(date).getMonth() === new Date(curMonth).getMonth()
}

export const formatToISODate = (el: Date): ISODate => {
  return el.toISOString().slice(0, 10) as ISODate
}

export const formatAMPM = (timeStr: string): string => {
  const [time, modifier] = timeStr.split(' ')
  let hours = time.split(':')[0]
  const minutes = time.split(':')[1]
  if (hours === '12') {
    hours = '00'
  }
  if (modifier === 'PM') {
    hours = `${parseInt(hours, 10) + 12}`
  }
  return `${hours}:${minutes}`
}
