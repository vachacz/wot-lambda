import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function toggleGroupVisibility(group) {
  return dispatch => {
    dispatch({type: "TOGGLE_TANK_STATS_COLUMN_GROUP_VISIBILITY", payload: group})
  }
}

export function toggleCellVisibility(group) {
  return dispatch => {
    dispatch({type: "TOGGLE_TANK_STATS_CELL_VISIBILITY", payload: group})
  }
}

export function selectDeltaMode(mode) {
  return dispatch => {
    dispatch({type: "TANK_STATS_DELTA_MODE_SELECTED", payload: mode})
  }
}
