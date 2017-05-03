import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class DeltaModeSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select delta mode <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectDeltaMode('absolute')} active={this.props.deltaMode === 'absolute'}>Absolute</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectDeltaMode('relative')} active={this.props.deltaMode === 'relative'}>Relative</Button>
        </ButtonGroup>
      </div>
    );
  }
}
