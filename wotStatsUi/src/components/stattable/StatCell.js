import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class StatCell extends Component {
  render() {
    let stat = this.props.stats[this.props.property]
    let previousStat = this.props.previousStats[this.props.property]
    let delta = stat - previousStat
    if ( delta % 1 !== 0 ) {
      delta = delta.toFixed(2);
    }

    let deltaComponent
    if (delta > 0) {
      deltaComponent = <span className="arrow-up"><br/>({delta}<Glyphicon glyph="arrow-up"/>)</span>
    } else if (delta < 0) {
      deltaComponent = <span className="arrow-down"><br/>({delta}<Glyphicon glyph="arrow-down"/>)</span>
    }

    let effectivePropertyComponent
    if (this.props.effectiveProperty) {
      let battleDelta = this.props.stats["battles"] - this.props.previousStats["battles"]
      let propertyDelta = this.props.stats[this.props.effectiveProperty] - this.props.previousStats[this.props.effectiveProperty]
      let effectiveAverage = (propertyDelta / battleDelta).toFixed(2);

      if (!isNaN(effectiveAverage)) {
        effectivePropertyComponent = <span className="effective-property"><br/>{effectiveAverage}</span>
      }
    }

    return ( <td>{stat}{deltaComponent}{effectivePropertyComponent}</td> );
  }
}
