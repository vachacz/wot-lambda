import React, { Component } from 'react';
import { connect } from "react-redux";

class StatHeader extends Component {
  render() {
    if (!this.props.columnVisibility[this.props.group]) {
      return null;
    }
    return ( <td>{this.props.desc}</td> )
  }
}

export default connect(
  (store) => ({ columnVisibility: store.playerStats.columnVisibility })
)(StatHeader);