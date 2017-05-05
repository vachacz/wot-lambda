import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries } from 'react-vis';
import { Panel } from 'react-bootstrap';
import { connect } from "react-redux"

class StatChart extends Component {
  render() {
    return (
     <Panel header={this.props.property}>
       <div className="App-chart-panel">
         <XYPlot fill="none" width={252} height={200}>
           <HorizontalGridLines />
           <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.statData}/>
           <XAxis title="X" />
           <YAxis />
         </XYPlot>
         <XYPlot fill="none" width={252} height={200}>
           <HorizontalGridLines />
           <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.statData}/>
           <LineMarkSeries color="blue" curve="curveMonotoneX" data={this.props.effectiveStatData}/>
           <XAxis title="X" />
           <YAxis />
         </XYPlot>
       </div>
     </Panel>
    )}
}

export default connect(
  (store) => ({ playerStats: store.playerStats.playerStats })
)(StatChart);
