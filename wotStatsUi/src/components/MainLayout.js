import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PlayerStatsTab from './tabs/PlayerStatsTab.js';
import PlayerTankStatsTab from './tabs/PlayerTankStatsTab.js';

export default class MainLayout extends Component {
  render() {
    return (
      <div className="container">
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Player" className="clearfix">
            <PlayerStatsTab />
          </Tab>
          <Tab eventKey={2} title="Tanks" className="clearfix">
            <PlayerTankStatsTab />
          </Tab>
        </Tabs>
      </div>
    );
  }
}