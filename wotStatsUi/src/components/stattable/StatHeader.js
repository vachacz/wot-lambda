import React, { Component } from 'react';
import { connect } from "react-redux";

export default class StatHeader extends Component {
  render() {
    if (!this.props.columnVisibility[this.props.group]) {
      return null;
    }
    return ( <td>{this.props.desc}</td> )
  }
}
