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
      ratios: true,
      visible: true
    },
    cellVisibility: {
      stat: true,
      delta: false,
      effective: false
    },
    tankSelection: {
      tier: "",
      type: "",
      nation: "",
      tank: ""
    },
    deltaMode: 'relative',
    maxResults: 10
  }, action) {

  function filterTanks(tanks, tankSelection) {
    var result = tanks;
    if (tankSelection.tier) {
      let split = tankSelection.tier.split(",");
      result = result.filter((tank) => split.includes(tank.level))
    }
    if (tankSelection.type) {
      let split = tankSelection.type.split(",");
      result = result.filter((tank) => split.includes(tank.type))
    }
    if (tankSelection.nation) {
      let split = tankSelection.nation.split(",");
      result = result.filter((tank) => split.includes(tank.nation))
    }
    return result;
  }

  switch (action.type) {

    case "FETCH_TANKS_FULFILLED": {
      let filtered = filterTanks(action.payload.tanks, state.tankSelection);
      return {...state, tanks: action.payload.tanks, tanksFiltered: filtered }
    }

    case "TANK_TIER_SELECTED": {
      let newState = { ...state.tankSelection, tier: action.payload }
      let filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_TYPE_SELECTED": {
      let newState = { ...state.tankSelection, type: action.payload }
      let filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_NATION_SELECTED": {
      let newState = { ...state.tankSelection, nation: action.payload }
      let filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_SELECTED": {
      let newState = { ...state.tankSelection, tank: action.payload }
      return {...state, tankSelection: newState }
    }

    case "FETCH_PLAYER_TANK_STATS_FULFILLED": {
      let newStats = recalculateStats(playerTanksStatsModelDefinition, action.payload.playerTankStats, state.deltaMode)
      let charts = recalculateCharts(playerTankStatsChartsDefinition, newStats)
      return {...state, playerTankStats: newStats, charts: charts }
    }

    case "TOGGLE_TANK_STATS_COLUMN_GROUP_VISIBILITY": {
      let columnVisibility = state.columnVisibility;
      return {...state, columnVisibility: { ...columnVisibility, [action.payload] : !columnVisibility[action.payload]}}
    }

    case "TOGGLE_TANK_STATS_CELL_VISIBILITY": {
      let cellVisibility = state.cellVisibility;
      return {...state, cellVisibility: { ...cellVisibility, [action.payload] : !cellVisibility[action.payload]}}
    }

    case "TANK_STATS_DELTA_MODE_SELECTED": {
      let newStats = recalculateStats(playerTanksStatsModelDefinition, state.playerTankStats, action.payload)
      let charts = recalculateCharts(playerTankStatsChartsDefinition, newStats)
      return {...state, deltaMode: action.payload, playerTankStats: newStats, charts: charts }
    }

    case "TANK_STATS_MAX_RESULTS_SELECTED": {
      return {...state, maxResults: action.payload }
    }

    default:
      return state;
  }
}