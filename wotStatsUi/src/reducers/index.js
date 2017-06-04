import { combineReducers } from "redux"

import mainApp from "./mainAppReducer.js"
import players from "./playersReducer.js"
import playerStats from "./playerStatsReducer.js"
import playerTanks from "./playerTanksReducer.js"
import playerTankStats from "./playerTankStatsReducer.js"

export default combineReducers({
  mainApp,
  players,
  playerStats,
  playerTanks,
  playerTankStats
})