import React, { Component } from 'react';
import { connect } from "react-redux"

import { selectTankTier, selectTankType, selectTankNation, toggleGroupVisibility,
    sortTanks, selectBattleCount } from '../../actions/playerTanksActions.js';

import { selectTank } from '../../actions/playerTankStatsActions.js';

import TankCriteriaSelector from '../selectors/TankCriteriaSelector.js';
import TanksTable from '../tankstable/TanksTable.js';
import ColumnVisibilitySelector from '../selectors/ColumnVisibilitySelector.js';
import BattleCountSelector from '../selectors/BattleCountSelector.js';

import { playerTanksStatsModelDefinition } from '../../const/Const.js';

class PlayerTanksTab extends Component {

  render() {
    var { criteriaSelection, columnVisibility } = this.props.playerTanks;

    return (
      <div>
        <TankCriteriaSelector criteriaSelection={criteriaSelection}
           selectTankTier={this.props.selectTankTier}
           selectTankType={this.props.selectTankType}
           selectTankNation={this.props.selectTankNation} />
        <BattleCountSelector selectBattleCount={this.props.selectBattleCount}
            battleCount={criteriaSelection.battleCount} />
        <ColumnVisibilitySelector toggleGroupVisibility={this.props.toggleGroupVisibility} disableMax="true" {...columnVisibility} />
        <TanksTable tanks={this.props.playerTanks.playerTanks}
            accountId={this.props.accountId}
            definition={playerTanksStatsModelDefinition}
            columnVisibility={columnVisibility}
            sortTanksHandler={this.props.sortTanks}
            selectTankHandler={this.props.selectTank} />
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTanks: store.playerTanks, player: store.players.player, accountId: store.players.accountId }),
  { selectTankTier, selectTankType, selectTankNation, toggleGroupVisibility, sortTanks, selectBattleCount, selectTank }
)(PlayerTanksTab);
