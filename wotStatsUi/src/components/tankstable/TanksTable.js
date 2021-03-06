import React, { Component } from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

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
        <td className="small-column">flag</td>
        { this.generateHeaderCells() }
      </tr>
    );
  }

  generateHeaderCells() {
    return this.props.definition.map((def) => {
      if (this.props.columnVisibility[def.group]) {
        return <td key={ "header-" + def.property }>{def.header}</td>
      }
      return null
    });
  }

  generateSortRow() {
    return (
      <tr>
        <td>{ this.generateSortButton("timestamp") }</td>
        <td className="wide-column">{ this.generateSortButton("name") }</td>
        <td className="small-column">{ this.generateSortButton("level") }</td>
        <td className="small-column">{ this.generateSortButton("type") }</td>
        <td className="small-column">{ this.generateSortButton("nation") }</td>
        { this.generateSortCells() }
      </tr>
    );
  }

  generateSortCells() {
    return this.props.definition.map((def) => {
      if (this.props.columnVisibility[def.group]) {
        return <td key={ "sort-" + def.property }>{ this.generateSortButton(def.property) }</td>
      }
      return null
    });
  }

  generateSortButton(property) {
    let _this = this;
    return (
      <Button onClick={() => _this.props.sortTanksHandler(property)} bsStyle="default" bsSize="xsmall">
        <Glyphicon glyph="sort" />
      </Button>
    )
  }

  generateCells(stat) {
    return this.props.definition.map((def) => {
      if (this.props.columnVisibility[def.group]) {
        if ("wn8ColorRange" in def) {
          return <Wn8Cell key={ "stat-wn8-" + stat.timestamp } value={ stat[def.property] } />
        }
        return <td key={ "state-" + def.property + "-" + stat.timestamp }>{ stat[def.property] }</td>
      }
      return null
    });
  }

  generateStatRows() {
    return this.props.tanks.map((stat) => {
      let _this = this;
      return (
        <tr key={ "statrow-" + stat.tankId }>
          <DateCell timestamp={stat.timestamp} />
          <td style={{ "textAlign" : "left" }}>
            <Link to={`/player/${this.props.accountId}/tank/${stat.tankId}`}>
              <Glyphicon glyph="signal" style={{ "display": "inline-block" }}/> {stat.name}
            </Link>
          </td>
          <td><b>{stat.level}</b></td>
          <td><img src={"/img/" + stat.type + ".png"} alt="Tank type" /></td>
          <td><img src={"/img/" + stat.nation + ".png"} alt="Nation" /></td>
          { this.generateCells(stat) }
        </tr>
      )
    });
  }

  render() {
    return (
      <div className="App-clear">
        <Table bsClass="table-striped table-bordered table-condensed table-hover App-stats-table">
          <thead>{ this.generateHeaderRow() }{ this.generateSortRow() }</thead>
          <tbody>{ this.generateStatRows() }</tbody>
        </Table>
      </div>
    );
  }
}
