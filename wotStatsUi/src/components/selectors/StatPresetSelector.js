import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class StatPresetSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select stat preset <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.presetSelected('10days')} active={this.props.preset === '10days'}>10 days</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.presetSelected('10weeks')} active={this.props.preset === '10weeks'}>10 weeks</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.presetSelected('10moths')} active={this.props.preset === '10moths'}>10 months</Button>
        </ButtonGroup>
      </div>
    );
  }
}
