import React, { Component } from 'react';
import { connect } from "react-redux"

import TankSelector from '../selectors/TankSelector.js';

import { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks } from  '../../actions/actions.js';

class PlayerTankStatsTab extends Component {

  componentWillMount() {
    this.props.fetchTanks()
  }

  render() {
    var { tanksFiltered, tankSelection } = this.props.playerTankStats;
    return (
      <TankSelector tanks={ tanksFiltered }
          tankSelection={tankSelection} selectTankTier={this.props.selectTankTier}
          selectTankType={this.props.selectTankType} selectTankNation={this.props.selectTankNation}
      />
    );
  }
}

export default connect(
  (store) => ({ playerTankStats: store.playerTankStats }),
  { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks }
)(PlayerTankStatsTab);