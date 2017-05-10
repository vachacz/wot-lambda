import React, { Component } from 'react';
import { connect } from "react-redux"

import StartDateSelector from '../selectors/StartDateSelector.js';
import StatPresetSelector from '../selectors/StatPresetSelector.js';
import DeltaModeSelector from '../selectors/DeltaModeSelector.js';
import CellVisibilitySelector from '../selectors/CellVisibilitySelector.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';
import StatTable from '../stattable/StatTable.js';
import StatChartPanel from '../charts/StatChartPanel.js';

import { toggleGroupVisibility, toggleCellVisibility, selectDeltaMode } from '../../actions/actions.js';
import { playerStatsModelDefinition } from '../../const/Const.js';

class PlayerStatsTab extends Component {

  render() {
    var { playerStats, columnVisibility, cellVisibility, deltaMode, charts } = this.props.playerStats;

    if (playerStats.length === 0) {
      return <h3>Select player first!</h3>
    }

    return (
      <div>
        <StartDateSelector />
        <StatPresetSelector />
        <DeltaModeSelector deltaMode={deltaMode} selectDeltaMode={this.props.selectDeltaMode}/>
        <CellVisibilitySelector toggleCellVisibility={this.props.toggleCellVisibility} {...cellVisibility}/>
        <ColumnVisibilitySelector toggleGroupVisibility={this.props.toggleGroupVisibility} {...columnVisibility}/>
        <StatTable definition={playerStatsModelDefinition} deltaMode={deltaMode} playerStats={playerStats}
             cellVisibility={cellVisibility} columnVisibility={columnVisibility} />

        <StatChartPanel charts={charts}/>
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerStats: store.playerStats }),
  { toggleGroupVisibility, toggleCellVisibility, selectDeltaMode }
)(PlayerStatsTab);
