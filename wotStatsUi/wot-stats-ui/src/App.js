import React, { Component } from 'react';
import { Tab, Tabs, Button, ButtonGroup, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
      <div>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Player">
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
      <div>
        <b>Select stats preset:</b><br/>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10days')} active={this.state.preset === '10days'}>Last 10 days</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10weeks')} active={this.state.preset === '10weeks'}>Last 10 weeks</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onPresetSelected.bind(this, '10moths')} active={this.state.preset === '10moths'}>Last 10 months</Button>
          <Button bsSize="small" bsStyle="success">Custom</Button>
        </ButtonGroup>
      </div>
    );
  }
}

class StartDateSelector extends Component {
  render() {
    return (
      <div>
        <b>Select base date: </b>
        <DatePicker id="tab-player-datepicker" bsSize="small"/>
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
      <div>
        <b>Select delta mode: </b><br/>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'deltaFromStartDate')} active={this.state.deltaMode === 'deltaFromStartDate'}>Delta from start date</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'deltaFromLeftDate')} active={this.state.deltaMode === 'deltaFromLeftDate'}>Delta from adjacent date</Button>
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
        <hr/>
        <StatTable />
      </div>
    );
  }
}

class StatTable extends Component {
  constructor () {
    super()
    this.state = {tableStats: { stats: [] }};
    let _this = this;
    emitter.on('statPresetSelected', function(preset) {
      _this.setState({
        statPresetSelected: preset,
        tableStats: { stats: [
          {stat: 1, damage: 2},
          {stat: 2, damage: 3}
        ]}
      });
    })
    emitter.on('deltaModeSelected', function(deltaMode) {
      _this.setState({
        deltaModeSelected: deltaMode,
        tableStats: { stats: [
          {stat: 1, damage: 2},
          {stat: 2, damage: 3},
          {stat: 4, damage: 6}
        ]}
      });
    })
  }
  generateHeaderRow() {
  }
  generateStatRows() {
    var data = this.state.tableStats;
    var rows = data.stats.map(function(stat) {
      return (
        <tr>
          <td> {stat.stat} </td>
          <td> {stat.damage} </td>
        </tr>
      );
    });
    return rows;
  }
  render() {
    var headerRow = this.generateHeaderRow();
    var statRows = this.generateStatRows();
    return (
      <div>
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
