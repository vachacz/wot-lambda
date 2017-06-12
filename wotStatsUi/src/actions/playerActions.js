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

export function selectPlayer(accountId) {
  return (dispatch, getState) => {
    axios.get(baseurl + "/player/" + accountId + "/stats?maxresults=" + getState().playerStats.maxResults)
      .then((response) => {
        dispatch({type: "PLAYER_SELECTED", payload: accountId})
        dispatch({type: "FETCH_PLAYER_STATS_FULFILLED", payload: response.data})
      });
    axios.get(baseurl + "/player/" + accountId + "/tanks")
      .then((response) => {
        dispatch({type: "FETCH_PLAYER_TANKS_FULFILLED", payload: response.data})
      });
  }
}