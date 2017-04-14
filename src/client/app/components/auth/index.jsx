/* eslint-disable import/no-mutable-exports, react/forbid-prop-types*/
import AuthForm from './authForm'
import React, { Component, PropTypes as P } from 'react'
import { connect } from 'react-redux'
import { login } from 'actions/auth'
import { Redirect } from 'react-router-dom'

let Login = class Login extends Component {
  static propTypes = {
    currentlySending: P.bool.isRequired,
    loggedIn: P.bool.isRequired,
    errorMsg: P.string,
    dispatch: P.func.isRequired,
    location: P.object
  }
  static defaultProps = {
    errorMsg: ''
  }
  state = {
    username: '',
    password: ''
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }
  handleSubmit = () => {
    const { dispatch } = this.props
    dispatch(login(this.state.username, this.state.password))
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { currentlySending, loggedIn, errorMsg } = this.props
    const renderComponent = loggedIn ? <Redirect to={from} /> : (
      <AuthForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        currentlySending={currentlySending}
        errorMsg={errorMsg}
        username={this.state.username}
        password={this.state.password}
      />
    )
    return renderComponent
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth })
const mapDispatchToProps = dispatch => ({ dispatch })

Login = connect(mapStateToProps, mapDispatchToProps)(Login)

export default Login
