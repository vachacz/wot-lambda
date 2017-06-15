import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function selectPlayer(accountId) {
  return (dispatch, getState) => {
    dispatch({ type: "PLAYER_SELECTION_REQUEST" })
    axios.all([
      axios.get(baseurl + "/player/" + accountId + "/stats?maxresults=" + getState().playerStats.maxResults),
      axios.get(baseurl + "/player/" + accountId + "/tanks")
    ]).then(
      axios.spread((stats, tanks) => {
        dispatch({ type: "PLAYER_SELECTED", payload: accountId })
        dispatch({ type: "FETCH_PLAYER_STATS_FULFILLED", payload: stats.data })
        dispatch({ type: "FETCH_PLAYER_TANKS_FULFILLED", payload: tanks.data })
      })
    );
  }
}