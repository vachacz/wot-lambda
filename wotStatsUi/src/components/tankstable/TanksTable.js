import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import DateCell from '../stattable/DateCell.js';

export default class TanksTable extends Component {

  generateHeaderRow() {
    return (
      <tr>
        <td>time</td>
        <td>tank_id</td>
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
          <td>{stat.tank_id}</td>
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
