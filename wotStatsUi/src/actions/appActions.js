import axios from 'axios';
import { baseurl } from '../const/Const.js';

export function loadAppInitialState() {
  return dispatch => {
    axios.all([
      axios.get(baseurl + "/players"),
      axios.get(baseurl + "/tanks")
    ]).then(
      axios.spread((players, tanks) => {
        dispatch({ type: "INITIAL_STATE_LOADED", payload: {
          players: players.data.players,
          tanks: tanks.data.tanks
        }})
      })
    );
  }
}
