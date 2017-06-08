import React, { Component } from 'react';
import { connect } from "react-redux"

import { playerTanksStatsModelDefinition } from '../../const/Const.js';
import { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks,
    toggleGroupVisibility, toggleCellVisibility, selectDeltaMode, selectMaxResults } from '../../actions/playerTankStatsActions.js';

import StatPresetSelector from '../selectors/StatPresetSelector.js';
import DeltaModeSelector from '../selectors/DeltaModeSelector.js';
import CellVisibilitySelector from '../selectors/CellVisibilitySelector.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';
import StatTable from '../stattable/StatTable.js';
import StatChartPanel from '../charts/StatChartPanel.js';
import TankSelector from '../selectors/TankSelector.js';

const noStatsWarning = <div className="App-clear"><h3>No stats for this selection!</h3></div>
const noPlayerWarning = <h3>Select player first!</h3>

class PlayerTankStatsTab extends Component {

  componentWillMount() {
    this.props.fetchTanks()
  }

  renderStatTable() {
    var { playerTankStats, cellVisibility, charts, deltaMode, columnVisibility, tankSelection, maxResults } = this.props.playerTankStats;

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
      </div>
    );
  }

  render() {
    var { tanksFiltered, tankSelection, playerTankStats } = this.props.playerTankStats;
    if (!this.props.player) {
      return noPlayerWarning;
    }

    return (
      <div>
        <TankSelector tanks={tanksFiltered} tankSelection={tankSelection}
          selectTank={this.props.selectTank}
          selectTankTier={this.props.selectTankTier}
          selectTankType={this.props.selectTankType}
          selectTankNation={this.props.selectTankNation} />
        { playerTankStats.length === 0 ? noStatsWarning : this.renderStatTable() }
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTankStats: store.playerTankStats, player: store.players.player }),
  { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks, toggleGroupVisibility, toggleCellVisibility, selectDeltaMode, selectMaxResults }
)(PlayerTankStatsTab);
