import React, { Component } from 'react';
import { connect } from "react-redux"

import { playerTanksStatsModelDefinition } from '../../const/Const.js';
import { selectTankTier, selectTankType, selectTankNation, selectTank,
    toggleGroupVisibility, toggleCellVisibility, selectDeltaMode, selectMaxResults } from '../../actions/playerTankStatsActions.js';

import StatPresetSelector from '../selectors/StatPresetSelector.js';
import DeltaModeSelector from '../selectors/DeltaModeSelector.js';
import CellVisibilitySelector from '../selectors/CellVisibilitySelector.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';
import StatTable from '../stattable/StatTable.js';
import StatChartPanel from '../charts/StatChartPanel.js';
import TankSelector from '../selectors/TankSelector.js';

class PlayerTankStatsTab extends Component {

  componentWillMount() {
    if (this.props.initialStateLoaded) {
      let { tankId, accountId } = this.props.match.params;
      this.props.selectTank(accountId, tankId)
    }
  }

  componentWillReceiveProps(nextProps) {
    let tankIdHasChanged = nextProps.match.params.tankId !== this.props.match.params.tankId;
    let initialStateLoaded = !this.props.initialStateLoaded && nextProps.initialStateLoaded;

    if (tankIdHasChanged || initialStateLoaded) {
      let { tankId, accountId } = nextProps.match.params;
      this.props.selectTank(accountId, tankId)
    }
  }

  render() {
    var { tanksFiltered, tankSelection } = this.props.playerTankStats;

    return (
      <div>
        <TankSelector tanks={tanksFiltered} tankSelection={tankSelection}
          selectTank={this.props.selectTank}
          selectTankTier={this.props.selectTankTier}
          selectTankType={this.props.selectTankType}
          selectTankNation={this.props.selectTankNation}
          accountId={this.props.accountId}/>

        { this.renderStatTable() }
      </div>
    );
  }

  renderStatTable() {
    var { playerTankStats, cellVisibility, charts, deltaMode, columnVisibility, tankSelection, maxResults } = this.props.playerTankStats;
    if (this.props.isFetchingTank || !this.props.initialStateLoaded) {
      return <div className="loader"/>;
    }
    if (playerTankStats.length === 0) {
      return <div className="App-clear"><h3>No stats for this selection!</h3></div>;
    }

    return (
      <div>
        <h3 className="App-clear" style={{ "overflow-y": "hidden" }}>{tankSelection.tank.name}</h3>
        <StatPresetSelector maxResults={maxResults} selectMaxResults={this.props.selectMaxResults} />
        <DeltaModeSelector deltaMode={deltaMode} selectDeltaMode={this.props.selectDeltaMode} />
        <CellVisibilitySelector toggleCellVisibility={this.props.toggleCellVisibility} {...cellVisibility} />
        <ColumnVisibilitySelector toggleGroupVisibility={this.props.toggleGroupVisibility} disableMax="true" {...columnVisibility} />
        <StatTable definition={playerTanksStatsModelDefinition} deltaMode={deltaMode}
            playerStats={playerTankStats} cellVisibility={cellVisibility} columnVisibility={columnVisibility} />

        <StatChartPanel charts={charts} />
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTankStats: store.playerTankStats, player: store.players.player, accountId: store.players.accountId, initialStateLoaded: store.app.initialStateLoaded,
   isFetchingTank: store.app.isFetchingTank }),
  { selectTankTier, selectTankType, selectTankNation, toggleGroupVisibility, toggleCellVisibility, selectDeltaMode, selectMaxResults, selectTank }
)(PlayerTankStatsTab);
