import React, { Component } from 'react';
import StatChart from './StatChart.js';

export default class ChartPanel extends Component {

  generateCharts() {
    return this.props.charts.map((chart) => {
      return (
        <StatChart property={chart.property} statData={chart.statData} effectiveStatData={chart.effectiveStatData}/>
      );
    });
  }

  render() {
    return (
      <div className="App-charts">
        {this.generateCharts()}
      </div>
    );
  }
}