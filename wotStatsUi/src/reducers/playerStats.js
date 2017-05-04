
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

  switch (action.type) {

    case "FETCH_PLAYER_STATS_FULFILLED": {

//      avgDamageChartModel = [
//        {},
//        {},
//        {},
//
//      ]

      return {...state, playerStats: action.payload.playerStats}
    }

    case "TOGGLE_STATS_COLUMN_GROUP_VISIBILITY": {
      var columnVisibility = state.columnVisibility;
      return {...state, columnVisibility: { ...columnVisibility, [action.payload] : !columnVisibility[action.payload]}}
    }

    case "TOGGLE_STATS_CELL_VISIBILITY": {
      var cellVisibility = state.cellVisibility;
      return {...state, cellVisibility: { ...cellVisibility, [action.payload] : !cellVisibility[action.payload]}}
    }

    case "DELTA_MODE_SELECTED":
      return {...state, deltaMode: action.payload}

    default:
      return state;
  }
}