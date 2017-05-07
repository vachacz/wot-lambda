import { combineReducers } from "redux"

import players from "./players.js"
import playerStats from "./playerStats.js"
import playerTankStats from "./playerTankStats.js"

export default combineReducers({
  players,
  playerStats,
  playerTankStats
})