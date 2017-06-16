import { playerStatsModelDefinition, playerStatsChartsDefinition } from '../const/Const.js';
import { recalculateStats } from '../util/stats.js'
import { recalculateCharts } from '../util/charts.js'

export default function playerStats(state={
    playerStats: [],
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
    deltaMode: 'relative',
    maxResults: 10
  }, action) {

  function refreshStats(stats) {
    let newStats = recalculateStats(playerStatsModelDefinition, stats, state.deltaMode)
    let charts = recalculateCharts(playerStatsChartsDefinition, newStats)
    return {...state, playerStats: newStats, charts: charts}
  }

  switch (action.type) {

    case "PLAYER_SELECTION_COMPLETE": {
      return refreshStats(action.payload.stats.playerStats)
    }

    case "PLAYER_MAX_RESULTS_REFRESH_COMPLETE": {
      let newState = refreshStats(action.payload.stats.playerStats)
      newState["maxResults"] = action.payload.maxResults
      return newState
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

    default:
      return state;
  }
}