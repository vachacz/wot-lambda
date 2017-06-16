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
    axios.get(baseurl + "/player/" + getState().players.accountId + "/stats?maxresults=" + results)
      .then((response) => {
        dispatch({type: "PLAYER_MAX_RESULTS_REFRESH_COMPLETE", payload: {
          maxResults: results,
          stats: response.data
        }})
      }
    )
  }
}
