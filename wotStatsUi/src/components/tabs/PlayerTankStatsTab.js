import React, { Component } from 'react';
import { connect } from "react-redux"

import TankSelector from '../selectors/TankSelector.js';

import { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks } from  '../../actions/actions.js';
import { playerTanksStatsModelDefinition } from '../../const/Const.js';
import StatTable from '../stattable/StatTable.js';

class PlayerTankStatsTab extends Component {

  componentWillMount() {
    this.props.fetchTanks()
  }

  render() {
    var { tanksFiltered, tankSelection, playerTankStats, deltaMode } = this.props.playerTankStats;
    return (
      <div>
        <TankSelector tanks={ tanksFiltered } tankSelection={tankSelection}
            selectTank={this.props.selectTank}
            selectTankTier={this.props.selectTankTier}
            selectTankType={this.props.selectTankType}
            selectTankNation={this.props.selectTankNation} />

        { playerTankStats.length > 0 && <StatTable definition={playerTanksStatsModelDefinition} deltaMode={deltaMode} playerStats={playerTankStats}/> }
        { playerTankStats.length === 0 && tankSelection.tank && <div className="App-clear"><h3>No stats for this tank!</h3></div>}
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTankStats: store.playerTankStats }),
  { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks }
)(PlayerTankStatsTab);