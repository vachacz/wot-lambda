import React, { Component } from 'react';
import { getPlayers, getPlayerStats, initialVisibleColumnGroups } from './api/WotMyStatsClient.js';
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
    super(props)
    this.state = { preset: "" }
  }
  onPresetSelected(preset) {
    this.setState({ preset: preset })
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

class ColumnVisibilitySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      max: initialVisibleColumnGroups.includes("max"),
      totals: initialVisibleColumnGroups.includes("totals"),
      avgs: initialVisibleColumnGroups.includes("avgs"),
      ratios: initialVisibleColumnGroups.includes("ratios")
    }
  }
  onButtonSelected(button) {
    var newVisibility = !this.state[button]
    if (newVisibility) {
      initialVisibleColumnGroups.push(button)
    } else {
      var index = initialVisibleColumnGroups.indexOf(button)
      if (index !== -1) {
          initialVisibleColumnGroups.splice(index, 1);
      }
    }
    this.setState({ [button]: newVisibility })
    emitter.emit('columnVisibilityChanged', button, newVisibility)
  }
  render() {
    return (
      <div className="App-menugroup-right">
        <div className="App-menugroup-header">Select column visibility <Glyphicon glyph="question-sign" /></div>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'ratios')} active={this.state.ratios}>Ratio</Button>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'avgs')} active={this.state.avgs}>Avg</Button>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'totals')} active={this.state.totals}>Total</Button>
          <Button bsSize="small" bsStyle="primary" onClick={this.onButtonSelected.bind(this, 'max')} active={this.state.max}>Max</Button>
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
    super(props)
    this.state = { deltaMode: "relative" }
  }
  onDeltaModeSelected(deltaMode) {
    this.setState({ deltaMode: deltaMode })
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
        <ColumnVisibilitySelector />
        <StatTable />
      </div>
    );
  }
}

