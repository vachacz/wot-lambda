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
    deltaMode: 'relative',
    maxResults: 10
  }, action) {

  switch (action.type) {

    case "FETCH_PLAYER_STATS_FULFILLED": {
      let newStats = recalculateStats(playerStatsModelDefinition, action.payload.playerStats, state.deltaMode)
      let charts = recalculateCharts(playerStatsChartsDefinition, newStats)
      return {...state, playerStats: newStats, charts: charts}
    }

    case "TOGGLE_STATS_COLUMN_GROUP_VISIBILITY": {
      let columnVisibility = state.columnVisibility;
      return {...state, columnVisibility: { ...columnVisibility, [action.payload] : !columnVisibility[action.payload]}}
    }

    case "TOGGLE_STATS_CELL_VISIBILITY": {
      let cellVisibility = state.cellVisibility;
      return {...state, cellVisibility: { ...cellVisibility, [action.payload] : !cellVisibility[action.payload]}}
    }

    case "DELTA_MODE_SELECTED": {
      let newStats = recalculateStats(playerStatsModelDefinition, state.playerStats, action.payload)
      let charts = recalculateCharts(playerStatsChartsDefinition, newStats)
      return {...state, deltaMode: action.payload, playerStats: newStats, charts: charts}
    }

    case "MAX_RESULTS_SELECTED": {
      return {...state, maxResults: action.payload }
    }

    default:
      return state;
  }
}