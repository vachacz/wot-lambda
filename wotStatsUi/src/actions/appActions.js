import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function loadAppInitialState() {
  return dispatch => {
    axios.all([
      axios.get(baseurl + "/players"),
      axios.get(baseurl + "/tanks")
    ]).then(
      axios.spread((players, tanks) => {
        dispatch({ type: "FETCH_PLAYERS_FULFILLED", payload: players.data })
        dispatch({ type: "FETCH_TANKS_FULFILLED", payload: tanks.data })
        dispatch({ type: "INITIAL_STATE_LOADED", payload: true })
      })
    );
  }
}
