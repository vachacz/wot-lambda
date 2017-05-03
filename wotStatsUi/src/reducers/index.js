import { combineReducers } from "redux"

import players from "./players.js"
import playerStats from "./playerStats.js"

export default combineReducers({
  players,
  playerStats,
})