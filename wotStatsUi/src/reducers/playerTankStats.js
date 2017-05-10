import { playerTankStatsModelDefinition, playerTankStatsChartsDefinition } from '../const/Const.js';

export default function playerStats(state={
    tanks: [],
    tanksFiltered: [],
    playerTankStats: [],
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
    tankSelection: {
      tier: "",
      type: "",
      nation: "",
      tank: ""
    },
    deltaMode: 'relative'
  }, action) {

  // START code duplication

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

      playerTankStatsModelDefinition.forEach((config) => {
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
    return playerTankStatsChartsDefinition.map((definition) => {

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

  // END code duplication

  function filterTanks(tanks, tankSelection) {
    var result = tanks;
    if (tankSelection.tier) {
      var split = tankSelection.tier.split(",");
      result = result.filter((tank) => split.includes(tank.level))
    }
    if (tankSelection.type) {
      var split = tankSelection.type.split(",");
      result = result.filter((tank) => split.includes(tank.type))
    }
    if (tankSelection.nation) {
      var split = tankSelection.nation.split(",");
      result = result.filter((tank) => split.includes(tank.nation))
    }
    return result;
  }

  switch (action.type) {

    case "FETCH_TANKS_FULFILLED": {
      var filtered = filterTanks(action.payload.tanks, state.tankSelection);
      return {...state, tanks: action.payload.tanks, tanksFiltered: filtered }
    }

    case "TANK_TIER_SELECTED": {
      var newState = { ...state.tankSelection, tier: action.payload }
      var filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_TYPE_SELECTED": {
      var newState = { ...state.tankSelection, type: action.payload }
      var filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_NATION_SELECTED": {
      var newState = { ...state.tankTankSelection, nation: action.payload }
      var filtered = filterTanks(state.tanks, newState);
      return {...state, tankTankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_SELECTED": {
      var newState = { ...state.tankSelection, tank: action.payload }
      return {...state, tankSelection: newState }
    }

    case "FETCH_PLAYER_TANK_STATS_FULFILLED": {
      return {...state, playerTankStats: action.payload.playerTankStats }
    }

    case "TOGGLE_TANK_STATS_COLUMN_GROUP_VISIBILITY": {
      var columnVisibility = state.columnVisibility;
      return {...state, columnVisibility: { ...columnVisibility, [action.payload] : !columnVisibility[action.payload]}}
    }

    case "TOGGLE_TANK_STATS_CELL_VISIBILITY": {
      var cellVisibility = state.cellVisibility;
      return {...state, cellVisibility: { ...cellVisibility, [action.payload] : !cellVisibility[action.payload]}}
    }

    case "TANK_STATS_DELTA_MODE_SELECTED": {
      var newStats = recalculateStats(state.playerTankStats, action.payload)
      var charts = recalculateCharts(newStats)
      return {...state, deltaMode: action.payload, playerTankStats: newStats, charts: charts}
    }

    default:
      return state;
  }
}