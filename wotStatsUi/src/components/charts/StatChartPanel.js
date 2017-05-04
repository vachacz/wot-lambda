import React, { Component } from 'react';
import StatChart from './StatChart.js';
import { connect } from "react-redux"

export default class ChartPanel extends Component {
  render() {
    return (
      <div className="container">
        <StatChart />
      </div>
    );
  }
}