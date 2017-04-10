import React from 'react';
import {Form, FormGroup, Col, Button, ControlLabel, FormControl, HelpBlock, Panel} from 'react-bootstrap'

const AuthForm = (props) => {
  const { handleChange, handleSubmit, currentlySending, errorMsg, username, password } = props
  let validationState=null
  if (errorMsg != null) {
    validationState="error"
  }
  return (

    <div className="loginFlexContainer">
      <div className="loginFlex">
        <Panel header="Employee Portal - Login">
          <Form horizontal onSubmit={(event) => {
              event.preventDefault()
              handleSubmit()
            }
          }>
            <FormGroup controlId="username" validationState={validationState}>
              <Col componentClass={ControlLabel} sm={2} >
                Email
              </Col>
              <Col sm={10}>
                <FormControl
                  readOnly={currentlySending}
                  type="username"
                  placeholder="Email"
                  value={username}
                  name="username"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="password" validationState={validationState}>
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl
                  readOnly={currentlySending}
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Col>
            </FormGroup>
            <Col smOffset={2} sm={10}>
              {errorMsg ? <HelpBlock>{errorMsg}</HelpBlock> : null }
            </Col>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" disabled={currentlySending}>
                  {!currentlySending ? "Sign In" : "Signing In..."}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    </div>
  )
}

export default AuthForm