class Visibility extends Component {
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

class StatCell extends Component {
  render() {
    let stat = this.props.stats[this.props.property]
    let previousStat = this.props.previousStats[this.props.property]
    let delta = stat - previousStat
    if ( delta % 1 !== 0 ) {
      delta = delta.toFixed(2);
    }

    let deltaComponent
    if (delta > 0) {
      deltaComponent = <span className="arrow-up"><br/>({delta}<Glyphicon glyph="arrow-up"/>)</span>
    } else if (delta < 0) {
      deltaComponent = <span className="arrow-down"><br/>({delta}<Glyphicon glyph="arrow-down"/>)</span>
    }

    let effectivePropertyComponent
    if (this.props.effectiveProperty) {
      let battleDelta = this.props.stats["battles"] - this.props.previousStats["battles"]
      let propertyDelta = this.props.stats[this.props.effectiveProperty] - this.props.previousStats[this.props.effectiveProperty]
      let effectiveAverage = (propertyDelta / battleDelta).toFixed(2);

      if (!isNaN(effectiveAverage)) {
        effectivePropertyComponent = <span className="effective-property"><br/>{effectiveAverage}</span>
      }
    }

    return ( <td>{stat}{deltaComponent}{effectivePropertyComponent}</td> );
  }
}

class StatTable extends Component {
  constructor () {
    super()
    this.state = {
        playerStats: [],
        playerId: "",
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
        <td>time</td>
        <Visibility group="totals"><td>battles</td></Visibility>
        <Visibility group="totals"><td>wins</td></Visibility>
        <Visibility group="ratios"><td>wins %</td></Visibility>
        <Visibility group="totals"><td>losses</td></Visibility>
        <Visibility group="ratios"><td>losses %</td></Visibility>
        <Visibility group="totals"><td>draws</td></Visibility>
        <Visibility group="ratios"><td>draws %</td></Visibility>
        <Visibility group="totals"><td>survived</td></Visibility>
        <Visibility group="ratios"><td>survived %</td></Visibility>
        <Visibility group="totals"><td>damage</td></Visibility>
        <Visibility group="avgs"><td>damage avg</td></Visibility>
        <Visibility group="avgs"><td>ass avg</td></Visibility>
        <Visibility group="avgs"><td>ass radio avg</td></Visibility>
        <Visibility group="avgs"><td>ass track avg</td></Visibility>
        <Visibility group="totals"><td>xp</td></Visibility>
        <Visibility group="avgs"><td>avg xp</td></Visibility>
        <Visibility group="totals"><td>frags</td></Visibility>
        <Visibility group="avgs"><td>avg frags</td></Visibility>
        <Visibility group="totals"><td>spotted</td></Visibility>
        <Visibility group="avgs"><td>avg spotted</td></Visibility>
        <Visibility group="totals"><td>shots</td></Visibility>
        <Visibility group="avgs"><td>avg shots</td></Visibility>
        <Visibility group="totals"><td>hits</td></Visibility>
        <Visibility group="avgs"><td>avg hits</td></Visibility>
        <Visibility group="ratios"><td>hits %</td></Visibility>
        <Visibility group="totals"><td>piercings</td></Visibility>
        <Visibility group="avgs"><td>avg piercings</td></Visibility>
        <Visibility group="totals"><td>piercings rcv</td></Visibility>
        <Visibility group="avgs"><td>avg piercings rcv</td></Visibility>
        <Visibility group="totals"><td>expl hits</td></Visibility>
        <Visibility group="avgs"><td>avg expl hits</td></Visibility>
        <Visibility group="totals"><td>expl hits rcv</td></Visibility>
        <Visibility group="avgs"><td>avg expl hits rcv</td></Visibility>
        <Visibility group="totals"><td>hits rcv</td></Visibility>
        <Visibility group="avgs"><td>avg hits rcv</td></Visibility>
        <Visibility group="totals"><td>damage rcv</td></Visibility>
        <Visibility group="avgs"><td>avg damage rcv</td></Visibility>
        <Visibility group="totals"><td>capture</td></Visibility>
        <Visibility group="avgs"><td>avg capture</td></Visibility>
        <Visibility group="totals"><td>decap</td></Visibility>
        <Visibility group="avgs"><td>avg decap</td></Visibility>
        <Visibility group="avgs"><td>avg dam block</td></Visibility>
        <Visibility group="max"><td>max damage</td></Visibility>
        <Visibility group="max"><td>max xp</td></Visibility>
        <Visibility group="max"><td>max frags</td></Visibility>
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
          <DateCell timestamp={stat.timestamp} />
          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="battles"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="wins"/></Visibility>
          <Visibility group="ratios"><StatCell stats={stat} previousStats={previousStat} property="winsRatio"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="losses"/></Visibility>
          <Visibility group="ratios"><StatCell stats={stat} previousStats={previousStat} property="lossesRatio"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="draws"/></Visibility>
          <Visibility group="ratios"><StatCell stats={stat} previousStats={previousStat} property="drawsRatio"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="survivedBattles"/></Visibility>
          <Visibility group="ratios"><StatCell stats={stat} previousStats={previousStat} property="survivedBattlesRatio"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="damageDealt"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDamageDealt" effectiveProperty="damageDealt"/></Visibility>

          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDamageAssisted"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDamageAssistedRadio"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDamageAssistedTrack"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="xp"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgBattleXp" effectiveProperty="xp"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="frags"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgFrags" effectiveProperty="frags"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="spotted"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgSpotted" effectiveProperty="spotted"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="shots"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgShots" effectiveProperty="shots"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="hits"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgHits" effectiveProperty="hits"/></Visibility>
          <Visibility group="ratios"><StatCell stats={stat} previousStats={previousStat} property="hitsRatio"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="piercings"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgPiercings" effectiveProperty="piercings"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="piercingsReceived"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgPiercingsReceived" effectiveProperty="piercingsReceived"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="explosionHits"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgExplosionHits" effectiveProperty="explosionHits"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="explosionHitsReceived"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgExplosionHitsReceived" effectiveProperty="explosionHitsReceived"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="directHitsReceived"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDirectHitsReceived" effectiveProperty="directHitsReceived"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="damageReceived"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDamageReceived" effectiveProperty="damageReceived"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="capturePoints"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgCapturePoints" effectiveProperty="capturePoints"/></Visibility>

          <Visibility group="totals"><StatCell stats={stat} previousStats={previousStat} property="droppedCapturePoints"/></Visibility>
          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDroppedCapturePoints" effectiveProperty="droppedCapturePoints"/></Visibility>

          <Visibility group="avgs"><StatCell stats={stat} previousStats={previousStat} property="avgDamageBlocked"/></Visibility>

          <Visibility group="max"><StatCell stats={stat} previousStats={previousStat} property="maxDamage"/></Visibility>
          <Visibility group="max"><StatCell stats={stat} previousStats={previousStat} property="maxXp"/></Visibility>
          <Visibility group="max"><StatCell stats={stat} previousStats={previousStat} property="maxFrags"/></Visibility>
        </tr>
      );
    });
    return rows;
  }
  render() {
    var headerRow = this.generateHeaderRow();
    var statRows = this.generateStatRows();
    if (this.state.playerStats.length === 0) return <div style={{ clear: "both", color: "red", fontWeight: "bold" }}><br/><br/>Select user from dropdown menu.</div>
    return (
      <div className="App-clear">
        <Table bsClass="App-stats-table table-striped table-bordered table-condensed table-hover">
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
