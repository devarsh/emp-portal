import { AUTH } from 'constants/redux'
import * as errorMsgs from 'constants/app'
import auth from 'utils/auth'

const { SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } = AUTH

const sendingRequest = sending => ({
  type: SENDING_REQUEST,
  sending
})

const setErrorMsg = error => ({
  type: SET_ERROR_MESSAGE,
  message: error
})

const setAuthState = state => ({
  type: SET_AUTH,
  newState: state
})

/* eslint-disable no-restricted-syntax */
const anyElementsEmpty = (elements) => {
  for (const elem in elements) {
    if (!elements[elem]) {
      return true
    }
  }
  return false
}
/* eslint-enable no-restricted-syntax */


export const login = (username, password) => (dispatch) => {
  dispatch(sendingRequest(true))
  if (anyElementsEmpty({ username, password })) {
    dispatch(setErrorMsg(errorMsgs.FIELD_MISSING))
    dispatch(sendingRequest(false))
    return;
  }
  auth.login(username, password, ((isLoggedIn, error) => {
    if (isLoggedIn) {
      dispatch(sendingRequest(false))
      dispatch(setAuthState(isLoggedIn))
      if (isLoggedIn === true) {
        dispatch(setErrorMsg(errorMsgs.CLEAR_MSG))
      }
    } else {
      dispatch(sendingRequest(false))
      switch (error.type) {
        case 'user-doesnt-exist':
          dispatch(setErrorMsg(errorMsgs.USER_NOT_FOUND))
          return
        case 'password-wrong':
          dispatch(setErrorMsg(errorMsgs.WRONG_PASSWORD))
          return
        default:
          dispatch(setErrorMsg(errorMsgs.GENERAL_ERROR))
      }
    }
  }))
}

export const logout = () => (dispatch) => {
  dispatch(sendingRequest(true));
  /* eslint-disable no-unused-vars*/
  auth.logout((success, err) => {
    if (success === true) {
      dispatch(sendingRequest(false))
      dispatch(setAuthState(false));
    } else {
      dispatch(setErrorMsg(errorMsgs.GENERAL_ERROR))
    }
  })
  /* eslint-enable no-unused-vars*/
}


export const register = (username, password) => (dispatch) => {
  dispatch(sendingRequest(true))
  if (anyElementsEmpty({ username, password })) {
    dispatch(setErrorMsg(errorMsgs.FIELD_MISSING))
    dispatch(sendingRequest(false))
    return;
  }
  auth.register(username, password, (success, error) => {
    dispatch(sendingRequest(false))
    dispatch(setAuthState(success))
    dispatch(setErrorMsg(errorMsgs.CLEAR_MSG))
    if (!success) {
      switch (error.type) {
        case 'username-exists':
          dispatch(setErrorMsg(errorMsgs.USERNAME_TAKEN))
          return
        default:
          dispatch(setErrorMsg(errorMsgs.GENERAL_ERROR))
      }
    }
  })
}
