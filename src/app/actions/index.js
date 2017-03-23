import { EMPLOYEE } from 'constants'

var fetchMock = require('fetch-mock')

if(__DEV__) {
  const delay = new Promise((res, rej) => setTimeout(res, 3000))
  const dob = new Date(1990, 0, 30) //year, month, date i.e month starts from zero
  fetchMock.mock(/(http:\/\/localhost:8081\/employee)[/.-\w\d]*/,
  delay.then(() =>({
    fullName: 'Devarsh Muktesh Shah',
    nickName: 'Devarsh',
    gender: 'Male',
    birthDate : dob,
    bloodGroup: 'O+',
    maritialStatus: 'UnMarried',
    address: {
      permanent : {
        street1: 'B-802 Retreat Tower, Opp Shyamal Voltas',
        street2: 'Shyamal Cross Road, Satellite',
        area: 'Satellite',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        pincode:'380015',
      },
      current: {
        street1: 'B-802 Retreat Tower, Opp Shyamal Voltas',
        street2: 'Shyamal Cross Road, Satellite',
        area: 'Satellite',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        pincode:'380015',
      }
    }
  })))
} else {
  fetchMock.restore()
}

const requestMaker = (parameter, successCb, failureCb) => {
  const url = `http://localhost:8081/employee/${parameter}`
  let fpromise = fetch(url)
  .then(data => data.json())
  .then(json => {
    let fetchedEmployee = json
    successCb(fetchedEmployee)
  })
  fpromise.catch(e => failureCb(e))
}

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

