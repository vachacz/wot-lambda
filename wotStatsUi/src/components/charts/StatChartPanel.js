import React, { Component } from 'react';
import EffectiveStatChart from './EffectiveStatChart.js';

export default class ChartPanel extends Component {

  effectiveStatChart(chart) {
    return (
      <EffectiveStatChart
          title={chart.title}
          statChartData={chart.statChartData}
          statChartRange={chart.statChartRange}
          effectiveStatChartData={chart.effectiveStatChartData}
          effectiveStatChartRange={chart.effectiveStatChartRange}
      />
    );
  }

  generateCharts() {
    return this.props.charts.map((chart) => {
      switch (chart.type) {
         case "effective": return this.effectiveStatChart(chart);
         default: return;
       }
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