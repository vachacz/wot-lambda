import React, { Component } from 'react';
import StatChart from './StatChart.js';

export default class ChartPanel extends Component {

  generateCharts() {
    return this.props.charts.map((chart) => {
      return (
        <StatChart property={chart.property} title={chart.title} statData={chart.statData} effectiveStatData={chart.effectiveStatData}
            statChartRange={chart.statChartRange} effectiveStatChartRange={chart.effectiveStatChartRange}/>
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