import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import employee from './employee.js'
import auth from './auth'

const Reducers =
combineReducers({
  auth,
  employee,
  form: formReducer,
  router: routerReducer
})

export default Reducers
