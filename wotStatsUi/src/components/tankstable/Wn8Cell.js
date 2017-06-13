import React, { Component } from 'react';

export default class Wn8Cell extends Component {

  getWn8Class(val) {
    if (val < 500) return "wn8 wn8-verybad";
    if (val < 700) return "wn8 wn8-bad";
    if (val < 900) return "wn8 wn8-belowaverage";
    if (val < 1100) return "wn8 wn8-average";
    if (val < 1350) return "wn8 wn8-good";
    if (val < 1550) return "wn8 wn8-verygood";
    if (val < 1850) return "wn8 wn8-great";
    if (val < 2050) return "wn8 wn8-unicum";
    return "wn8 wn8-superunicum";
  }

  render() {
    return (
      <td>
        <span className={this.getWn8Class(this.props.value)}>{this.props.value}</span>
      </td>
    )
  }

}

