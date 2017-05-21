import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries } from 'react-vis';
import { Panel } from 'react-bootstrap';

var moment = require('moment');

export default class EffectiveStatChart extends Component {

  render() {
    return (
     <Panel header={this.props.title}>
       <div className="App-chart-panel">

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.statSeriesRange }>
           <HorizontalGridLines />
           <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.statSeries} />
           <XAxis tickFormat={(value) => moment(parseInt(value, 10)).format("D/MM")}/>
           <YAxis />
         </XYPlot>

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.effectiveStatSeriesRange }>
           <HorizontalGridLines />
           <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.statSeries} />
           <LineMarkSeries color="blue" curve="curveMonotoneX" data={this.props.effectiveStatSeries} />
           <XAxis tickFormat={(value) => moment(parseInt(value, 10)).format("D/MM")}/>
           <YAxis />
         </XYPlot>

       </div>
     </Panel>
    )}
}
