import React, { Component } from 'react';
import { connect } from "react-redux"

import TankSelector from '../selectors/TankSelector.js';

import { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks } from  '../../actions/actions.js';
import { playerTanksStatsModelDefinition } from '../../const/Const.js';
import StatTable from '../stattable/StatTable.js';

const noStatsWarning = <div className="App-clear"><h3>No stats for this selection!</h3></div>
const noPlayerWarning = <h3>Select player first!</h3>

class PlayerTankStatsTab extends Component {

  componentWillMount() {
    this.props.fetchTanks()
  }

  render() {
    var { tanksFiltered, tankSelection, playerTankStats, deltaMode } = this.props.playerTankStats;
    if (!this.props.player) {
      return noPlayerWarning;
    }

    return (
      <div>
        <TankSelector tanks={ tanksFiltered } tankSelection={tankSelection}
          selectTank={this.props.selectTank}
          selectTankTier={this.props.selectTankTier}
          selectTankType={this.props.selectTankType}
          selectTankNation={this.props.selectTankNation} />
        { playerTankStats.length === 0 ? noStatsWarning : <StatTable definition={playerTanksStatsModelDefinition} deltaMode={deltaMode} playerStats={playerTankStats}/>}
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTankStats: store.playerTankStats, player: store.players.player }),
  { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks }
)(PlayerTankStatsTab);
