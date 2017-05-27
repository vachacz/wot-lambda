import React, { Component } from 'react';
import { connect } from "react-redux"

import TanksTable from '../tankstable/TanksTable.js';

class PlayerTanksTab extends Component {
  render() {
    return (
      <div>
        player tanks table
        <TanksTable />
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTanks: store.playerTanks }),
  {}
)(PlayerTanksTab);
