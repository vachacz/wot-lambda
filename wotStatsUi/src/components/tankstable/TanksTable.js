import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import DateCell from '../stattable/DateCell.js';

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
      return <td>{def.header}</td>
    });
  }

  generateCells(stat) {
    return this.props.definition.map((def) => {
      return <td>{ stat[def.property] }</td>
    });
  }

  generateStatRows() {
    return this.props.tanks.map((stat) => {
      return (
        <tr>
          <DateCell timestamp={stat.timestamp} />
          <td style={{ "text-align" : "left" }}>{stat.name}</td>
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
          <thead>{ this.generateHeaderRow() }</thead>
          <tbody>{ this.generateStatRows() }</tbody>
        </Table>
      </div>
    );
  }
}
