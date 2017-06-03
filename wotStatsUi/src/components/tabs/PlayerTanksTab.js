import React, { Component } from 'react';
import { connect } from "react-redux"

import { selectTankTier, selectTankType, selectTankNation, toggleGroupVisibility } from '../../actions/playerTanksActions.js';

import TankCriteriaSelector from '../selectors/TankCriteriaSelector.js';
import TanksTable from '../tankstable/TanksTable.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';

import { playerTanksStatsModelDefinition } from '../../const/Const.js';
const noPlayerWarning = <h3>Select player first!</h3>

class PlayerTanksTab extends Component {
  render() {
    if (!this.props.player) {
      return noPlayerWarning;
    }
    var { criteriaSelection, columnVisibility } = this.props.playerTanks;

    return (
      <div>
        player tanks table
        <TankCriteriaSelector criteriaSelection={criteriaSelection}
           selectTankTier={this.props.selectTankTier}
           selectTankType={this.props.selectTankType}
           selectTankNation={this.props.selectTankNation} />
        <ColumnVisibilitySelector toggleGroupVisibility={this.props.toggleGroupVisibility} {...columnVisibility} />
        <TanksTable tanks={this.props.playerTanks.playerTanks} definition={playerTanksStatsModelDefinition} />
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTanks: store.playerTanks, player: store.players.player }),
  { selectTankTier, selectTankType, selectTankNation, toggleGroupVisibility }
)(PlayerTanksTab);
