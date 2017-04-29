import React, { Component } from 'react';

export default class StatsRow extends Component {
  render() {
    var newChildren = React.Children.map(
      this.props.children,
      child => React.cloneElement(child, {...this.props})
    );
    return (
      <tr>{newChildren}</tr>
    )
  }
}