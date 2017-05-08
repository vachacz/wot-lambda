import React, { Component } from 'react';

import { Glyphicon } from 'react-bootstrap';
import Select from 'react-select';

export default class TankSelector extends Component {

  render() {

     var tiers = [
       { value: "1", label: "Tier I" },
       { value: "2", label: "Tier II" },
       { value: "3", label: "Tier III" },
       { value: "4", label: "Tier IV" },
       { value: "5", label: "Tier V" },
       { value: "6", label: "Tier VI" },
       { value: "7", label: "Tier VII" },
       { value: "8", label: "Tier VIII" },
       { value: "9", label: "Tier IX" },
       { value: "10", label: "Tier X" }
     ];

     var tanktypes = [
       { value: "AT-SPG",     label: "Tank destroyer" },
       { value: "SPG",        label: "Artillery" },
       { value: "lightTank",  label: "Light tank" },
       { value: "mediumTank", label: "Medium tank" },
       { value: "heavyTank",  label: "Heavy tank" }
     ];

     var countries = [
       { value: "germany", label: "Germany" },
       { value: "sweden",  label: "Sweden" },
       { value: "china",   label: "China" },
       { value: "japan",   label: "Japan" },
       { value: "ussr",    label: "USSR" },
       { value: "france",  label: "France" },
       { value: "uk",      label: "United Kingdom" },
       { value: "czech",   label: "Czech" },
       { value: "usa",     label: "USA" }
     ];

    var { tier, type, nation, tank } = this.props.tankSelection;

    return (
      <div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Tier filter <Glyphicon glyph="question-sign" /></div>
          <Select name="select-tier" value={tier} options={tiers} multi simpleValue onChange={(val) => this.props.selectTankTier(val)} />
        </div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Tank types filter <Glyphicon glyph="question-sign" /></div>
          <Select name="select-tank-type" value={type} options={tanktypes} multi simpleValue onChange={(val) => this.props.selectTankType(val)} />
        </div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Nations filter <Glyphicon glyph="question-sign" /></div>
          <Select name="select-countries" value={nation} options={countries} multi simpleValue onChange={(val) => this.props.selectTankNation(val)} />
        </div>
        <div className="App-tankselect">
          <div className="App-menugroup-header">Tank selection <Glyphicon glyph="question-sign" /></div>
          <Select name="select-tank" value={tank} options={this.props.tanks} onChange={(val) => this.props.selectTank(val)} labelKey="name" valueKey="tank_id" />
        </div>
      </div>
    );
  }
}