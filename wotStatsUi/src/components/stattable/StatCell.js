import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import Visibility from '../util/Visibility.js';

export default class StatCell extends Component {

  caluclateDelta() {
    var stat = this.props.stats[this.props.property]
    var previousStat = this.props.previousStats[this.props.property]
    var delta = stat - previousStat
    if ( delta % 1 !== 0 ) {
      delta = delta.toFixed(2);
    }
    return delta
  }

  getArrowClass(delta) {
    if (delta > 0) {
      return "arrow-up"
    } else if (delta < 0) {
      return "arrow-down"
    }
    return ""
  }

  getDeltaComponent(delta) {
    var arrowClass = this.getArrowClass(delta)
    if (delta < 0 || delta > 0) return <span className={arrowClass}><br/>({delta}<Glyphicon glyph={arrowClass}/>)</span>
  }

  getEffectivePropertyComponent() {
    if (this.props.effectiveProperty) {
      let battleDelta = this.props.stats["battles"] - this.props.previousStats["battles"]
      let propertyDelta = this.props.stats[this.props.effectiveProperty] - this.props.previousStats[this.props.effectiveProperty]
      let effectiveAverage = (propertyDelta / battleDelta).toFixed(2);

      if (!isNaN(effectiveAverage)) {
        return <span className="effective-property"><br/>{effectiveAverage}</span>
      }
    }
  }

  render() {
    var stat = this.props.stats[this.props.property]

    var delta = this.caluclateDelta()
    var deltaComponent = this.getDeltaComponent(delta)
    var effectivePropertyComponent = this.getEffectivePropertyComponent()

    return (
      <Visibility group={this.props.group}>
        <td>{stat}{deltaComponent}{effectivePropertyComponent}</td>
      </Visibility>);
  }
}
