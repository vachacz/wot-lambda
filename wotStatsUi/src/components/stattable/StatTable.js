import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

import StatHeader from './StatHeader.js';
import DateCell from './DateCell.js';
import StatCell from './StatCell.js';

export default class StatTable extends Component {

  generateHeaderRow() {
    return (
      <tr>
        <td>time</td>
        { this.generateHeaderCells() }
      </tr>
    );
  }

  generateHeaderCells() {
    return this.props.definition.map((def) => {
      return <StatHeader group={def.group} desc={def.header} />
    });
  }

  generateCells(stat) {
    return this.props.definition.map((def) => {
      if ("effectiveProperty" in def) {
        return <StatCell stats={stat} group={def.group} property={def.property} effectiveProperty={def.effectiveProperty} />
      } else {
        return <StatCell stats={stat} group={def.group} property={def.property} />
      }
    });
  }

  generateStatRows() {
    return this.props.playerStats.map((stat, index) => {
      return (
        <tr key={stat.timestamp}>
          <DateCell timestamp={stat.timestamp} />
          { this.generateCells(stat) }
        </tr>
      );
    });
  }

  render() {
    if (this.props.playerStats.length === 0) return <div style={{ clear: "both", color: "red", fontWeight: "bold" }}><br/><br/>Select user from dropdown menu.</div>
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
