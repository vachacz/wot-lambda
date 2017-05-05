import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries} from 'react-vis';
import { connect } from "react-redux"

class StatChart extends Component {
  render() {
    var stats = this.props.playerStats;

    var plot = [];
    var plotEffective = [];

    stats.forEach((val, index) => {
      plot.push({x: val.timestamp, y: val.avgDamageDealt});
      plotEffective.push({x: val.timestamp, y: val.avgDamageDealtEffective});
    })

    return (
     <XYPlot
       fill="none"
       width={300}
       height={200}>
       <HorizontalGridLines />
       <LineMarkSeries color="blue" curve="curveMonotoneX" data={plot}/>
       <LineMarkSeries color="red" curve="curveMonotoneX" data={plotEffective}/>
       <XAxis title="X" />
       <YAxis />
     </XYPlot>
    )}
}

export default connect(
  (store) => ({ playerStats: store.playerStats.playerStats })
)(StatChart);
