import { playerStatsModelDefinition, playerStatsChartsDefinition } from '../const/Const.js';

export default function playerStats(state={
    tanks: [],
    playerTankStats: [],
    charts: [],
    columnVisibility: {
      max: false,
      totals: false,
      avgs: true,
      ratios: true
    },
    cellVisibility: {
      stat: true,
      delta: true,
      effective: true
    },
    tankSelection: {
      tier: [],
      type: [],
      nation: []
    },
    deltaMode: 'relative'
  }, action) {


  switch (action.type) {

    case "FETCH_TANKS_FULFILLED": {
      return {...state, tanks: action.payload.tanks}
    }

    case "TANK_TIER_SELECTED": {
      var newState = { ...state.tankSelection, tier: action.payload }
      return {...state, tankSelection: newState}
    }

    case "TANK_TYPE_SELECTED": {
      var newState = { ...state.tankSelection, type: action.payload }
      return {...state, tankSelection: newState}
    }

    case "TANK_NATION_SELECTED": {
      var newState = { ...state.tankSelection, nation: action.payload }
      return {...state, tankSelection: newState}
    }

    case "TANK_SELECTED": {
      var newState = { ...state.tankSelection, nation: action.payload }
      return {...state, tankSelection: newState}
    }

    default:
      return state;
  }
}