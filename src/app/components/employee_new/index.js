import React, { Component } from 'react';
import PersonalInfo from './personal'
import { connect } from 'react-redux'
import { reduxForm, FormSection } from 'redux-form'
import { fetchEmployee } from 'actions'

class Employee extends Component {
  componentWillMount() {
    const { dispatch, load } = this.props
    dispatch(load('123'))
  }
  render() {
    const { isFetching, isInvalid, err,data  } = this.props
    let RenderedElement
    if (isFetching) {
      RenderedElement = (<div> Loading... </div>)
    }
    else if (!isFetching && isInvalid && err ) {
      RenderedElement = (<div>{ err.toString() }</div>)
    }
    else {
      RenderedElement = (<PersonalInfo data={data}/>)
    }
    return (
      <div>
        {RenderedElement}
      </div>
    );
  }
}


const mapStateToProps = ({employee}) => employee


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, load: fetchEmployee
  }
}

Employee = connect(mapStateToProps, mapDispatchToProps)(Employee)

export default Employee
