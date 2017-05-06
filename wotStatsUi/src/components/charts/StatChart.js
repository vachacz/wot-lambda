import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries } from 'react-vis';
import { Panel } from 'react-bootstrap';

export default class StatChart extends Component {

  render() {
    return (
     <Panel header={this.props.title}>
       <div className="App-chart-panel">

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.statChartRange }>
           <HorizontalGridLines />
           <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.statData} />
           <XAxis title="X" />
           <YAxis />
         </XYPlot>

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.effectiveStatChartRange }>
           <HorizontalGridLines />
           <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.statData} />
           <LineMarkSeries color="blue" curve="curveMonotoneX" data={this.props.effectiveStatData} />
           <XAxis />
           <YAxis />
         </XYPlot>

       </div>
     </Panel>
    )}
}
