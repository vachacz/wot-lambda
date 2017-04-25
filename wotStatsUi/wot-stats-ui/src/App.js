import React, { Component } from 'react';
import { getPlayerStats, getPlayerTankStats } from './api/WotMyStatsClient.js';
import { Tab, Tabs, Button, ButtonGroup, Navbar, Nav, NavItem, Table, Glyphicon } from 'react-bootstrap';
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
      deltaMode: "relative"
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
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'absolute')} active={this.state.deltaMode === 'absolute'}>Absolute</Button>
          <Button bsSize="small" bsStyle="success" onClick={this.onDeltaModeSelected.bind(this, 'relative')} active={this.state.deltaMode === 'relative'}>Relative</Button>
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

class Stat extends Component {
  render() {
    let stat = this.props.stats[this.props.property]
    let previousStat = this.props.previousStats[this.props.property]
    let delta = stat - previousStat

    let deltaComponent
    if (delta > 0) {
      deltaComponent = <span className="arrow-up">({delta}<Glyphicon glyph="arrow-up"/>)</span>
    } else if (delta < 0) {
      deltaComponent = <span className="arrow-down">({delta}<Glyphicon glyph="arrow-down"/>)</span>
    }

    let effectivePropertyComponent
    if (this.props.effectiveProperty) {
      let battleDelta = this.props.stats["battlesCount"] - this.props.previousStats["battlesCount"]
      let propertyDelta = this.props.stats[this.props.effectiveProperty] - this.props.previousStats[this.props.effectiveProperty]
      let effectiveAverage = (propertyDelta / battleDelta).toFixed(2);

      if (!isNaN(effectiveAverage)) {
        effectivePropertyComponent = <span className="effective-property">{effectiveAverage}</span>
      }
    }

    return ( <td>{stat}<br/>{deltaComponent}<br/>{effectivePropertyComponent}</td> );
  }
}

class StatTable extends Component {
  constructor () {
    super()
    this.state = {
        playerStats: { stats: [] },
        deltaModeSelected: "relative"
    };
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
    return (
      <tr>
        <td>Bat cnt</td>
        <td>XP <Glyphicon glyph="question-sign" /></td>
        <td>Frags</td>
        <td>Damage <Glyphicon glyph="question-sign" /></td>
        <td>Avg XP <Glyphicon glyph="question-sign" /></td>
        <td>Avg Fr</td>
        <td>Avg Dmg</td>
        <td>Hit Rat</td>
        <td>Win Rat</td>
        <td>Surv Rat</td>
        <td>Rating</td>
        <td>Max Xp</td>
      </tr>
    );
  }
  generateStatRows() {
    var _state = this.state;
    var rows = this.state.playerStats.stats.map(function(stat, index) {
      var previousStat = {};
      if (_state.deltaModeSelected === "relative") {
        if (index + 1 < _state.playerStats.stats.length) { previousStat = _state.playerStats.stats[index+1]; }
      }
      if (_state.deltaModeSelected === "absolute") {
        previousStat = _state.playerStats.stats[0];
      }
      return (
        <tr>
          <Stat stats={stat} previousStats={previousStat} property="battlesCount"/>
          <Stat stats={stat} previousStats={previousStat} property="amountXp"/>
          <Stat stats={stat} previousStats={previousStat} property="fragsCount"/>
          <Stat stats={stat} previousStats={previousStat} property="damageDealt"/>
          <Stat stats={stat} previousStats={previousStat} property="averageXp" effectiveProperty="amountXp"/>
          <Stat stats={stat} previousStats={previousStat} property="averageFrags" effectiveProperty="fragsCount"/>
          <Stat stats={stat} previousStats={previousStat} property="averageDamage" effectiveProperty="damageDealt"/>
          <Stat stats={stat} previousStats={previousStat} property="hitsRatio"/>
          <Stat stats={stat} previousStats={previousStat} property="winsRatio"/>
          <Stat stats={stat} previousStats={previousStat} property="survivedRatio"/>
          <Stat stats={stat} previousStats={previousStat} property="globalRating"/>

          <Stat stats={stat} previousStats={previousStat} property="maxXp"/>
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
        <Table bsClass="table table-striped table-bordered table-condensed table-hover App-stats-table">
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />
          <col width="90px" />

          <thead>{headerRow}</thead>
          <tbody>{statRows}</tbody>
        </Table>
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
