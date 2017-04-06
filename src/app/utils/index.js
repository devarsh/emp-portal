const Months = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
]

export const dateToDateString = (jsonDateStr) => {
  let newDate = new Date(jsonDateStr)
  return `${newDate.getDate()}-${Months[newDate.getMonth()]}-${newDate.getFullYear()}`
}
