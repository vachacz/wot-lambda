import React, { Component } from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';

import DateCell from '../stattable/DateCell.js';
import Wn8Cell from './Wn8Cell.js';

export default class TanksTable extends Component {

  generateHeaderRow() {
    return (
      <tr>
        <td>last snapshot</td>
        <td className="wide-column">name</td>
        <td className="small-column">tier</td>
        <td className="small-column">type</td>
        <td className="small-column">nation</td>
        { this.generateHeaderCells() }
      </tr>
    );
  }

  generateHeaderCells() {
    return this.props.definition.map((def) => {
      if (!this.props.columnVisibility[def.group]) {
        return null;
      }
      return <td>{def.header}</td>
    });
  }

  generateSortRow() {
    return (
      <tr>
        <td></td>
        <td className="wide-column"></td>
        <td className="small-column"></td>
        <td className="small-column"></td>
        <td className="small-column"></td>
        { this.generateSortCells() }
      </tr>
    );
  }

  generateSortCells() {
    return this.props.definition.map((def) => {
      if (!this.props.columnVisibility[def.group]) {
        return null;
      }
      let _this = this;
      return (
        <td>
          <Button onClick={() => _this.props.sortTanksHandler(def.property)} bsStyle="default" bsSize="xsmall">
            <Glyphicon glyph="sort" />
          </Button>
        </td>
      )
    });
  }

  generateCells(stat) {
    return this.props.definition.map((def) => {
      if (!this.props.columnVisibility[def.group]) {
        return null;
      }
      if ("wn8ColorRange" in def) {
        return <Wn8Cell value={ stat[def.property] } />
      }
      return <td>{ stat[def.property] }</td>
    });
  }

  generateStatRows() {
    return this.props.tanks.map((stat) => {
      return (
        <tr>
          <DateCell timestamp={stat.timestamp} />
          <td style={{ "text-align" : "left" }}>
            <Button onClick={this.shortTankStats} bsStyle="default" bsSize="xsmall">
              <Glyphicon glyph="signal" style={{ "display": "inline-block" }}/>
            </Button>  {stat.name}
          </td>
          <td><b>{stat.level}</b></td>
          <td><img src={"img/" + stat.type + ".png"} alt="Tank type" /></td>
          <td><img src={"img/" + stat.nation + ".png"} alt="Nation" /></td>
          { this.generateCells(stat) }
        </tr>
      )
    });
  }

  render() {
    return (
      <div className="App-clear">
        <Table bsClass="App-stats-table table-striped table-bordered table-condensed table-hover">
          <thead>{ this.generateHeaderRow() }{ this.generateSortRow() }</thead>
          <tbody>{ this.generateStatRows() }</tbody>
        </Table>
      </div>
    );
  }
}
