import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const tooltip =
  <Tooltip id="tooltip-bottom">
    <div style={{ textAlign: "left" }}>
      Selector allows to define algorithm for calculation of deltas and effective values.<br/><br/>
      <b>Absolute</b> - current and first stat snapshots are used to calculate deltas and effective values<br/><br/>
      <b>Relative</b> - current and previous stat snapshots are used to calculate deltas and effective values
    </div>
  </Tooltip>;

export default class DeltaModeSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">
          Select delta mode <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Glyphicon glyph="question-sign" />
          </OverlayTrigger>
        </div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectDeltaMode('absolute')} active={this.props.deltaMode === 'absolute'}>Absolute</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectDeltaMode('relative')} active={this.props.deltaMode === 'relative'}>Relative</Button>
        </ButtonGroup>
      </div>
    );
  }
}
