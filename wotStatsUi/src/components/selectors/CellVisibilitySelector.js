import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class CellVisibilitySelector extends Component {
  render() {
    return (
      <div className="App-menugroup-right">
        <div className="App-menugroup-header">Select cell visibility <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleCellVisibility('stat')} active={this.props.stat}>Stat</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleCellVisibility('delta')} active={this.props.delta}>Delta</Button>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.props.toggleCellVisibility('effective')} active={this.props.effective}>Effective</Button>
        </ButtonGroup>
      </div>
    );
  }
}
