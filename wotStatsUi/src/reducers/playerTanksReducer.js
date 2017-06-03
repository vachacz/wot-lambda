export default function playerTanks(state={
    allTanksMap: {},
    allPlayerTanks: [],
    playerTanks: [],
    columnVisibility: {
      max: false,
      totals: false,
      avgs: true,
      ratios: true,
      visible: true
    },
    criteriaSelection: {
      tier: "",
      type: "",
      nation: ""
    }
  }, action) {

  function filterTanks(tanks, criteriaSelection) {
    var result = tanks;
    if (criteriaSelection.tier) {
      let split = criteriaSelection.tier.split(",");
      result = result.filter((tank) => split.includes(tank.level))
    }
    if (criteriaSelection.type) {
      let split = criteriaSelection.type.split(",");
      result = result.filter((tank) => split.includes(tank.type))
    }
    if (criteriaSelection.nation) {
      let split = criteriaSelection.nation.split(",");
      result = result.filter((tank) => split.includes(tank.nation))
    }
    return result;
  }

  switch (action.type) {

    case "FETCH_TANKS_FULFILLED": {
      let tankMap = action.payload.tanks.reduce(function(map, obj) {
        map[obj.tank_id] = obj;
        return map;
      }, {});
      return {...state, allTanksMap: tankMap }
    }
    case "FETCH_PLAYER_TANKS_FULFILLED": {
      let playerTanks = action.payload.tanks.map((tankStats) => {
        let tank = state.allTanksMap[tankStats.tankId];
        return { ...tankStats,
          name: tank.name,
          type: tank.type,
          level: tank.level,
          nation: tank.nation
        };
      })
      return {...state, playerTanks: playerTanks, allPlayerTanks: playerTanks }
    }
    case "PLAYER_TANK_TIER_SELECTED": {
      let newState = { ...state.criteriaSelection, tier: action.payload }
      let filtered = filterTanks(state.allPlayerTanks, newState);
      return {...state, criteriaSelection: newState, playerTanks: filtered }
    }
    case "PLAYER_TANK_TYPE_SELECTED": {
      let newState = { ...state.criteriaSelection, type: action.payload }
      let filtered = filterTanks(state.allPlayerTanks, newState);
      return {...state, criteriaSelection: newState, playerTanks: filtered }
    }
    case "PLAYER_TANK_NATION_SELECTED": {
      let newState = { ...state.criteriaSelection, nation: action.payload }
      let filtered = filterTanks(state.allPlayerTanks, newState);
      return {...state, criteriaSelection: newState, playerTanks: filtered }
    }
    case "TOGGLE_PLAYER_TANK_STATS_CELL_VISIBILITY": {
      return {...state}
    }

    default:
      return state;
  }
}