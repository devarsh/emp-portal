import React, { Component } from 'react';
import { connect } from 'react-redux'
import employeeAction from 'actions'

const fetchEmployee = employeeAction.fetchEmployee

import MyProfile from './myProfile'

class Employee extends Component {

  componentWillMount() {
    const { dispatch, load } = this.props
    dispatch(load('123'))
  }
  render() {
    let RenderedElement
    const { isFetching, isInvalid, err, data  } = this.props

    if (isFetching) {
      RenderedElement = (<div> Loading... </div>)
    }
    else if (!isFetching && isInvalid && err ) {
      RenderedElement = (<div> Error...</div>)
    }
    else if(!isFetching && !isInvalid && data) {
      RenderedElement = (<MyProfile data={data} />)
    } else {
      RenderedElement = null
    }
    return RenderedElement
  }
}

const mapStateToProps = ({employee}) => {
  return { ...employee }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, load: fetchEmployee
  }
}

Employee = connect(mapStateToProps, mapDispatchToProps)(Employee)

export default Employee
