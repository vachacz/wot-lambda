import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PlayerStatsTab from './tabs/PlayerStatsTab.js';
import PlayerTanksTab from './tabs/PlayerTanksTab.js';
import PlayerTankStatsTab from './tabs/PlayerTankStatsTab.js';

export default class MainLayout extends Component {
  render() {
    return (
      <div className="container">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Player" className="clearfix">
            <PlayerStatsTab />
          </Tab>
          <Tab eventKey={2} title="Tanks" className="clearfix">
            <PlayerTanksTab />
          </Tab>
          <Tab eventKey={3} title="Tank stats" className="clearfix">
            <PlayerTankStatsTab />
          </Tab>
        </Tabs>
      </div>
    );
  }
}