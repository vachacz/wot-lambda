import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class StatPresetSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select stat preset <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectMaxResults(10)} active={this.props.maxResults === 10}>last 10</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectMaxResults(20)} active={this.props.maxResults === 20}>last 20</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectMaxResults(50)} active={this.props.maxResults === 50}>last 50</Button>
        </ButtonGroup>
      </div>
    );
  }
}
