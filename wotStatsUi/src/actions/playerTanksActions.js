import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function selectTankTier(selectedTiers) {
  return dispatch => {
    dispatch({type: "PLAYER_TANK_TIER_SELECTED", payload: selectedTiers })
  }
}

export function selectTankType(selectedTypes) {
  return dispatch => {
    dispatch({type: "PLAYER_TANK_TYPE_SELECTED", payload: selectedTypes })
  }
}

export function selectTankNation(selectedNations) {
  return dispatch => {
    dispatch({type: "PLAYER_TANK_NATION_SELECTED", payload: selectedNations })
  }
}

export function toggleGroupVisibility(group) {
  return dispatch => {
    dispatch({type: "TOGGLE_PLAYER_TANK_STATS_CELL_VISIBILITY", payload: group})
  }
}

export function sortTanks(property) {
  return dispatch => {
    dispatch({type: "SORT_PLAYER_TANKS", payload: property})
  }
}