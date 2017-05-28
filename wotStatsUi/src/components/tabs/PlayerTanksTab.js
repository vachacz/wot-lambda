import React, { Component } from 'react';
import { connect } from "react-redux"

import TanksTable from '../tankstable/TanksTable.js';

import { playerTanksStatsModelDefinition } from '../../const/Const.js';
const noPlayerWarning = <h3>Select player first!</h3>

class PlayerTanksTab extends Component {
  render() {
    if (!this.props.player) {
      return noPlayerWarning;
    }
    return (
      <div>
        player tanks table
        <TanksTable tanks={this.props.playerTanks.playerTanks} definition={playerTanksStatsModelDefinition} />
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTanks: store.playerTanks, player: store.players.player }),
  {}
)(PlayerTanksTab);
