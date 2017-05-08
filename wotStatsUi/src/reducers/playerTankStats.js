
export default function playerStats(state={
    tanks: [],
    tanksFiltered: [],
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
      tier: "",
      type: "",
      nation: ""
    },
    deltaMode: 'relative'
  }, action) {

  function filterTanks(tanks, tankSelection) {
    var result = tanks;
    if (tankSelection.tier) {
      var split = tankSelection.tier.split(",");
      result = result.filter((tank) => split.includes(tank.level))
    }
    if (tankSelection.type) {
      var split = tankSelection.type.split(",");
      result = result.filter((tank) => split.includes(tank.type))
    }
    if (tankSelection.nation) {
      var split = tankSelection.nation.split(",");
      result = result.filter((tank) => split.includes(tank.nation))
    }
    return result;
  }

  switch (action.type) {

    case "FETCH_TANKS_FULFILLED": {
      var filtered = filterTanks(action.payload.tanks, state.tankSelection);
      return {...state, tanks: action.payload.tanks, tanksFiltered: filtered }
    }

    case "TANK_TIER_SELECTED": {
      var newState = { ...state.tankSelection, tier: action.payload }
      var filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_TYPE_SELECTED": {
      var newState = { ...state.tankSelection, type: action.payload }
      var filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_NATION_SELECTED": {
      var newState = { ...state.tankSelection, nation: action.payload }
      var filtered = filterTanks(state.tanks, newState);
      return {...state, tankSelection: newState, tanksFiltered: filtered }
    }

    case "TANK_SELECTED": {
      var newState = { ...state.tankSelection, nation: action.payload }
      return {...state, tankSelection: newState}
    }

    default:
      return state;
  }
}