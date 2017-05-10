
export function toggleGroupVisibility(group) {
  return dispatch => {
    dispatch({type: "TOGGLE_STATS_COLUMN_GROUP_VISIBILITY", payload: group})
  }
}

export function toggleCellVisibility(group) {
  return dispatch => {
    dispatch({type: "TOGGLE_STATS_CELL_VISIBILITY", payload: group})
  }
}

export function selectDeltaMode(mode) {
  return dispatch => {
    dispatch({type: "DELTA_MODE_SELECTED", payload: mode})
  }
}