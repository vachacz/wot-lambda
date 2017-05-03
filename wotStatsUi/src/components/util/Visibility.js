import { Component } from 'react';
import { connect } from "react-redux"

class Visibility extends Component {
  render() {
    if (!this.props.columnVisibility[this.props.group]) {
      return null;
    }
    return ( this.props.children )
  }
}

export default connect(
  (store) => ({ columnVisibility: store.playerStats.columnVisibility })
)(Visibility);