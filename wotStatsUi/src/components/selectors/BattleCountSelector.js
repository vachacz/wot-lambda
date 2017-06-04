import React, { Component } from 'react';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class BattleCountSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Battle count selector <Glyphicon glyph="question-sign" /></div>
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
