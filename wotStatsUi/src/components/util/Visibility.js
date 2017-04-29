import { Component } from 'react';

import { initialVisibleColumnGroups } from '../../api/WotMyStatsClient.js';
import emitter from '../../const/Const.js';

export default  class Visibility extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: props.group,
      visible: initialVisibleColumnGroups.includes(this.props.group)
    };

    emitter.on('columnVisibilityChanged', (function(visibilityGroup, newVisiblity) {
      if (this.state.group === visibilityGroup) {
        this.setState({ visible: newVisiblity })
      }
    }).bind(this))
  }
  render() {
    if (!this.state.visible) {
      return null;
    }
    return ( this.props.children )
  }
}