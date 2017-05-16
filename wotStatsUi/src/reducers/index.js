import { combineReducers } from "redux"

import players from "./playersReducer.js"
import playerStats from "./playerStatsReducer.js"
import playerTankStats from "./playerTankStatsReducer.js"

export default combineReducers({
  players,
  playerStats,
  playerTankStats
})