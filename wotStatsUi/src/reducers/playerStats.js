
import { playerStatsModelDefinition } from '../const/Const.js';

export default function playerStats(state={
    playerStats: [],
    columnVisibility: {
      max: false,
      totals: false,
      avgs: true,
      ratios: true
    },
    cellVisibility: {
      stat: true,
      delta: true,
      effective: true
    },
    deltaMode: 'relative'
  }, action) {

  function recalculateStats(stats, deltaMode) {
    return stats.map((oldStat, index) => {
      var stat = Object.assign({}, oldStat)
      var previousStat = {}
      if (deltaMode === "relative") {
        if (index + 1 < stats.length) { previousStat = stats[index + 1]; }
      }
      if (deltaMode === "absolute") {
        previousStat = stats[0];
      }

      var battleDelta = stat.battles - previousStat.battles

      playerStatsModelDefinition.forEach((config) => {
        var statDelta = (stat[config.property] - previousStat[config.property]).toFixed(2)
        stat[config.property + "Delta"] = statDelta

        if (config.hasOwnProperty("effectiveProperty")) {
          var effectiveStatDelta = stat[config.effectiveProperty] - previousStat[config.effectiveProperty]
          var effectiveValue = (effectiveStatDelta / battleDelta).toFixed(2);
          if (!isNaN(effectiveValue)) {
            stat[config.property + "Effective"] = effectiveValue
          }
        }
      })
      return stat;
    });
  }

  switch (action.type) {

    case "FETCH_PLAYER_STATS_FULFILLED": {
      var stats = recalculateStats(action.payload.playerStats, state.deltaMode)
      return {...state, playerStats: stats}
    }

    case "TOGGLE_STATS_COLUMN_GROUP_VISIBILITY": {
      var columnVisibility = state.columnVisibility;
      return {...state, columnVisibility: { ...columnVisibility, [action.payload] : !columnVisibility[action.payload]}}
    }

    case "TOGGLE_STATS_CELL_VISIBILITY": {
      var cellVisibility = state.cellVisibility;
      return {...state, cellVisibility: { ...cellVisibility, [action.payload] : !cellVisibility[action.payload]}}
    }

    case "DELTA_MODE_SELECTED": {
      var newStats = recalculateStats(state.playerStats, action.payload)
      return {...state, deltaMode: action.payload, playerStats: newStats}
    }

    default:
      return state;
  }
}