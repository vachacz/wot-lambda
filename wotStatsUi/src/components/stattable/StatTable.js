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
      return <StatHeader group={def.group} desc={def.header} columnVisibility={this.props.columnVisibility} key={ "header-" + def.property }/>
    });
  }

  generateCells(stat) {
    return this.props.definition.map((def) => {

      var additionalProps = {}
      if ("effectiveProperty" in def) {
        additionalProps["effectiveProperty"] = def.effectiveProperty
      }
      if ("wn8ColorRange" in def) {
        additionalProps["wn8ColorRange"] = def.wn8ColorRange
      }

      return <StatCell stats={stat} group={def.group} property={def.property} key={ "cell-" + def.property + "-" + stat.timestamp }
        cellVisibility={this.props.cellVisibility}
        columnVisibility={this.props.columnVisibility} {...additionalProps} />
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
