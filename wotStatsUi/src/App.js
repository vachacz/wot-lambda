import React, { Component } from 'react';

import MainNavbar from './components/MainNavbar.js';
import MainLayout from './components/MainLayout.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNavbar />
        <MainLayout />
      </div>
    );
  }
}

export default App;
