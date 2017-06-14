import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function toggleGroupVisibility(group) {
  return { type: "TOGGLE_STATS_COLUMN_GROUP_VISIBILITY", payload: group }
}

export function toggleCellVisibility(group) {
  return { type: "TOGGLE_STATS_CELL_VISIBILITY", payload: group }
}

export function selectDeltaMode(mode) {
  return { type: "DELTA_MODE_SELECTED", payload: mode }
}

export function selectMaxResults(results) {
  return (dispatch, getState) => {
    dispatch({type: "MAX_RESULTS_SELECTED", payload: results})
    refreshPlayerStats()(dispatch, getState)
  }
}

export function refreshPlayerStats() {
  return (dispatch, getState) => {
    axios.get(baseurl + "/player/" + getState().players.accountId + "/stats?maxresults=" + getState().playerStats.maxResults)
      .then((response) => {
        dispatch({type: "FETCH_PLAYER_STATS_FULFILLED", payload: response.data})
      }
    )
  }
}