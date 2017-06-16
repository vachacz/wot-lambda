import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const tooltip =
  <Tooltip id="tooltip-bottom">
    <div style={{ textAlign: "left" }}>
      Selector allows to select values visible in cells.<br/><br/>
      <b>Stat</b> - stat values<br/><br/>
      <b>Delta</b> - delta values between current stat and previous or first stat depending on the delta mode<br/><br/>
      <b>Effective</b> - effective value calculated since previous or first stat depending on the delta mode
    </div>
  </Tooltip>;

export default class CellVisibilitySelector extends Component {
  render() {
    return (
      <div className="App-menugroup-right">
        <div className="App-menugroup-header">
          Select cell visibility <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Glyphicon glyph="question-sign" />
          </OverlayTrigger>
        </div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleCellVisibility('stat')} active={this.props.stat}>Stat</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleCellVisibility('delta')} active={this.props.delta}>Delta</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleCellVisibility('effective')} active={this.props.effective}>Effective</Button>
        </ButtonGroup>
      </div>
    );
  }
}
