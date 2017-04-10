import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from 'actions/auth'
import AuthForm from './authForm.js'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = (name,value) => {
    this.setState({[name]:value})
  }
  handleSubmit = (e) => {
    const { dispatch } = this.props
    dispatch(login(this.state.username, this.state.password))
  }
  render() {
    const { currentlySending, loggedIn, errorMsg } = this.props
    const renderComponent = loggedIn ? <Redirect to={{ pathname: '/' }}/> : <AuthForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        currentlySending = {currentlySending}
        errorMsg = {errorMsg}
        username = {this.state.username}
        password = {this.state.password}
      />
    return renderComponent
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth })
const mapDispatchToProps = (dispatch) => ({ dispatch })

Login = connect(mapStateToProps,mapDispatchToProps)(Login)

export default Login
