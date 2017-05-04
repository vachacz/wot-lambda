import React, { Component } from 'react';
import { connect } from "react-redux"

import { Glyphicon } from 'react-bootstrap';

class StatCell extends Component {

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
    if  (this.props.cellVisibility.delta) {
      var arrowClass = this.getArrowClass(delta)
      if (delta < 0 || delta > 0) return <span className={arrowClass}>({delta}<Glyphicon glyph={arrowClass}/>)</span>
    }
  }

  getEffectivePropertyComponent() {
    if (this.props.effectiveProperty && this.props.cellVisibility.effective) {
      let battleDelta = this.props.stats["battles"] - this.props.previousStats["battles"]
      let propertyDelta = this.props.stats[this.props.effectiveProperty] - this.props.previousStats[this.props.effectiveProperty]
      let effectiveAverage = (propertyDelta / battleDelta).toFixed(2);

      if (!isNaN(effectiveAverage)) {
        return <span className="effective-property">{effectiveAverage}</span>
      }
    }
  }

  getStatComponent(stat) {
    if (this.props.cellVisibility.stat) {
      return <span>{stat}</span>
    }
  }

  render() {
    if (!this.props.columnVisibility[this.props.group]) {
      return null;
    }

    var stat = this.props.stats[this.props.property]

    var delta = this.caluclateDelta()
    var statComponent = this.getStatComponent(stat)
    var deltaComponent = this.getDeltaComponent(delta)
    var effectivePropertyComponent = this.getEffectivePropertyComponent()

    return (
      <td>{statComponent}{deltaComponent}{effectivePropertyComponent}</td>
    );
  }
}

export default connect(
  (store) => ({ cellVisibility: store.playerStats.cellVisibility, columnVisibility: store.playerStats.columnVisibility })
)(StatCell);
