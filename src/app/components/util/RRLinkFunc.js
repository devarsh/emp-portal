import React, {Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

class Decorated extends React.Component {
  constructor(props,context) {
    super(props,context)
    this.state = {active: false}
  }
  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    children: React.PropTypes.func.isRequired,
  };

  resolveToLocation = to => {
    return typeof to === 'object' ? to['pathname'] : to
  }

  isActive = (toLocation, nextProps) => {
    const currProps = nextProps || this.props
    const { location, to } = currProps
    return toLocation == location.pathname
  }
  handleClick = event => {
    const { dispatch } = this.props
    event.preventDefault();
    const { to } = this.props;
    dispatch(push(to))
    this.setState({active: this.isActive(to)})
  }

  componentWillMount() {
    const { to } = this.props;
    this.setState({active: this.isActive(to)})
  }
  componentWillReceiveProps(nextProps) {
    const { to } = this.props;
    if (this.state.active != this.isActive(to,nextProps)) {
      this.setState({active: this.isActive(to,nextProps)})
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.active != nextState.active
  }
  render () {
    const { activeClassName, className, to,  ...rest } = this.props;
    const toLocation = this.resolveToLocation(to);
    return this.props.children(toLocation,this.handleClick,this.state.active)
  }
}

Decorated = withRouter(Decorated)

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

Decorated = connect(mapStateToProps, mapDispatchToProps)(Decorated)

export default Decorated
