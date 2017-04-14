/* eslint-disable no-else-return */
import { EMPLOYEE } from 'constants/redux'

const { REQUEST, RECIEVE, INVALIDATE } = EMPLOYEE

export const requestEmployee = employee => ({
  type: REQUEST,
  employee
})

export const recieveEmployee = data => ({
  type: RECIEVE,
  data
})

export const invalidateEmployee = err => ({
  type: INVALIDATE,
  err
})

const requestMaker = (parameter, successCb, failureCb) => {
  const url = `http://localhost:8081/employee/${parameter}`
  fetch(url)
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    } else {
      const err = new Error(response.statusText)
      err.response = response
      failureCb(err)
      throw err
    }
  })
  .then(json => successCb(json))
  .catch((err) => {
    console.log('request failed', err)
  })
}

export const fetchEmployee = employee => (dispatch) => {
  dispatch(requestEmployee(employee))
  requestMaker(
    employee,
    details => dispatch(recieveEmployee(details)),
    err => dispatch(invalidateEmployee(err))
  )
}

