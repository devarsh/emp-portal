import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginComponent from 'components/auth'
import LayoutComponent from 'components/layout'


class App extends Component {
  render() {
    const { loggedIn } = this.props
    return (
      <Switch>
        <Route path="/login" component={LoginComponent}/>
        <PrivateRoute path="/" component={LayoutComponent} isAuthenticated={loggedIn}  />
      </Switch>
    );
  }
}

const mapStateToProps = ({ auth, router }) => ({ ...auth, ...router })
const mapDispatchToProps = (dispatch) => ({ dispatch })

App = connect(mapStateToProps,mapDispatchToProps)(App)


const PrivateRoute = ({ redirect, isAuthenticated ,component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
      }}/>
    )
  )}/>
)

export default App
