/* eslint-disable import/no-mutable-exports,
react/prefer-stateless-function, react/forbid-prop-types */
import React, { Component, PropTypes as P } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginComponent from 'components/auth'
import LayoutComponent from 'components/layout'

let App = class App extends Component {
  static propTypes = {
    loggedIn: P.bool.isRequired
  }
  render() {
    const { loggedIn } = this.props
    return (
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <PrivateRoute path="/" component={LayoutComponent} isAuthenticated={loggedIn} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ auth, router }) => ({ ...auth, ...router })
const mapDispatchToProps = dispatch => ({ dispatch })

App = connect(mapStateToProps, mapDispatchToProps)(App)


const PrivateRoute = ({ isAuthenticated, component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? (React.createElement(component, props)) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    ))}
  />
)
PrivateRoute.propTypes = {
  isAuthenticated: P.bool.isRequired,
  component: P.oneOfType([P.element, P.node, P.func]).isRequired,
  location: P.object
}

export default App
