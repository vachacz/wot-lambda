import React, { Component } from 'react';
import { Tab, Tabs, Button, ButtonToolbar } from 'react-bootstrap';
// import { DatePicker } from 'react-bootstrap-date-picker';
import './App.css';

var DatePicker = require("react-bootstrap-date-picker");

class LoginDetails extends Component {
  render() {
    return (
      <div>
        <b>Account: </b> hawtank <b>Server: </b> EU
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
  render() {
    return (
      <div>
        Select stats preset:
        <ButtonToolbar>
          <Button bsSize="small" bsStyle="primary">Last 10 days</Button>
          <Button bsSize="small" bsStyle="primary">Last 10 weeks</Button>
          <Button bsSize="small" bsStyle="primary">Last 10 months</Button>
          <Button bsSize="small" bsStyle="primary">Custom</Button>
        </ButtonToolbar>
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
  render() {
    return (
      <div>
        <b>Select delta mode: </b>
        <ButtonToolbar>
          <Button bsSize="small" bsStyle="primary">Incremental</Button>
          <Button bsSize="small" bsStyle="primary">Absolute</Button>
        </ButtonToolbar>
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
  render() {
    return (
      <div>
        <table>
          <tr>
            <td>tabelka</td>
          </tr>
        </table>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginDetails />
        <MainNavigation />
      </div>
    );
  }
}

export default App;
