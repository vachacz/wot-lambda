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