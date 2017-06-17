import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, LineSeries, DiscreteColorLegend } from 'react-vis';
import { Panel } from 'react-bootstrap';

var moment = require('moment');

export default class SingleStatChart extends Component {

  renderStatSeries() {
    return this.props.series.length < 30
      ? <LineMarkSeries color="orange" curve="curveMonotoneX" data={this.props.series} />
      : <LineSeries color="orange" curve="curveMonotoneX" data={this.props.series} />
  }

  render() {
    return (
     <Panel header={this.props.title}>
       <div className="App-chart-panel">

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.range }>
           <HorizontalGridLines />
           { this.renderStatSeries() }
           <XAxis tickFormat={(value) => moment(parseInt(value, 10)).format("D/MM")}/>
           <YAxis />
           <DiscreteColorLegend className="comparison-chart-legend" orientation="horizontal" items={[
                { title: this.props.title, color: 'orange' }
              ]}
           />

         </XYPlot>

       </div>
     </Panel>
    )}
}
