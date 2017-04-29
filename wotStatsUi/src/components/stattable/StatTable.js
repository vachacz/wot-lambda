import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

import Visibility from '../util/Visibility.js';
import DateCell from './DateCell.js';
import StatCell from './StatCell.js';

import { getPlayerStats } from '../../api/WotMyStatsClient.js';
import emitter from '../../const/Const.js';

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

export default StatTable;