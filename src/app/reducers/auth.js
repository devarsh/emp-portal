import { AUTH } from 'constants/redux'
import auth from 'utils/auth'

const { SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } = AUTH


const initialState = {
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  errorMsg: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_REQUEST:
      return {
        ...state,
        currentlySending: action.sending,
      }
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: action.message,
      }
    case SET_AUTH:
      return {
        ...state,
        loggedIn: action.newState
      }
    default:
      return state;
  }
}

export default user

