import { EMPLOYEE } from 'constants/redux'
const { REQUEST, RECIEVE, INVALIDATE } = EMPLOYEE

const initialState = {
  isFetching: false,
  isInvalid: false,
  data: null,
  err: null
}

const employee = ( state = initialState, action )  => {
  switch(action.type) {
    case EMPLOYEE.REQUEST:
      return { ...state,
        isFetching:true,
        initialState: false
      }
    case EMPLOYEE.RECIEVE:
      return { ...state,
        isFetching:false,
        isInvalid: false,
        data: action.data,
        recievedAt: Date.now(),
        err: null }
    case EMPLOYEE.INVALIDATE:
      return { ...state,
        isInvalid: true,
        isFetching: false,
        err: action.err }
    default: {
      return state;
    }
  }
}

export default employee
