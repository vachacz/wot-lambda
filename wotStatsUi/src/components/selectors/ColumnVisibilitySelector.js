import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

import { initialVisibleColumnGroups } from '../../api/WotMyStatsClient.js';
import emitter from '../../const/Const.js';

class ColumnVisibilitySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      max: initialVisibleColumnGroups.includes("max"),
      totals: initialVisibleColumnGroups.includes("totals"),
      avgs: initialVisibleColumnGroups.includes("avgs"),
      ratios: initialVisibleColumnGroups.includes("ratios")
    }
  }
  onButtonSelected(button) {
    var newVisibility = !this.state[button]
    if (newVisibility) {
      initialVisibleColumnGroups.push(button)
    } else {
      var index = initialVisibleColumnGroups.indexOf(button)
      if (index !== -1) {
          initialVisibleColumnGroups.splice(index, 1);
      }
    }
    this.setState({ [button]: newVisibility })
    emitter.emit('columnVisibilityChanged', button, newVisibility)
  }
  render() {
    return (
      <div className="App-menugroup-right">
        <div className="App-menugroup-header">Select column visibility <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'ratios')} active={this.state.ratios}>Ratio</Button>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'avgs')} active={this.state.avgs}>Avg</Button>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'totals')} active={this.state.totals}>Total</Button>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'max')} active={this.state.max}>Max</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default ColumnVisibilitySelector;