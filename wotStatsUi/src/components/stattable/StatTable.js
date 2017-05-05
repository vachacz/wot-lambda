import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

import StatHeader from './StatHeader.js';
import DateCell from './DateCell.js';
import StatCell from './StatCell.js';

export default class StatTable extends Component {

  generateHeaderRow() {
    return (
      <tr>
        <td>time</td>
        <StatHeader group="totals" desc="battles" />
        <StatHeader group="totals" desc="wins" />
        <StatHeader group="ratios" desc="wins %" />
        <StatHeader group="totals" desc="losses" />
        <StatHeader group="ratios" desc="losses %" />
        <StatHeader group="totals" desc="draws" />
        <StatHeader group="ratios" desc="draws %" />
        <StatHeader group="totals" desc="survived" />
        <StatHeader group="ratios" desc="survived %" />
        <StatHeader group="totals" desc="damage" />
        <StatHeader group="avgs" desc="damage avg" />
        <StatHeader group="avgs" desc="ass avg" />
        <StatHeader group="avgs" desc="ass radio avg" />
        <StatHeader group="avgs" desc="ass track avg" />
        <StatHeader group="totals" desc="xp" />
        <StatHeader group="avgs" desc="avg xp" />
        <StatHeader group="totals" desc="frags" />
        <StatHeader group="avgs" desc="avg frags" />
        <StatHeader group="totals" desc="spotted" />
        <StatHeader group="avgs" desc="avg spotted" />
        <StatHeader group="totals" desc="shots" />
        <StatHeader group="avgs" desc="avg shots" />
        <StatHeader group="totals" desc="hits" />
        <StatHeader group="avgs" desc="avg hits" />
        <StatHeader group="ratios" desc="hits %" />
        <StatHeader group="totals" desc="piercings" />
        <StatHeader group="avgs" desc="avg piercings" />
        <StatHeader group="totals" desc="piercings rcv" />
        <StatHeader group="avgs" desc="avg piercings rcv" />
        <StatHeader group="totals" desc="expl hits" />
        <StatHeader group="avgs" desc="avg expl hits" />
        <StatHeader group="totals" desc="expl hits rcv" />
        <StatHeader group="avgs" desc="avg expl hits rcv" />
        <StatHeader group="totals" desc="hits rcv" />
        <StatHeader group="avgs" desc="avg hits rcv" />
        <StatHeader group="totals" desc="damage rcv" />
        <StatHeader group="avgs" desc="avg damage rcv" />
        <StatHeader group="totals" desc="capture" />
        <StatHeader group="avgs" desc="avg capture" />
        <StatHeader group="totals" desc="decap" />
        <StatHeader group="avgs" desc="avg decap" />
        <StatHeader group="avgs" desc="avg dam block" />
        <StatHeader group="max" desc="max damage" />
        <StatHeader group="max" desc="max xp" />
        <StatHeader group="max" desc="max frags" />
      </tr>
    );
  }

  generateStatRows() {
    var playerStats = this.props.playerStats;
    return playerStats.map((stat, index) => {
      return (
        <tr key={stat.timestamp}>
          <DateCell timestamp={stat.timestamp} />
          <StatCell stats={stat} group="totals" property="battles" />

          <StatCell stats={stat} group="totals" property="wins" />
          <StatCell stats={stat} group="ratios" property="winsRatio" />

          <StatCell stats={stat} group="totals" property="losses" />
          <StatCell stats={stat} group="ratios" property="lossesRatio" />

          <StatCell stats={stat} group="totals" property="draws" />
          <StatCell stats={stat} group="ratios" property="drawsRatio" />

          <StatCell stats={stat} group="totals" property="survivedBattles" />
          <StatCell stats={stat} group="ratios" property="survivedBattlesRatio" />

          <StatCell stats={stat} group="totals" property="damageDealt" />
          <StatCell stats={stat} group="avgs" property="avgDamageDealt" effectiveProperty="effectiveAvgDamageDealt" />

          <StatCell stats={stat} group="avgs" property="avgDamageAssisted" />
          <StatCell stats={stat} group="avgs" property="avgDamageAssistedRadio" />
          <StatCell stats={stat} group="avgs" property="avgDamageAssistedTrack" />

          <StatCell stats={stat} group="totals" property="xp" />
          <StatCell stats={stat} group="avgs" property="avgBattleXp" effectiveProperty="effectiveAvgBattleXp" />

          <StatCell stats={stat} group="totals" property="frags" />
          <StatCell stats={stat} group="avgs" property="avgFrags" effectiveProperty="effectiveAvgFrags" />

          <StatCell stats={stat} group="totals" property="spotted" />
          <StatCell stats={stat} group="avgs" property="avgSpotted" effectiveProperty="effectiveAvgSpotted" />

          <StatCell stats={stat} group="totals" property="shots" />
          <StatCell stats={stat} group="avgs" property="avgShots" effectiveProperty="effectiveAvgShots" />

          <StatCell stats={stat} group="totals" property="hits" />
          <StatCell stats={stat} group="avgs" property="avgHits" effectiveProperty="effectiveAvgHits" />
          <StatCell stats={stat} group="ratios" property="hitsRatio" />

          <StatCell stats={stat} group="totals" property="piercings" />
          <StatCell stats={stat} group="avgs" property="avgPiercings" effectiveProperty="effectiveAvgPiercings" />

          <StatCell stats={stat} group="totals" property="piercingsReceived" />
          <StatCell stats={stat} group="avgs" property="avgPiercingsReceived" effectiveProperty="effectiveAvgPiercingsReceived" />

          <StatCell stats={stat} group="totals" property="explosionHits" />
          <StatCell stats={stat} group="avgs" property="avgExplosionHits" effectiveProperty="effectiveAvgExplosionHits" />

          <StatCell stats={stat} group="totals" property="explosionHitsReceived" />
          <StatCell stats={stat} group="avgs" property="avgExplosionHitsReceived" effectiveProperty="effectiveAvgExplosionHitsReceived" />

          <StatCell stats={stat} group="totals" property="directHitsReceived" />
          <StatCell stats={stat} group="avgs" property="avgDirectHitsReceived" effectiveProperty="effectiveAvgDirectHitsReceived" />

          <StatCell stats={stat} group="totals" property="damageReceived" />
          <StatCell stats={stat} group="avgs" property="avgDamageReceived" effectiveProperty="effectiveAvgDamageReceived" />

          <StatCell stats={stat} group="totals" property="capturePoints" />
          <StatCell stats={stat} group="avgs" property="avgCapturePoints" effectiveProperty="effectiveAvgCapturePoints" />

          <StatCell stats={stat} group="totals" property="droppedCapturePoints" />
          <StatCell stats={stat} group="avgs" property="avgDroppedCapturePoints" effectiveProperty="effectiveAvgDroppedCapturePoints" />

          <StatCell stats={stat} group="avgs" property="avgDamageBlocked" />

          <StatCell stats={stat} group="max" property="maxDamage" />
          <StatCell stats={stat} group="max" property="maxXp" />
          <StatCell stats={stat} group="max" property="maxFrags" />
        </tr>
      );
    });
  }

  render() {
    if (this.props.playerStats.length === 0) return <div style={{ clear: "both", color: "red", fontWeight: "bold" }}><br/><br/>Select user from dropdown menu.</div>
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
