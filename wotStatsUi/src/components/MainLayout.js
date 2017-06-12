import React, { Component } from 'react';
import { connect } from "react-redux"
import { Route, Switch } from 'react-router-dom'

import { selectPlayer } from '../actions/playerActions.js';

import NavTab from '../components/util/NavTab.js';
import PlayerStatsTab from '../components/tabs/PlayerStatsTab.js';
import PlayerTanksTab from '../components/tabs/PlayerTanksTab.js';
import PlayerTankStatsTab from '../components/tabs/PlayerTankStatsTab.js';

class MainLayout extends Component {

  componentWillMount() {
    this.props.selectPlayer(this.props.match.params.accountId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.accountId !== this.props.match.params.accountId) {
      this.props.selectPlayer(this.props.match.params.accountId)
    }
  }

  render() {
    let { accountId, match } = this.props;
    return (
      <div className="container">

        <ul className="nav nav-tabs">
          <NavTab to={ `/player/${accountId}/stats` }>Player</NavTab>
          <NavTab to={ `/player/${accountId}/tanks` }>Tanks</NavTab>
          <NavTab to={ `/player/${accountId}/tank` }>Tank stats</NavTab>
        </ul>

        <div className="tab-content">
          <Switch>
            <Route path={ `${match.url}/stats` } component={PlayerStatsTab}/>
            <Route path={ `${match.url}/tanks` } component={PlayerTanksTab}/>
            <Route path={ `${match.url}/tank` } component={PlayerTankStatsTab}/>
            <Route path={ `${match.url}/tank/:tank` } component={PlayerTankStatsTab}/>
          </Switch>
        </div>

      </div>
    );
  }
}

export default connect(
  (store) => ({ accountId: store.players.accountId }),
  { selectPlayer }
)(MainLayout);
