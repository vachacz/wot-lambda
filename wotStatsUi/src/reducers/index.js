import { combineReducers } from "redux"

import players from "./playersReducer.js"
import playerStats from "./playerStatsReducer.js"
import playerTanks from "./playerTanksReducer.js"
import playerTankStats from "./playerTankStatsReducer.js"

export default combineReducers({
  players,
  playerStats,
  playerTanks,
  playerTankStats
})