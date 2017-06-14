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
    if (this.props.initialStateLoaded) {
      this.props.selectPlayer(this.props.match.params.accountId)
    }
  }

  componentWillReceiveProps(nextProps) {
    let accountIdHasChanged = nextProps.match.params.accountId !== this.props.match.params.accountId;
    let initialStateLoaded = !this.props.initialStateLoaded && nextProps.initialStateLoaded;

    if (accountIdHasChanged || initialStateLoaded) {
      this.props.selectPlayer(nextProps.match.params.accountId)
    }
  }

  render() {
    let { match } = this.props;
    let { accountId } = match.params;
    let tankIdParam = this.props.tankId ? "/" + this.props.tankId : "";

    return (
      <div className="container">

        <ul className="nav nav-tabs">
          <NavTab to={ `/player/${accountId}/stats` }>Player</NavTab>
          <NavTab to={ `/player/${accountId}/tanks` }>Tanks</NavTab>
          <NavTab to={ `/player/${accountId}/tank${tankIdParam}` }>Tank stats</NavTab>
        </ul>

        <div className="tab-content">
          <Switch>
            <Route path="/player/:accountId/stats" component={PlayerStatsTab}/>
            <Route path="/player/:accountId/tanks" component={PlayerTanksTab}/>
            <Route path="/player/:accountId/tank/:tankId?" component={PlayerTankStatsTab}/>
          </Switch>
        </div>

      </div>
    );
  }
}

export default connect(
  (store) => ({ initialStateLoaded: store.app.initialStateLoaded, tankId: store.playerTankStats.tankSelection.tank.tank_id }),
  { selectPlayer }
)(MainLayout);
