/* eslint-disable react/forbid-prop-types, react/require-default-props, import/no-mutable-exports */
import MyProfile from './myProfile'
import employeeAction from 'actions'
import React, { Component, PropTypes as P } from 'react';
import { connect } from 'react-redux'

const fetchEmployee = employeeAction.fetchEmployee

let Employee = class Employee extends Component {
  static propTypes = {
    dispatch: P.func.isRequired,
    load: P.func.isRequired,
    isFetching: P.bool.isRequired,
    isInvalid: P.bool.isRequired,
    data: P.object,
    err: P.object
  }
  componentWillMount() {
    const { dispatch, load } = this.props
    dispatch(load('123'))
  }
  render() {
    let RenderedElement
    const { isFetching, isInvalid, err, data } = this.props

    if (isFetching) {
      RenderedElement = (<div> Loading... </div>)
    } else if (!isFetching && isInvalid && err) {
      RenderedElement = (<div> Error...</div>)
    } else if (!isFetching && !isInvalid && data) {
      RenderedElement = (<MyProfile data={data} />)
    } else {
      RenderedElement = null
    }
    return RenderedElement
  }
}


const mapStateToProps = ({ employee }) => ({ ...employee })

const mapDispatchToProps = dispatch => ({ dispatch, load: fetchEmployee })

Employee = connect(mapStateToProps, mapDispatchToProps)(Employee)

export default Employee
