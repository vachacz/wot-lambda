import React, { Component } from 'react';
import { connect } from "react-redux"

import StartDateSelector from '../selectors/StartDateSelector.js';
import StatPresetSelector from '../selectors/StatPresetSelector.js';
import DeltaModeSelector from '../selectors/DeltaModeSelector.js';
import CellVisibilitySelector from '../selectors/CellVisibilitySelector.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';
import StatTable from '../stattable/StatTable.js';

import { toggleGroupVisibility, toggleCellVisibility, selectDeltaMode } from '../../actions/actions.js';

class PlayerStatsTab extends Component {
  render() {
    var { playerStats, columnVisibility, cellVisibility, deltaMode } = this.props.playerStats;

    return (
      <div>
        <StartDateSelector />
        <StatPresetSelector />
        <DeltaModeSelector deltaMode={deltaMode} selectDeltaMode={this.props.selectDeltaMode}/>
        <CellVisibilitySelector toggleCellVisibility={this.props.toggleCellVisibility} {...cellVisibility}/>
        <ColumnVisibilitySelector toggleGroupVisibility={this.props.toggleGroupVisibility} {...columnVisibility}/>
        <StatTable deltaMode={deltaMode} playerStats={playerStats}/>
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerStats: store.playerStats }),
  { toggleGroupVisibility, toggleCellVisibility, selectDeltaMode }
)(PlayerStatsTab);
