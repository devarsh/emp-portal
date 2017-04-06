import React, { Component, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import  SubNav  from 'utils/SubNav'

class LeftNav extends Component {
  state = {
    active: true
  }
  handleSelect = (currSelect) => {
    this.setState({active: currSelect})
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired,
      }).isRequired
    }).isRequired
  }
  handleLocationChange = location => {
    const { pathname } = location;
    if (pathname == '/myProfile') {
      this.setState({active: 1})
    } else if (pathname == '/companyPolicy') {
      this.setState({active: 2})
    } else if (pathname == '/leaveRequest') {
      this.setState({active: 3})
    } else if (pathname == '/downloads') {
      this.setState({active: 4})
    }
  }

  componentWillMount() {
    const {  history } = this.context.router
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange)
    this.handleLocationChange(history.location)
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory()
  }

  render() {
    const { dispatch } = this.props

    return (
      <Nav bsStyle="pills" activeKey={this.state.active} onSelect={this.handleSelect} stacked >
        <NavItem eventKey={1}  onClick={()=> dispatch(push('/myProfile'))}>My Profile</NavItem>
        <NavItem eventKey={2}  onClick={()=> dispatch(push('/companyPolicy'))}>Company Policy</NavItem>
        <NavItem eventKey={3}  onClick={()=> dispatch(push('/leaveRequest'))}>Leave Request</NavItem>
        <NavItem eventKey={4}  onClick={()=> dispatch(push('/downloads'))}>Downloads</NavItem>
      </Nav>
    )
  }
}


const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => ({ dispatch })

LeftNav = connect(mapStateToProps,mapDispatchToProps)(LeftNav)

export default LeftNav

