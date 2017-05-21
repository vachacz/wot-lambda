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
         case "category":
            return <div className="App-clear" style={{ width: "100%" }}><h3>{chart.categoryTitle}</h3></div>;
         default:
            return <span>Unknown chart</span>;
       }
    });
  }

  render() {
    return (
      <div className="App-charts">
        { this.generateCharts() }
      </div>
    );
  }
}