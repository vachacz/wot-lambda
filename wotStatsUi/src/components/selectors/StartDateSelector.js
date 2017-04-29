import React, { Component } from 'react';

import { Glyphicon } from 'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");

class StartDateSelector extends Component {
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select base date <Glyphicon glyph="question-sign" /></div>
        <DatePicker id="tab-player-datepicker" bsSize="small" style={{width: "150px"}}/>
      </div>
    );
  }
}

export default StartDateSelector;