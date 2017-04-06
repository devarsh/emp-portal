import {combineReducers} from 'redux'

import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import employee  from './employee.js'


export const Reducers = combineReducers({ employee, form: formReducer, router: routerReducer })
