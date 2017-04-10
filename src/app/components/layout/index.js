import React, { Component } from 'react';
import { Layout, NavDrawer, Panel } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Employee from 'components/employee'
import LeftNav from 'components/leftNav'
import { Route } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

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
          <div style={{display:'flex'}}>
            <div style={{flex:1, margin:'20px'}} className="container">
                <Row>
                  <Col md={12}>
                    <Route path="/myProfile" component={Employee}/>
                    <Route path="/companyPolicy" component={()=> <div>Company policy</div>}/>
                    <Route path="/leaveRequest" component={()=> <div>Leave Request</div>}/>
                    <Route path="/downloads" component={()=> <div>Download</div>}/>
                  </Col>
                </Row>

            </div>
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default LayoutExample
