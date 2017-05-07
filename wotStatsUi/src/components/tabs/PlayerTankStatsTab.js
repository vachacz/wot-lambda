import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks } from  '../../actions/actions.js';

import TankSelector from '../selectors/TankSelector.js';

class PlayerTankStatsTab extends Component {

  componentWillMount() {
    this.props.fetchTanks()
  }

  render() {
    var { tanks, tankSelection } = this.props.playerTankStats;
    return <TankSelector tanks={tanks}
        tankSelection={tankSelection} selectTankTier={selectTankTier}
        selectTankType={selectTankType} selectTankNation={selectTankNation}
    />
  }
}

export default connect(
  (store) => ({ playerTankStats: store.playerTankStats }),
  { selectTankTier, selectTankType, selectTankNation, selectTank, fetchTanks }
)(PlayerTankStatsTab);