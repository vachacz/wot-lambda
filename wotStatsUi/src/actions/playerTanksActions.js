import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function selectPlayer(player) {
  var accountId = player.account_id
  return (dispatch, getState) => {
    axios.get(baseurl + "/player/" + accountId + "/tanks")
      .then((response) => {
        dispatch({type: "FETCH_PLAYER_TANKS_FULFILLED", payload: response.data})
      }
    )
  }
}