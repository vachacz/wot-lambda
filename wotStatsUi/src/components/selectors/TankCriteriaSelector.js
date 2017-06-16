import React, { Component } from 'react';

import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';

import { tiers, tanktypes, nations } from '../../const/Const.js';

const tooltipTier = <Tooltip id="tooltip-bottom">Selects vehicle tier.</Tooltip>;
const tooltipType = <Tooltip id="tooltip-bottom">Selects vehicle type.</Tooltip>;
const tooltipNation = <Tooltip id="tooltip-bottom">Selects vehicle nation.</Tooltip>;

export default class TankCriteriaSelector extends Component {

  renderTankType(option) {
    return <span><img src={"/img/" + option.value + ".png"} alt="Tank type" /> {option.label}</span>;
  }

  renderNation(option) {
    return <span><img src={"/img/" + option.value + ".png"} alt="Nation" /> {option.label}</span>;
  }

  render() {
    var { tier, type, nation } = this.props.criteriaSelection;

    return (
      <div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Tier filter <OverlayTrigger placement="bottom" overlay={tooltipTier}><Glyphicon glyph="question-sign" /></OverlayTrigger></div>
          <Select name="select-tier" value={tier} options={tiers} multi simpleValue onChange={(val) => this.props.selectTankTier(val)} />
        </div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Type filter <OverlayTrigger placement="bottom" overlay={tooltipType}><Glyphicon glyph="question-sign" /></OverlayTrigger></div>
          <Select name="select-tank-type" value={type} options={tanktypes} multi simpleValue onChange={(val) => this.props.selectTankType(val)} optionRenderer={this.renderTankType} />
        </div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Nation filter <OverlayTrigger placement="bottom" overlay={tooltipNation}><Glyphicon glyph="question-sign" /></OverlayTrigger></div>
          <Select name="select-countries" value={nation} options={nations} multi simpleValue onChange={(val) => this.props.selectTankNation(val)} optionRenderer={this.renderNation} />
        </div>
      </div>
    );
  }
}