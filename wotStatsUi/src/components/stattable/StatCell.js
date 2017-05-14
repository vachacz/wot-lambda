import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class StatCell extends Component {

  getStatComponent() {
    if (this.props.cellVisibility.stat) {
      if (this.props.wn8ColorRange) {
        var val = this.props.stats[this.props.property];
        return <span className={this.getWn8Class(val)}>{val}</span>
      }
      return <span>{this.getPropertyValue()}</span>
    }
  }

  getDeltaComponent() {
    if  (this.props.cellVisibility.delta) {
      var delta = this.getPropertyDelta()
      var arrowClass = this.getArrowClass(delta)
      if (delta < 0 || delta > 0) return <span className={arrowClass}>{delta}<Glyphicon glyph={arrowClass}/></span>
    }
  }

  getArrowClass(delta) {
    if (delta > 0) return "arrow-up"
    if (delta < 0) return "arrow-down"
    return ""
  }

  getEffectiveStatComponent() {
    if (this.props.cellVisibility.effective) {
      var value = this.getPropertyValue()
      var effective = this.getEffectivePropertyValue()
      if (this.props.wn8ColorRange) {
        return <span className={this.getWn8Class(effective)}>{effective}</span>
      }
      if (this.hasEffectivePropertyValue()) {
        if (effective > value) {
          return <span className="effective-plus">{effective}</span>
        }
        if (effective < value) {
          return <span className="effective-minus">{effective}</span>
        }
        return <span className="effective-zero">{effective}</span>
      }
    }
  }

  getWn8Class(val) {
    if (val < 500) return "wn8 wn8-verybad";
    if (val < 700) return "wn8 wn8-bad";
    if (val < 900) return "wn8 wn8-belowaverage";
    if (val < 1100) return "wn8 wn8-average";
    if (val < 1350) return "wn8 wn8-good";
    if (val < 1550) return "wn8 wn8-verygood";
    if (val < 1850) return "wn8 wn8-great";
    if (val < 2050) return "wn8 wn8-unicum";
    return "wn8 wn8-superunicum";
  }

  render() {
    if (this.props.columnVisibility[this.props.group]) {
      var statComponent = this.getStatComponent()
      var deltaComponent = this.getDeltaComponent()
      var effectiveStatComponent = this.getEffectiveStatComponent()

      return ( <td>{statComponent}{effectiveStatComponent}{deltaComponent}</td> );
    }
    return null;
  }

  getPropertyDelta() {
    return this.props.stats[this.props.property + "Delta"]
  }

  getPropertyValue() {
    return this.props.stats[this.props.property]
  }

  getEffectivePropertyValue() {
    return this.props.stats[this.props.property + "Effective"]
  }

  hasEffectivePropertyValue() {
    return ( this.props.property + "Effective" ) in this.props.stats;
  }
}