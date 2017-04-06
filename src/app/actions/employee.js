import { EMPLOYEE } from 'constants'

export const requestEmployee = (employee) => {
  return {
    type: EMPLOYEE.REQUEST,
    employee
  }
}

export const recieveEmployee = (data) => {
  return {
    type: EMPLOYEE.RECIEVE,
    data
  }
}

export const invalidateEmployee = (err) => {
  return {
    type: EMPLOYEE.INVALIDATE,
    err
  }
}

const requestMaker = (parameter, successCb, failureCb) => {
  const url = `http://localhost:8081/employee/${parameter}`
  let fpromise = fetch(url)
  .then(response => {
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
  .catch(err => {
    console.log('request failed', err)
  })
}

export const fetchEmployee = (employee) => {
  return (dispatch, getState) => {
    dispatch(requestEmployee(employee))
    requestMaker(
      employee,
      (details)=> dispatch(recieveEmployee(details)),
      (err) => dispatch(invalidateEmployee(err))
    )
  }
}