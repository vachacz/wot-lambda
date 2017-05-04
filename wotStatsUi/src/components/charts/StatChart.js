import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, LineMarkSeries} from 'react-vis';
import { connect } from "react-redux"

class StatChart extends Component {
  render() {
    var stats = this.props.playerStats;

    var plot = [];
    var plotEffective = [];

    stats.map((val, index) => {
      plot.push({x: val.timestamp, y: val.avgDamageDealt});

      var prevVal = stats[index + 1]

      if (prevVal) {
        var battleDelta = val.battles - prevVal.battles
        var propertyDelta = val.damageDealt - prevVal.damageDealt
        var effectiveAverage = (propertyDelta / battleDelta).toFixed(2);

        plotEffective.push({x: val.timestamp, y: effectiveAverage});
      }
    })

    return (
     <XYPlot
       fill="none"
       width={300}
       height={300}>
       <HorizontalGridLines />
       <LineMarkSeries color="blue" curve={'curveMonotoneX'} data={plot}/>
       <LineMarkSeries color="red" curve={'curveMonotoneX'} data={plotEffective}/>
       <XAxis title="X" />
       <YAxis />
     </XYPlot>
    )}
}

export default connect(
  (store) => ({ playerStats: store.playerStats.playerStats })
)(StatChart);
