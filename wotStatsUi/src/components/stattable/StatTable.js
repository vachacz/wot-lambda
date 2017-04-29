import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

import Visibility from '../util/Visibility.js';
import DateCell from './DateCell.js';
import StatCell from './StatCell.js';
import StatsRow from './StatsRow.js';

import { getPlayerStats } from '../../api/WotMyStatsClient.js';
import emitter from '../../const/Const.js';

export default class StatTable extends Component {
  constructor () {
    super()
    this.state = { playerStats: [], deltaMode: "relative" };

    emitter.on('playerSelected', (playerId) =>
      getPlayerStats(playerId, (playerStats) => this.setState(Object.assign(playerStats, { playerId: playerId })))
    )

    emitter.on('statPresetSelected', (preset) =>
      getPlayerStats(this.state.playerId, (playerStats) => this.setState(playerStats))
    )

    emitter.on('deltaModeSelected', (deltaMode) => this.setState({ deltaMode: deltaMode }))
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
    return this.state.playerStats.map((stat, index) => {
      var previousStat = {};
      if (this.state.deltaMode === "relative") {
        if (index + 1 < this.state.playerStats.length) { previousStat = this.state.playerStats[index+1]; }
      }
      if (this.state.deltaMode === "absolute") {
        previousStat = this.state.playerStats[0];
      }
      return (
        <StatsRow key={stat.timestamp} stats={stat} previousStats={previousStat}>
          <DateCell timestamp={stat.timestamp} />
          <StatCell group="totals" property="battles"/>

          <StatCell group="totals" property="wins"/>
          <StatCell group="ratios" property="winsRatio"/>

          <StatCell group="totals" property="losses"/>
          <StatCell group="ratios" property="lossesRatio"/>

          <StatCell group="totals" property="draws"/>
          <StatCell group="ratios" property="drawsRatio"/>

          <StatCell group="totals" property="survivedBattles"/>
          <StatCell group="ratios" property="survivedBattlesRatio"/>

          <StatCell group="totals" property="damageDealt"/>
          <StatCell group="avgs" property="avgDamageDealt" effectiveProperty="damageDealt"/>

          <StatCell group="avgs" property="avgDamageAssisted"/>
          <StatCell group="avgs" property="avgDamageAssistedRadio"/>
          <StatCell group="avgs" property="avgDamageAssistedTrack"/>

          <StatCell group="totals" property="xp"/>
          <StatCell group="avgs" property="avgBattleXp" effectiveProperty="xp"/>

          <StatCell group="totals" property="frags"/>
          <StatCell group="avgs" property="avgFrags" effectiveProperty="frags"/>

          <StatCell group="totals" property="spotted"/>
          <StatCell group="avgs" property="avgSpotted" effectiveProperty="spotted"/>

          <StatCell group="totals" property="shots"/>
          <StatCell group="avgs" property="avgShots" effectiveProperty="shots"/>

          <StatCell group="totals" property="hits"/>
          <StatCell group="avgs" property="avgHits" effectiveProperty="hits"/>
          <StatCell group="ratios" property="hitsRatio"/>

          <StatCell group="totals" property="piercings"/>
          <StatCell group="avgs" property="avgPiercings" effectiveProperty="piercings"/>

          <StatCell group="totals" property="piercingsReceived"/>
          <StatCell group="avgs" property="avgPiercingsReceived" effectiveProperty="piercingsReceived"/>

          <StatCell group="totals" property="explosionHits"/>
          <StatCell group="avgs" property="avgExplosionHits" effectiveProperty="explosionHits"/>

          <StatCell group="totals" property="explosionHitsReceived"/>
          <StatCell group="avgs" property="avgExplosionHitsReceived" effectiveProperty="explosionHitsReceived"/>

          <StatCell group="totals" property="directHitsReceived"/>
          <StatCell group="avgs" property="avgDirectHitsReceived" effectiveProperty="directHitsReceived"/>

          <StatCell group="totals" property="damageReceived"/>
          <StatCell group="avgs" property="avgDamageReceived" effectiveProperty="damageReceived"/>

          <StatCell group="totals" property="capturePoints"/>
          <StatCell group="avgs" property="avgCapturePoints" effectiveProperty="capturePoints"/>

          <StatCell group="totals" property="droppedCapturePoints"/>
          <StatCell group="avgs" property="avgDroppedCapturePoints" effectiveProperty="droppedCapturePoints"/>

          <StatCell group="avgs" property="avgDamageBlocked"/>

          <StatCell group="max" property="maxDamage"/>
          <StatCell group="max" property="maxXp"/>
          <StatCell group="max" property="maxFrags"/>
        </StatsRow>
      );
    });
  }
  render() {
    if (this.state.playerStats.length === 0) return <div style={{ clear: "both", color: "red", fontWeight: "bold" }}><br/><br/>Select user from dropdown menu.</div>
    return (
      <div className="App-clear">
        <Table bsClass="App-stats-table table-striped table-bordered table-condensed table-hover">
          <thead>{ this.generateHeaderRow() }</thead>
          <tbody>{ this.generateStatRows() }</tbody>
        </Table>
      </div>
    );
  }
}
