import React, { Component } from 'react';

import StartDateSelector from '../selectors/StartDateSelector.js';
import StatPresetSelector from '../selectors/StatPresetSelector.js';
import DeltaModeSelector from '../selectors/DeltaModeSelector.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';

import StatTable from '../stattable/StatTable.js';

class PlayerStatsTab extends Component {
  render() {
    return (
      <div>
        <StartDateSelector />
        <StatPresetSelector />
        <DeltaModeSelector />
        <ColumnVisibilitySelector />
        <StatTable />
      </div>
    );
  }
}

export default PlayerStatsTab;