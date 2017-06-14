import { combineReducers } from "redux"

import app from "./appReducer.js"
import players from "./playersReducer.js"
import playerStats from "./playerStatsReducer.js"
import playerTanks from "./playerTanksReducer.js"
import playerTankStats from "./playerTankStatsReducer.js"

export default combineReducers({
  app,
  players,
  playerStats,
  playerTanks,
  playerTankStats
})