import {combineReducers} from 'redux'
import {EMPLOYEE} from 'constants'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

const employee = ( state={
                isFetching: false,
                isInvalid: false,
                data: {},
                err: null }, action )  => {
  switch(action.type) {
    case EMPLOYEE.REQUEST: {
      return { ...state, isFetching:true }
    }
    case EMPLOYEE.RECIEVE: {
      return { ...state,
          isFetching:false,
          isInvalid: false,
          data: action.data,
          recievedAt: Date.now(),
          err: null }
    }
    case EMPLOYEE.INVALIDATE: {
      return { ...state,
        isInvalid: true,
        isFetching: false,
        err: action.err }
    }
    default: {
      return state;
    }
  }
}

export const Reducers = combineReducers({employee, form: formReducer, router: routerReducer })
