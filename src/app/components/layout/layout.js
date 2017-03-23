import React, { Component } from 'react';
import { Layout, NavDrawer, Sidebar, Panel } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { List, ListItem } from 'react-toolbox/lib/list';
import Employee from 'components/employee/employee.js'

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
          <List selectable ripple>
            <ListItem caption='My Profile'/>
            <ListItem caption='Company Policy'/>
            <ListItem caption='Leave Request'/>
            <ListItem caption='Downloads'/>
          </List>
        </NavDrawer>
        <AppBar
          fixed
          leftIcon='menu'
          onLeftIconClick={this.handleToggle.bind(this, 'sideNavActive')}
          title="Acute Employee Portal"
        />
        <Panel bodyScroll={this.state.bodyScrolled}>
        <Employee/>
        </Panel>
      </Layout>
    );
  }
}

export default LayoutExample
