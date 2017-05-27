import React, { Component } from 'react';
import { connect } from "react-redux"

class PlayerTanksTab extends Component {
  render() {
    return (
      <div>
        player tanks table
      </div>
    );
  }
}

export default connect(
  (store) => ({ playerTanks: store.playerTanks }),
  {}
)(PlayerTanksTab);
