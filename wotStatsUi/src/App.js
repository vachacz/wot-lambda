import React, { Component } from 'react';
import { connect } from "react-redux"

import { fetchPlayers } from './actions/playerActions.js';

import MainNavbar from './components/MainNavbar.js';
import MainLayout from './components/MainLayout.js';
import './App.css';

class App extends Component {

  componentWillMount() {
    this.props.fetchPlayers()
  }

  render() {
    return (
      <div className="App">
        <MainNavbar />
        <MainLayout />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchPlayers }
)(App);
