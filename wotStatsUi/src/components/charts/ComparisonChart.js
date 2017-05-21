import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, DiscreteColorLegend } from 'react-vis';
import { Panel } from 'react-bootstrap';

var moment = require('moment');

export default class ComparisonChart extends Component {

  render() {
    return (
     <Panel header={this.props.title}>
       <div className="App-chart-panel">

         <XYPlot fill="none" width={258} height={200} yDomain={ this.props.range }>
           <HorizontalGridLines />
           <LineMarkSeries color="green" curve="curveMonotoneX" data={this.props.series1} />
           <LineMarkSeries color="red" curve="curveMonotoneX" data={this.props.series2} />
           <XAxis tickFormat={(value) => moment(parseInt(value, 10)).format("D/MM")}/>
           <YAxis />
           <DiscreteColorLegend className="comparison-chart-legend" orientation="horizontal" items={[
                { title: this.props.series1Title, color: 'green' },
                { title: this.props.series2Title, color: 'red' }
              ]}
           />

         </XYPlot>

       </div>
     </Panel>
    )}
}
