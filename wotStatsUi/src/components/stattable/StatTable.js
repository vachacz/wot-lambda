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
      var previousStat = {};
      if (this.props.deltaMode === "relative") {
        if (index + 1 < playerStats.length) { previousStat = playerStats[index+1]; }
      }
      if (this.props.deltaMode === "absolute") {
        previousStat = playerStats[0];
      }
      var props = { stats: stat, previousStats: previousStat }
      return (
        <tr key={stat.timestamp}>
          <DateCell timestamp={stat.timestamp} />
          <StatCell {...props} group="totals" property="battles" />

          <StatCell {...props} group="totals" property="wins" />
          <StatCell {...props} group="ratios" property="winsRatio" />

          <StatCell {...props} group="totals" property="losses" />
          <StatCell {...props} group="ratios" property="lossesRatio" />

          <StatCell {...props} group="totals" property="draws" />
          <StatCell {...props} group="ratios" property="drawsRatio" />

          <StatCell {...props} group="totals" property="survivedBattles" />
          <StatCell {...props} group="ratios" property="survivedBattlesRatio" />

          <StatCell {...props} group="totals" property="damageDealt" />
          <StatCell {...props} group="avgs" property="avgDamageDealt" effectiveProperty="damageDealt" />

          <StatCell {...props} group="avgs" property="avgDamageAssisted" />
          <StatCell {...props} group="avgs" property="avgDamageAssistedRadio" />
          <StatCell {...props} group="avgs" property="avgDamageAssistedTrack" />

          <StatCell {...props} group="totals" property="xp" />
          <StatCell {...props} group="avgs" property="avgBattleXp" effectiveProperty="xp" />

          <StatCell {...props} group="totals" property="frags" />
          <StatCell {...props} group="avgs" property="avgFrags" effectiveProperty="frags" />

          <StatCell {...props} group="totals" property="spotted" />
          <StatCell {...props} group="avgs" property="avgSpotted" effectiveProperty="spotted" />

          <StatCell {...props} group="totals" property="shots" />
          <StatCell {...props} group="avgs" property="avgShots" effectiveProperty="shots" />

          <StatCell {...props} group="totals" property="hits" />
          <StatCell {...props} group="avgs" property="avgHits" effectiveProperty="hits" />
          <StatCell {...props} group="ratios" property="hitsRatio" />

          <StatCell {...props} group="totals" property="piercings" />
          <StatCell {...props} group="avgs" property="avgPiercings" effectiveProperty="piercings" />

          <StatCell {...props} group="totals" property="piercingsReceived" />
          <StatCell {...props} group="avgs" property="avgPiercingsReceived" effectiveProperty="piercingsReceived" />

          <StatCell {...props} group="totals" property="explosionHits" />
          <StatCell {...props} group="avgs" property="avgExplosionHits" effectiveProperty="explosionHits" />

          <StatCell {...props} group="totals" property="explosionHitsReceived" />
          <StatCell {...props} group="avgs" property="avgExplosionHitsReceived" effectiveProperty="explosionHitsReceived" />

          <StatCell {...props} group="totals" property="directHitsReceived" />
          <StatCell {...props} group="avgs" property="avgDirectHitsReceived" effectiveProperty="directHitsReceived" />

          <StatCell {...props} group="totals" property="damageReceived" />
          <StatCell {...props} group="avgs" property="avgDamageReceived" effectiveProperty="damageReceived" />

          <StatCell {...props} group="totals" property="capturePoints" />
          <StatCell {...props} group="avgs" property="avgCapturePoints" effectiveProperty="capturePoints" />

          <StatCell {...props} group="totals" property="droppedCapturePoints" />
          <StatCell {...props} group="avgs" property="avgDroppedCapturePoints" effectiveProperty="droppedCapturePoints" />

          <StatCell {...props} group="avgs" property="avgDamageBlocked" />

          <StatCell {...props} group="max" property="maxDamage" />
          <StatCell {...props} group="max" property="maxXp" />
          <StatCell {...props} group="max" property="maxFrags" />
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

