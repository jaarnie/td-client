import moment from 'moment'
import { upperFirst } from 'lodash'

export const getFormattedDateTime = (datetime) => {
  return moment(datetime).format('LLLL')
}

export const getTime = (datetime) => {
  const dateArray = new Date(datetime).toString().split(' ')
  return dateArray.slice(4, 5).toString().split(':').slice(0, 2).join(':')
}

export const sortByRecent = (entries) => {
  return entries.sort(
    (a, b) => moment(b.user_entry_datetime) - moment(a.user_entry_datetime)
  )
}

export const sortIntoWeek = (entries) => {}

export const upperCaseFirst = (string) => {
  return upperFirst(string)
}
