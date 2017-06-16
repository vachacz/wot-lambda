import { playerTanksStatsModelDefinition, playerTankStatsChartsDefinition } from '../const/Const.js';
import { recalculateStats, calculateAndMergeWn8 } from '../util/stats.js'
import { recalculateCharts } from '../util/charts.js'

export default function playerTankStats(state={
    tanks: [],
    tankMap: {},
    tanksFiltered: [],
    playerTankStats: [],
    wnEfficiencies: {},
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

    case "INITIAL_STATE_LOADED": {
      let filtered = filterTanks(action.payload.tanks, state.tankSelection);
      let tankMap = action.payload.tanks.reduce(function(map, obj) {
        map[obj.tank_id] = obj;
        return map;
      }, {});
      return {...state, tanks: action.payload.tanks, tankMap: tankMap, tanksFiltered: filtered }
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

    case "TANK_SELECTION_REMOVED": {
      let newSelection = { ...state.tankSelection, tank: "" }
      return {...state, playerTankStats: [], charts: [], tankSelection: newSelection }
    }

    case "TANK_SELECTION_COMPLETE": {
      let tankId = action.payload.tankId;
      let newSelection = { ...state.tankSelection, tank: state.tankMap[tankId] }
      let newStats = recalculateStats(playerTanksStatsModelDefinition, action.payload.stats.playerTankStats, state.deltaMode)

      let expectedTankWnStats = state.tankMap[tankId]
      calculateAndMergeWn8(newStats, expectedTankWnStats)

      let charts = recalculateCharts(playerTankStatsChartsDefinition, newStats)
      return {...state, playerTankStats: newStats, charts: charts, tankSelection: newSelection }
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

      let expectedTankWnStats = state.tankMap[state.tankSelection.tank.tank_id]
      calculateAndMergeWn8(newStats, expectedTankWnStats)

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