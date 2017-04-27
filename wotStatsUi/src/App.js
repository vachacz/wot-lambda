import React, { Component } from 'react';
import { getPlayers, getPlayerStats } from './api/WotMyStatsClient.js';
import { Tab, Tabs, Button, ButtonGroup, Navbar, Nav, NavItem, Table, Glyphicon, Tooltip, OverlayTrigger, NavDropdown, MenuItem } from 'react-bootstrap';
import './App.css';

var moment = require('moment');

var DatePicker = require("react-bootstrap-date-picker");
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

class MainNavbar extends Component {
  constructor(props) {
    super()
    this.state = { player: "", players: [] }
  }
  componentWillMount() {
    getPlayers(this)
  }
  onPlayerSelected(i) {
    var player = this.state.players[i]
    emitter.emit('playerSelected', player.account_id)
    this.setState({ player: player.player })
  }
  render() {
    var players = []
    for (var i=0; i < this.state.players.length; i++) {
       players.push(
         <MenuItem onSelect={this.onPlayerSelected.bind(this, i)}>{this.state.players[i].player}</MenuItem>
       )
    }
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
              <NavDropdown title={this.state.player} id="basic-nav-dropdown">
                {players}
              </NavDropdown>
              <NavItem href="#">EU</NavItem>
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

class DateCell extends Component {
  render() {
    var dt = moment(parseInt(this.props.timestamp));
    const tooltip = (<Tooltip id="tooltip-bottom">{dt.format("YYYY-MM-DD HH:mm")}</Tooltip>);
    return (
      <td>
        {dt.format("YYYY-MM-DD") + " "}
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <Glyphicon glyph="time"/>
        </OverlayTrigger>
      </td>
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
    if ( delta % 1 !== 0 ) {
      delta = delta.toFixed(2);
    }

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
        playerStats: [],
        playerId: "539195479",
        deltaModeSelected: "relative"
    };
    emitter.on('statPresetSelected', (function(preset) {
      this.setState({ statPresetSelected: preset })
      getPlayerStats(this, this.state.playerId);
    }).bind(this))

    emitter.on('deltaModeSelected', (function(deltaMode) {
      this.setState({ deltaModeSelected: deltaMode })
    }).bind(this))

    emitter.on('playerSelected', (function(playerId) {
      this.setState({ playerId: playerId })
      getPlayerStats(this, playerId);
    }).bind(this))
  }
  generateHeaderRow() {
    return (
      <tr>
        <td>Date</td>
        <td>Battles</td>
        <td>XP <Glyphicon glyph="question-sign" /></td>
        <td>Avg XP <Glyphicon glyph="question-sign" /></td>
        <td>Damage <Glyphicon glyph="question-sign" /></td>
        <td>Avg Dmg</td>
        <td>Frags</td>
        <td>Avg Fr</td>
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
    var rows = this.state.playerStats.map(function(stat, index) {
      var previousStat = {};
      if (_state.deltaModeSelected === "relative") {
        if (index + 1 < _state.playerStats.length) { previousStat = _state.playerStats[index+1]; }
      }
      if (_state.deltaModeSelected === "absolute") {
        previousStat = _state.playerStats[0];
      }
      return (
        <tr>
          <DateCell timestamp={stat.timestamp}/>
          <Stat stats={stat} previousStats={previousStat} property="battlesCount"/>
          <Stat stats={stat} previousStats={previousStat} property="amountXp"/>
          <Stat stats={stat} previousStats={previousStat} property="averageXp" effectiveProperty="amountXp"/>
          <Stat stats={stat} previousStats={previousStat} property="damageDealt"/>
          <Stat stats={stat} previousStats={previousStat} property="averageDamage" effectiveProperty="damageDealt"/>
          <Stat stats={stat} previousStats={previousStat} property="fragsCount"/>
          <Stat stats={stat} previousStats={previousStat} property="averageFrags" effectiveProperty="fragsCount"/>
          <Stat stats={stat} previousStats={previousStat} property="winsRatio"/>
          <Stat stats={stat} previousStats={previousStat} property="hitsRatio"/>
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
          <col width="110px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />
          <col width="83px" />

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
