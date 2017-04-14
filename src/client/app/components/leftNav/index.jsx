/* eslint-disable import/no-mutable-exports*/
import React, { Component, PropTypes as P } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

let LeftNav = class LeftNav extends Component {
  static contextTypes = {
    router: P.shape({
      history: P.shape({
        push: P.func.isRequired,
        replace: P.func.isRequired,
        createHref: P.func.isRequired,
      }).isRequired
    }).isRequired
  }
  static propTypes = {
    dispatch: P.func.isRequired
  }
  state = {
    active: true
  }
  componentWillMount() {
    const { history } = this.context.router
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange)
    this.handleLocationChange(history.location)
  }
  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory()
  }
  handleLocationChange = (location) => {
    const { pathname } = location;
    if (pathname === '/myProfile') {
      this.setState({ active: 1 })
    } else if (pathname === '/companyPolicy') {
      this.setState({ active: 2 })
    } else if (pathname === '/leaveRequest') {
      this.setState({ active: 3 })
    } else if (pathname === '/downloads') {
      this.setState({ active: 4 })
    }
  }

  render() {
    const { dispatch } = this.props

    return (
      <Nav bsStyle="pills" activeKey={this.state.active} onSelect={this.handleSelect} stacked >
        <NavItem eventKey={1} onClick={() => dispatch(push('/myProfile'))}>My Profile</NavItem>
        <NavItem eventKey={2} onClick={() => dispatch(push('/companyPolicy'))}>Company Policy</NavItem>
        <NavItem eventKey={3} onClick={() => dispatch(push('/leaveRequest'))}>Leave Request</NavItem>
        <NavItem eventKey={4} onClick={() => dispatch(push('/downloads'))}>Downloads</NavItem>
      </Nav>
    )
  }
}


const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({ dispatch })

LeftNav = connect(mapStateToProps, mapDispatchToProps)(LeftNav)

export default LeftNav

