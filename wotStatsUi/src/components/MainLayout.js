import React, { Component } from 'react';
import { connect } from "react-redux"

import { selectActiveTab } from '../actions/mainAppActions.js';

import { Tabs, Tab } from 'react-bootstrap';
import PlayerStatsTab from './tabs/PlayerStatsTab.js';
import PlayerTanksTab from './tabs/PlayerTanksTab.js';
import PlayerTankStatsTab from './tabs/PlayerTankStatsTab.js';

class MainLayout extends Component {
  render() {
    return (
      <div className="container">
        <Tabs id="wotstats-tabs" activeKey={this.props.activeTab} onSelect={(tab) => this.props.selectActiveTab(tab)}>
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

export default connect(
  (store) => ({ activeTab: store.mainApp.activeTab }),
  { selectActiveTab }
)(MainLayout);