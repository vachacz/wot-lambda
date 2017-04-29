import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import emitter from '../../const/Const.js';

export default class DeltaModeSelector extends Component {
  constructor(props) {
    super(props)
    this.state = { deltaMode: "relative" }
  }
  onDeltaModeSelected(deltaMode) {
    this.setState({ deltaMode: deltaMode })
    emitter.emit('deltaModeSelected', deltaMode)
  }
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select delta mode <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'absolute')} active={this.state.deltaMode === 'absolute'}>Absolute</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'relative')} active={this.state.deltaMode === 'relative'}>Relative</Button>
        </ButtonGroup>
      </div>
    );
  }
}
