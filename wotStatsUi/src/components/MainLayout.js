import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PlayerStatsTab from './tabs/PlayerStatsTab.js';

class MainLayout extends Component {
  render() {
    return (
      <div className="container">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Player" className="clearfix">
            <PlayerStatsTab />
          </Tab>
          <Tab eventKey={2} title="Tanks">
            Coming coon ...
          </Tab>
          <Tab eventKey={3} title="Tank details">
            Coming coon ...
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default MainLayout;