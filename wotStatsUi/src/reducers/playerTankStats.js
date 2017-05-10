import { playerTanksStatsModelDefinition, playerTankStatsChartsDefinition } from '../const/Const.js';
import { recalculateStats, recalculateCharts } from './common.js'

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
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_SELECTED": {
      var newState = { ...state.tankSelection, tank: action.payload }
      return {...state, tankSelection: newState }
    }

    case "FETCH_PLAYER_TANK_STATS_FULFILLED": {
      var newStats = recalculateStats(playerTanksStatsModelDefinition, action.payload.playerTankStats, state.deltaMode)
      var charts = recalculateCharts(playerTankStatsChartsDefinition, newStats)
      return {...state, playerTankStats: newStats, charts: charts }
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
      var newStats = recalculateStats(playerTanksStatsModelDefinition, state.playerTankStats, action.payload)
      var charts = recalculateCharts(playerTankStatsChartsDefinition, newStats)
      return {...state, deltaMode: action.payload, playerTankStats: newStats, charts: charts }
    }

    default:
      return state;
  }
}