import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, LineMarkSeries } from 'react-vis';
import { Panel } from 'react-bootstrap';

var moment = require('moment');

export default class EffectiveStatChart extends Component {

  renderStatSeries() {
    return this.props.statSeries.length < 30
      ? <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.statSeries} />
      : <LineSeries color="green" curve="curveMonotoneX" data={this.props.statSeries} />
  }

  renderEffectiveSeries() {
    return this.props.effectiveStatSeries.length < 30
      ? <LineMarkSeries color="blue" curve="curveMonotoneX" data={this.props.effectiveStatSeries} />
      : <LineSeries color="blue" curve="curveMonotoneX" data={this.props.effectiveStatSeries} />
  }

  render() {
    return (
     <Panel header={this.props.title}>
       <div className="App-chart-panel">

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.statSeriesRange }>
           <HorizontalGridLines />

           { this.renderStatSeries() }

           <XAxis tickFormat={(value) => moment(parseInt(value, 10)).format("D/MM")}/>
           <YAxis />
         </XYPlot>

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.effectiveStatSeriesRange }>
           <HorizontalGridLines />

           { this.renderStatSeries() }
           { this.renderEffectiveSeries() }

           <XAxis tickFormat={(value) => moment(parseInt(value, 10)).format("D/MM")}/>
           <YAxis />
         </XYPlot>

       </div>
     </Panel>
    )}
}
