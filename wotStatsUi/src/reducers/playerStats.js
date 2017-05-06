import { playerStatsModelDefinition, playerStatsChartsDefinition } from '../const/Const.js';

export default function playerStats(state={
    playerStats: [],
    charts: [],
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

  function getMax(value) {
    return Math.min(value + 1, value * 1.01);
  }

  function getMin(value) {
    return Math.max(value - 1, value * 0.99);
  }

  function recalculateCharts(stats) {
    return playerStatsChartsDefinition.map((definition) => {

      var { property, title } = definition;
      var modelStat = [];
      var modelEffective = [];

      stats.forEach((val) => {
        modelStat.push({x: val.timestamp, y: val[property]});
        if (val[property + "Effective"]) {
          modelEffective.push({x: val.timestamp, y: val[property + "Effective"]});
        }
      })

      var minStat = Math.min(...modelStat.map((stat) => stat.y))
      var maxStat = Math.max(...modelStat.map((stat) => stat.y))
      var minEffectiveStat = Math.min(...modelEffective.map((stat) => stat.y))
      var maxEffectiveStat = Math.max(...modelEffective.map((stat) => stat.y))

      var effectiveStatChartMin = getMin(Math.min( minStat, minEffectiveStat ))
      var effectiveStatChartMax = getMax(Math.max( maxStat, maxEffectiveStat ))

      return { property: property, title: title, statData: modelStat, effectiveStatData: modelEffective,
        statChartRange: [ getMin(minStat), getMax(maxStat) ],
        effectiveStatChartRange: [ effectiveStatChartMin, effectiveStatChartMax ]}
    });
  }

  switch (action.type) {

    case "FETCH_PLAYER_STATS_FULFILLED": {
      var newStats = recalculateStats(action.payload.playerStats, state.deltaMode)
      var charts = recalculateCharts(newStats)
      return {...state, playerStats: newStats, charts: charts}
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
      var charts = recalculateCharts(newStats)
      return {...state, deltaMode: action.payload, playerStats: newStats, charts: charts}
    }

    default:
      return state;
  }
}