import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function toggleGroupVisibility(group) {
  return { type: "TOGGLE_TANK_STATS_COLUMN_GROUP_VISIBILITY", payload: group }
}

export function toggleCellVisibility(group) {
  return { type: "TOGGLE_TANK_STATS_CELL_VISIBILITY", payload: group }
}

export function selectDeltaMode(mode) {
  return { type: "TANK_STATS_DELTA_MODE_SELECTED", payload: mode }
}

export function selectMaxResults(results) {
  return (dispatch, getState) => {
    dispatch({ type: "TANK_STATS_MAX_RESULTS_SELECTED", payload: results })

    let accountId = getState().players.accountId
    let tankId = getState().playerTankStats.tankSelection.tank.tank_id
    axios.get(baseurl + "/player/" + accountId + "/tank/" + tankId + "/stats?maxresults=" + getState().playerTankStats.maxResults)
      .then((response) => {
        dispatch({ type: "TANK_SELECTION_COMPLETE", payload: {
          tankId: tankId,
          stats: response.data
        }});
      })
  }
}

export function selectTankTier(selectedTiers) {
  return { type: "TANK_TIER_SELECTED", payload: selectedTiers }
}

export function selectTankType(selectedTypes) {
  return { type: "TANK_TYPE_SELECTED", payload: selectedTypes }
}

export function selectTankNation(selectedNations) {
  return { type: "TANK_NATION_SELECTED", payload: selectedNations }
}

export function selectTank(accountId, tankId) {
  if (tankId == null) {
    return (dispatch) => {
      dispatch({ type: "TANK_SELECTION_COMPLETE", payload: {
        tankId: "",
        stats: { playerTankStats: [] }
      }});
    }
  }
  return (dispatch, getState) => {
    dispatch({ type: "TANK_SELECTION_REQUEST" })
    axios.get(baseurl + "/player/" + accountId + "/tank/" + tankId + "/stats?maxresults=" + getState().playerTankStats.maxResults)
      .then((response) => {
        dispatch({ type: "TANK_SELECTION_COMPLETE", payload: {
          tankId: tankId,
          stats: response.data
        }});
      })
  }
}
