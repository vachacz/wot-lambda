import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const tooltip =
  <Tooltip id="tooltip-bottom">
    <div style={{ textAlign: "left" }}>
      Selector allows to toggle visibility of different column groups.<br/><br/>
      <b>Ratio</b> - column containing ratio (%) values<br/><br/>
      <b>Avg</b> - column containing average values<br/><br/>
      <b>Ratio</b> - column containing total values (disabled by default)<br/><br/>
      <b>Max</b> - column containing max values (disabled by default)
    </div>
  </Tooltip>;

export default class ColumnVisibilitySelector extends Component {
  render() {
    return (
      <div className="App-menugroup-right">
        <div className="App-menugroup-header">
          Select column visibility <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Glyphicon glyph="question-sign" />
          </OverlayTrigger>
        </div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('ratios')} active={this.props.ratios}>Ratio</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('avgs')} active={this.props.avgs}>Avg</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('totals')} active={this.props.totals}>Total</Button>
          { !this.props.disableMax ? <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleGroupVisibility('max')} active={this.props.max}>Max</Button> : <span /> }
        </ButtonGroup>
      </div>
    );
  }
}
