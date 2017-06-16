import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';

import { tiers, tanktypes, nations } from '../../const/Const.js';

const tooltipTier = <Tooltip id="tooltip-bottom">Selects vehicle tier.</Tooltip>;
const tooltipType = <Tooltip id="tooltip-bottom">Selects vehicle type.</Tooltip>;
const tooltipNation = <Tooltip id="tooltip-bottom">Selects vehicle nation.</Tooltip>;
const tooltipTank = <Tooltip id="tooltip-bottom">Selects vehicle and loads its stats.</Tooltip>;

class TankSelector extends Component {

  renderTankType(option) {
    return <span><img src={"/img/" + option.value + ".png"} alt="Tank type" /> {option.label}</span>;
  }

  renderNation(option) {
    return <span><img src={"/img/" + option.value + ".png"} alt="Nation" /> {option.label}</span>;
  }

  gotoTank(val) {
    if (val) {
      this.props.history.push("/player/" + this.props.accountId + "/tank/" + val.tank_id);
    } else {
      this.props.history.push("/player/" + this.props.accountId + "/tank");
    }
  }

  render() {
    var { tier, type, nation, tank } = this.props.tankSelection;

    return (
      <div className="clearfix">
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
        <div className="App-tankselect-last">
          <div className="App-menugroup-header">Tank selection <OverlayTrigger placement="bottom" overlay={tooltipTank}><Glyphicon glyph="question-sign" /></OverlayTrigger></div>
          <Select name="select-tank" value={tank} options={this.props.tanks} onChange={(val) => this.gotoTank(val)} labelKey="name" valueKey="tank_id" />
        </div>
      </div>
    );
  }
}

export default withRouter(TankSelector);