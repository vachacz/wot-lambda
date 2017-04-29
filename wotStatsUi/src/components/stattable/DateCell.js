import React, { Component } from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

var moment = require('moment');

export default class DateCell extends Component {
  render() {
    var dt = moment(parseInt(this.props.timestamp));
    const tooltip = (<Tooltip id="tooltip-bottom">{dt.format("YYYY-MM-DD HH:mm")}</Tooltip>);
    return (
      <td>
        {dt.format("YYYY-MM-DD") + " "}
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <Glyphicon glyph="time"/>
        </OverlayTrigger>
      </td>
    );
  }
}
