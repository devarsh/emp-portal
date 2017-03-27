import {render} from 'react-dom'
import React from 'react'

import { AppContainer } from 'react-hot-loader'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { ConnectedRouter, routerMiddleware as _routerMiddleware } from 'react-router-redux'

import {Reducers} from 'reducers'

import createHistory from 'history/createBrowserHistory'

import Demo from 'components/layout'

const dest =  document.getElementById('container')


const logger = createLogger()
const history = createHistory()
const routerMiddleware = _routerMiddleware(history)

let initailState = undefined
let store
let renderApp

if (__DEV__) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  store = createStore(
    Reducers,
    initailState,
    composeEnhancer(applyMiddleware(thunk,logger,routerMiddleware)))
} else {
  store = createStore(
    Reducers,
    initailState,
    applyMiddleware(thunk ,logger, routerMiddleware)
  )
}

const AppRender = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component/>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    dest
  )
}

if (module.hot) {
  module.hot.accept('components/layout', () => { AppRender(Demo) })
}

AppRender(Demo)
