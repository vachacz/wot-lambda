import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

export default class TanksTable extends Component {

  generateHeaderRow() {
    return (
      <tr>
        <td>time</td>
        { this.generateHeaderCells() }
      </tr>
    );
  }

  generateHeaderCells() {
    return <td>header 1</td>
  }

  generateCells() {
    return <td>cell 1</td>
  }

  generateStatRows() {
    return (
      <tr>
        <td>time</td>
        { this.generateCells() }
      </tr>
    );
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
