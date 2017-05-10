import { playerStatsModelDefinition, playerStatsChartsDefinition } from '../const/Const.js';
import { recalculateStats, recalculateCharts } from './common.js'

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

  switch (action.type) {

    case "FETCH_PLAYER_STATS_FULFILLED": {
      var newStats = recalculateStats(playerStatsModelDefinition, action.payload.playerStats, state.deltaMode)
      var charts = recalculateCharts(playerStatsChartsDefinition, newStats)
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
      var newStats = recalculateStats(playerStatsModelDefinition, state.playerStats, action.payload)
      var charts = recalculateCharts(playerStatsChartsDefinition, newStats)
      return {...state, deltaMode: action.payload, playerStats: newStats, charts: charts}
    }

    default:
      return state;
  }
}