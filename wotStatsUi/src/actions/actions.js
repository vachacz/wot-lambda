import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function fetchPlayers() {
  return dispatch => {
    axios.get(baseurl + "/players")
      .then((response) => {
        dispatch({type: "FETCH_PLAYERS_FULFILLED", payload: response.data})
      }
    )
  }
}

export function selectPlayer(player) {
  var accountId = player.account_id
  return dispatch => {
    axios.get(baseurl + "/playerstats/" + accountId)
      .then((response) => {
        dispatch({type: "PLAYER_SELECTED", payload: player})
        dispatch({type: "FETCH_PLAYER_STATS_FULFILLED", payload: response.data})
      }
    )
  }
}

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

export function fetchTanks() {
  return dispatch => {
    axios.get(baseurl + "/tanks")
      .then((response) => {
        dispatch({type: "FETCH_TANKS_FULFILLED", payload: response.data})
      }
    )
  }
}

export function selectTankTier(selectedTiers) {
  return dispatch => {
    dispatch({type: "TANK_TIER_SELECTED", payload: selectedTiers })
  }
}

export function selectTankType(selectedTypes) {
  return dispatch => {
    dispatch({type: "TANK_TYPE_SELECTED", payload: selectedTypes })
  }
}

export function selectTankNation(selectedNations) {
  return dispatch => {
    dispatch({type: "TANK_NATION_SELECTED", payload: selectedNations })
  }
}

export function selectTank(selectedTank) {
  return dispatch => {
    dispatch({type: "TANK_SELECTED", payload: selectedTank })
  }
}
