import React, { Component } from 'react';
import { connect } from "react-redux"

import { Glyphicon } from 'react-bootstrap';

class StatCell extends Component {

  getStatComponent() {
    if (this.props.cellVisibility.stat) {
      return <span>{this.props.stats[this.props.property]}</span>
    }
  }

  getDeltaComponent() {
    if  (this.props.cellVisibility.delta) {
      var delta = this.getPropertyDelta()
      var arrowClass = this.getArrowClass(delta)
      if (delta < 0 || delta > 0) return <span className={arrowClass}>({delta}<Glyphicon glyph={arrowClass}/>)</span>
    }
  }

  getArrowClass(delta) {
    if (delta > 0) return "arrow-up"
    if (delta < 0) return "arrow-down"
    return ""
  }

  getEffectiveStatComponent() {
    if (this.props.cellVisibility.effective && this.hasEffectivePropertyValue()) {
      return <span className="effective-property">{this.getEffectivePropertyValue()}</span>
    }
  }

  render() {
    if (this.props.columnVisibility[this.props.group]) {
      var statComponent = this.getStatComponent()
      var deltaComponent = this.getDeltaComponent()
      var effectiveStatComponent = this.getEffectiveStatComponent()

      return ( <td>{statComponent}{deltaComponent}{effectiveStatComponent}</td> );
    }
    return null;
  }

  getPropertyDelta() {
    return this.props.stats[this.props.property + "Delta"]
  }

  getEffectivePropertyValue() {
    return this.props.stats[this.props.property + "Effective"]
  }

  hasEffectivePropertyValue() {
    return ( this.props.property + "Effective" ) in this.props.stats;
  }
}

export default connect(
  (store) => ({ cellVisibility: store.playerStats.cellVisibility, columnVisibility: store.playerStats.columnVisibility })
)(StatCell);
