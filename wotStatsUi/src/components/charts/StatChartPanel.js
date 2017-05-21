import React, { Component } from 'react';
import EffectiveStatChart from './EffectiveStatChart.js';
import ComparisonChart from './ComparisonChart.js';
import SingleStatChart from './SingleStatChart.js';

export default class ChartPanel extends Component {

  generateCharts() {
    return this.props.charts.map((chart) => {
      switch (chart.type) {
         case "effective":
            return <EffectiveStatChart {...chart} />
         case "comparison":
            return <ComparisonChart {...chart} />;
         case "stat":
            return <SingleStatChart {...chart} />;
         default:
            return <span>Unknown chart</span>;
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