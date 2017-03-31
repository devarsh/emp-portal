import React, { Component } from 'react';
import { Layout, NavDrawer, Panel } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Employee from 'components/employee'
import LeftNav from 'components/leftNav'
import {
  Route
} from 'react-router-dom'

class LayoutExample extends Component {
  state = {
    bodyScrolled: true,
    sideNavActive: false,
    sideNavPinned: false,
    sideNavClipped: true,
  };

  handleToggle = param => {
    this.setState({ [param]: !this.state[param] });
  }
  render () {
    const { sideNavActive } = this.state;
    return (
      <Layout>
        <NavDrawer
          active={sideNavActive}
          clipped={this.state.sideNavClipped}
          onOverlayClick={this.handleToggle.bind(this, 'sideNavActive')}
          permanentAt="md"
          pinned={this.state.sideNavPinned}
        >
         <LeftNav/>
        </NavDrawer>
        <AppBar
          fixed
          leftIcon='menu'
          onLeftIconClick={this.handleToggle.bind(this, 'sideNavActive')}
          title="Acute Employee Portal"
        />
        <Panel bodyScroll={this.state.bodyScrolled}>
          <Route path="/myProfile" component={() => <div>Employee</div>}/>
          <Route path="/companyPolicy" component={()=> <div>Company policy</div>}/>
          <Route path="/leaveRequest" component={()=> <div>Leave Request</div>}/>
          <Route path="/downloads" component={()=> <div>Download</div>}/>
        </Panel>
      </Layout>
    );
  }
}

export default LayoutExample
