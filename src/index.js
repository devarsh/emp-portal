import {render} from 'react-dom'
import React from 'react'

import { AppContainer } from 'react-hot-loader'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose } from 'redux'

import {Reducers} from 'reducers'

import Demo from 'components/employee'

const dest =  document.getElementById('container')


const logger = createLogger()
let initailState = undefined
let store
let renderApp

if (!__DEV__) {
  store = ( window.devToolsExtension ?
  window.devToolsExtension()(createStore) :
  createStore)(Reducers, initailState, applyMiddleware(thunk,logger))
} else {
  store = createStore(
    Reducers,
    initailState,
    compose(
      applyMiddleware(thunk ,logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}

const AppRender = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Demo/>
      </Provider>
    </AppContainer>,
    dest
  )
}

AppRender(Demo)

if (module.hot) {
  module.hot.accept('components/employee', () => { AppRender(Demo) })
}


/*
if(!!process.env.NODE_ENV && process.env.NODE_ENV != 'production') {

  const renderApp1 = renderApp
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    render(<RedBox error={error} className="redbox"/>, dest)
  }
  console.log(renderApp1, renderError)
  renderApp = () => {
    try {
      renderApp1()
    } catch(error) {
      renderError(error)
    }
  }
}
*/

