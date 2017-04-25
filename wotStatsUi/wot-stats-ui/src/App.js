import React, { Component } from 'react';
import { getPlayerStats, getPlayerTankStats } from './api/WotMyStatsClient.js';
import { Tab, Tabs, Button, ButtonGroup, Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import './App.css';

var DatePicker = require("react-bootstrap-date-picker");
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

class MainNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              WoT MyStats
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">hawtank</NavItem>
              <NavItem eventKey={2} href="#">EU</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

class MainNavigation extends Component {
  render() {
    return (
      <div className="container">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Player" className="clearfix">
            <PlayerStatsTab />
          </Tab>
          <Tab eventKey={2} title="Tanks">
            TODO ...
          </Tab>
          <Tab eventKey={3} title="Tank details">
            TODO ...
          </Tab>
        </Tabs>
      </div>
    );
  }
}

class StatPresetSelector extends Component {
  constructor(props) {
    super()
    this.state = {
      preset: ""
    }
  }
  onPresetSelected(preset) {
    this.setState({
      preset: preset
    })
    emitter.emit('statPresetSelected', preset)
  }
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select stat preset <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10days')} active={this.state.preset === '10days'}>10 days</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10weeks')} active={this.state.preset === '10weeks'}>10 weeks</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10moths')} active={this.state.preset === '10moths'}>10 months</Button>
          <Button bsSize="small" bsStyle="success">Custom</Button>
        </ButtonGroup>
      </div>
    );
  }
}

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

class DeltaModeSelector extends Component {
  constructor(props) {
    super()
    this.state = {
      deltaMode: ""
    }
  }
  onDeltaModeSelected(deltaMode) {
    this.setState({
      deltaMode: deltaMode
    })
    emitter.emit('deltaModeSelected', deltaMode)
  }
  render() {
    return (
      <div className="App-menugroup">
        <div className="App-menugroup-header">Select delta mode <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'deltaFromStartDate')} active={this.state.deltaMode === 'deltaFromStartDate'}>Absolute</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'deltaFromLeftDate')} active={this.state.deltaMode === 'deltaFromLeftDate'}>Relative</Button>
        </ButtonGroup>
      </div>
    );
  }
}

class PlayerStatsTab extends Component {
  render() {
    return (
      <div>
        <StartDateSelector />
        <StatPresetSelector />
        <DeltaModeSelector />
        <StatTable />
      </div>
    );
  }
}

class StatTable extends Component {
  constructor () {
    super()
    this.state = {playerStats: { stats: [] }};
    let _this = this;
    emitter.on('statPresetSelected', function(preset) {
      _this.setState({ statPresetSelected: preset });
      _this.setState(getPlayerStats());
    })
    emitter.on('deltaModeSelected', function(deltaMode) {
      _this.setState({
        deltaModeSelected: deltaMode,
      });
    })
  }
  generateHeaderRow() {
  }
  generateStatRows() {
    var data = this.state.playerStats;
    var rows = data.stats.map(function(stat) {
      return (
        <tr>
          <td> {stat.amountXp} </td>
          <td> {stat.damageDealt} </td>
          <td> {stat.averageXp} </td>
          <td> {stat.averageFrags} </td>
          <td> {stat.averageDamage} </td>
          <td> {stat.battlesCount} </td>
          <td> {stat.hitsRatio} </td>
          <td> {stat.winsRatio} </td>
          <td> {stat.survivedRatio} </td>
          <td> {stat.globalRating} </td>
          <td> {stat.fragsCount} </td>
          <td> {stat.maxXp} </td>
        </tr>
      );
    });
    return rows;
  }
  render() {
    var headerRow = this.generateHeaderRow();
    var statRows = this.generateStatRows();
    return (
      <div className="App-clear">
        <table>
          <thead>{headerRow}</thead>
          <tbody>{statRows}</tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNavbar />
        <MainNavigation />
      </div>
    );
  }
}

export default App;
