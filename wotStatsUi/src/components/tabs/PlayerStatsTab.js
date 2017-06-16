import React, { Component } from 'react';
import { connect } from "react-redux"

import StatPresetSelector from '../selectors/StatPresetSelector.js';
import DeltaModeSelector from '../selectors/DeltaModeSelector.js';
import CellVisibilitySelector from '../selectors/CellVisibilitySelector.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';
import StatTable from '../stattable/StatTable.js';
import StatChartPanel from '../charts/StatChartPanel.js';

import { toggleGroupVisibility, toggleCellVisibility, selectDeltaMode, selectMaxResults } from '../../actions/playerStatsActions.js';
import { playerStatsModelDefinition } from '../../const/Const.js';

class PlayerStatsTab extends Component {

  render() {
    var { playerStats, columnVisibility, cellVisibility, deltaMode, charts, maxResults } = this.props.playerStats;

    return (
      <div>
        <StatPresetSelector maxResults={maxResults} selectMaxResults={this.props.selectMaxResults} />
        <DeltaModeSelector deltaMode={deltaMode} selectDeltaMode={this.props.selectDeltaMode} />
        <CellVisibilitySelector toggleCellVisibility={this.props.toggleCellVisibility} {...cellVisibility} />
        <ColumnVisibilitySelector toggleGroupVisibility={this.props.toggleGroupVisibility} {...columnVisibility} />
        <StatTable definition={playerStatsModelDefinition}
             deltaMode={deltaMode}
             playerStats={playerStats}
             cellVisibility={cellVisibility}
             columnVisibility={columnVisibility} />

        <StatChartPanel charts={charts}/>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerStats: store.playerStats }),
  { toggleGroupVisibility, toggleCellVisibility, selectDeltaMode, selectMaxResults }
)(PlayerStatsTab);
