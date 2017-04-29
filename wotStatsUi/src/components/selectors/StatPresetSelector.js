import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import emitter from '../../const/Const.js';

class StatPresetSelector extends Component {
  constructor(props) {
    super(props)
    this.state = { preset: "" }
  }
  onPresetSelected(preset) {
    this.setState({ preset: preset })
    emitter.emit('statPresetSelected', preset)
  }
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select stat preset <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10days')} active={this.state.preset === '10days'}>10 days</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10weeks')} active={this.state.preset === '10weeks'}>10 weeks</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10moths')} active={this.state.preset === '10moths'}>10 months</Button>
          <Button bsSize="small" bsStyle="success">Custom</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default StatPresetSelector;