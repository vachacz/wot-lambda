import React, { Component } from 'react';
import { connect } from "react-redux"

import StartDateSelector from '../selectors/StartDateSelector.js';
import StatPresetSelector from '../selectors/StatPresetSelector.js';
import DeltaModeSelector from '../selectors/DeltaModeSelector.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';
import StatTable from '../stattable/StatTable.js';

import { toggleGroupVisibility, selectDeltaMode } from '../../actions/actions.js';

class PlayerStatsTab extends Component {
  render() {
    var { playerStats, columnVisibility, deltaMode } = this.props.playerStats;

    return (
      <div>
        <StartDateSelector />
        <StatPresetSelector />
        <DeltaModeSelector deltaMode={deltaMode} selectDeltaMode={this.props.selectDeltaMode}/>
        <ColumnVisibilitySelector toggleGroupVisibility={this.props.toggleGroupVisibility} {...columnVisibility}/>
        <StatTable deltaMode={deltaMode} playerStats={playerStats} columnVisibility={columnVisibility}/>
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerStats: store.playerStats }),
  { toggleGroupVisibility, selectDeltaMode }
)(PlayerStatsTab);
