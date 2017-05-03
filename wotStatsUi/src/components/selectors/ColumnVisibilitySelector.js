import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class ColumnVisibilitySelector extends Component {
  render() {
    return (
      <div className="App-menugroup-right">
        <div className="App-menugroup-header">Select column visibility <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('ratios')} active={this.props.ratios}>Ratio</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('avgs')} active={this.props.avgs}>Avg</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('totals')} active={this.props.totals}>Total</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('max')} active={this.props.max}>Max</Button>
        </ButtonGroup>
      </div>
    );
  }
}
