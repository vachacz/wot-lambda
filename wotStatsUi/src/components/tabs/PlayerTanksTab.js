import React, { Component } from 'react';
import { connect } from "react-redux"

import TanksTable from '../tankstable/TanksTable.js';

const noPlayerWarning = <h3>Select player first!</h3>

class PlayerTanksTab extends Component {
  render() {
    if (!this.props.player) {
      return noPlayerWarning;
    }
    return (
      <div>
        player tanks table
        <TanksTable tanks={this.props.playerTanks.playerTanks}/>
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTanks: store.playerTanks, player: store.players.player }),
  {}
)(PlayerTanksTab);
