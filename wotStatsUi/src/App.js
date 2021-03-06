import React, { Component } from 'react';
import { connect } from "react-redux"
import { BrowserRouter, Route } from 'react-router-dom'

import { loadAppInitialState } from './actions/appActions.js';

import MainNavbar from './components/MainNavbar.js';
import MainLayout from './components/MainLayout.js';
import SelectPlayer from './components/SelectPlayer.js';

import './App.css';

class App extends Component {

  componentWillMount() {
    this.props.loadAppInitialState()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainNavbar />
          <Route path="/" exact component={SelectPlayer} />
          <Route path="/player/:accountId" component={MainLayout} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  (store) => ({ accountId: store.players.accountId }),
  { loadAppInitialState }
)(App);
