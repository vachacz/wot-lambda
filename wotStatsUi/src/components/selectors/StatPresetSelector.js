import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const tooltip = <Tooltip id="tooltip-bottom">Filter allows to control number of most recent stat snapshots loaded from the server.</Tooltip>;

export default class StatPresetSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">
          Number of stats <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Glyphicon glyph="question-sign" />
          </OverlayTrigger>
        </div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectMaxResults(10)} active={this.props.maxResults === 10}>last 10</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectMaxResults(20)} active={this.props.maxResults === 20}>last 20</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectMaxResults(50)} active={this.props.maxResults === 50}>last 50</Button>
        </ButtonGroup>
      </div>
    );
  }
}
