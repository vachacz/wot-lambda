import { FETCH_PLAYERS_STATS_FULFILLED, TOGGLE_STATS_COLUMN_GROUP_VISIBILITY, DELTA_MODE_SELECTED } from '../const/ActionTypes.js'

export default function playerStats(state={
    playerStats: [],
    columnVisibility: {
      max: false,
      totals: false,
      avgs: true,
      ratios: true
    },
    deltaMode: 'relative'
  }, action) {

  switch (action.type) {
    case FETCH_PLAYERS_STATS_FULFILLED:
      return {...state, playerStats: action.payload.playerStats}

    case TOGGLE_STATS_COLUMN_GROUP_VISIBILITY: {
      var columnVisibility = state.columnVisibility;
      return {...state, columnVisibility: { ...columnVisibility, [action.payload] : !columnVisibility[action.payload]}}
    }

    case DELTA_MODE_SELECTED:
      return {...state, deltaMode: action.payload}

    default:
      return state;
  }
}