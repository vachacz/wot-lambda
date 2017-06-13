import React, { Component } from 'react';
import EffectiveStatChart from './EffectiveStatChart.js';
import ComparisonChart from './ComparisonChart.js';
import SingleStatChart from './SingleStatChart.js';

export default class ChartPanel extends Component {

  generateCharts() {
    return this.props.charts.map((chart) => {
      switch (chart.type) {
         case "effective":
            return <EffectiveStatChart {...chart} key={ "chart-eff-" + chart.title } />
         case "comparison":
            return <ComparisonChart {...chart} key={ "chart-comp-" + chart.title } />;
         case "stat":
            return <SingleStatChart {...chart} key={ "chart-stat-" + chart.title } />;
         case "category":
            return <div className="App-clear" style={{ width: "100%" }} key={ "category-" + chart.categoryTitle }><h3>{chart.categoryTitle}</h3></div>;
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