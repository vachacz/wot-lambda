import React, { Component } from 'react';

import { Glyphicon } from 'react-bootstrap';
import Select from 'react-select';

import { tiers, tanktypes, nations } from '../../const/Const.js';

export default class TankCriteriaSelector extends Component {

  renderTankType(option) {
    return <span><img src={"img/" + option.value + ".png"} alt="Tank type" /> {option.label}</span>;
  }

  renderNation(option) {
    return <span><img src={"img/" + option.value + ".png"} alt="Nation" /> {option.label}</span>;
  }

  render() {
    var { tier, type, nation } = this.props.criteriaSelection;

    return (
      <div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Tier filter <Glyphicon glyph="question-sign" /></div>
          <Select name="select-tier" value={tier} options={tiers} multi simpleValue onChange={(val) => this.props.selectTankTier(val)} />
        </div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Tank types filter <Glyphicon glyph="question-sign" /></div>
          <Select name="select-tank-type" value={type} options={tanktypes} multi simpleValue onChange={(val) => this.props.selectTankType(val)} optionRenderer={this.renderTankType} />
        </div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Nations filter <Glyphicon glyph="question-sign" /></div>
          <Select name="select-countries" value={nation} options={nations} multi simpleValue onChange={(val) => this.props.selectTankNation(val)} optionRenderer={this.renderNation} />
        </div>
      </div>
    );
  }
}