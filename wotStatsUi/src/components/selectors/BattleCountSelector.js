import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

const tooltip = <Tooltip id="tooltip-bottom">Filter allows to select tanks with at least 10, 50 or 100 battles.</Tooltip>;

export default class BattleCountSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">
          Battle count filter <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Glyphicon glyph="question-sign" />
          </OverlayTrigger>
        </div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectBattleCount(0)} active={this.props.battleCount === 0}>all</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectBattleCount(10)} active={this.props.battleCount === 10}>+10</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectBattleCount(50)} active={this.props.battleCount === 50}>+50</Button>
          <Button bsSize="small" bsStyle="success" onClick={() => this.props.selectBattleCount(100)} active={this.props.battleCount === 100}>+100</Button>
        </ButtonGroup>
      </div>
    );
  }
}
