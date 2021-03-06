export default function playerTanks(state={
    allTanksMap: {},
    allPlayerTanks: [],
    playerTanks: [],
    sortProperty: "battles",
    sortDescending: true,
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
      nation: "",
      battleCount: 0
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
    result = result.filter((tank) => tank.battles > criteriaSelection.battleCount)
    return result;
  }

  function sortTanksByProperty(tanks, property, descending) {
    tanks.sort((a, b) => {
      let a1 = parseIfNumeric(a[property])
      let b1 = parseIfNumeric(b[property])
      if (descending) {
        return (a1 < b1) ? 1 : ((b1 < a1) ? -1 : 0);
      }
      return (a1 > b1) ? 1 : ((b1 > a1) ? -1 : 0);
    });
  }

  function parseIfNumeric(value) {
    if (isNumeric(value)) {
      return parseInt(value, 10);
    }
    return value;
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  switch (action.type) {

    case "INITIAL_STATE_LOADED": {
      let tankMap = action.payload.tanks.reduce(function(map, obj) {
        map[obj.tank_id] = obj;
        return map;
      }, {});
      return {...state, allTanksMap: tankMap }
    }

    case "PLAYER_SELECTION_COMPLETE": {
      let playerTanks = action.payload.tanks.tanks.map((tankStats) => {
        let tank = state.allTanksMap[tankStats.tankId];
        if (tank) {
          return { ...tankStats, name: tank.name, type: tank.type, level: tank.level, nation: tank.nation };
        }
        return { ...tankStats }
      });
      let filtered = filterTanks(playerTanks, state.criteriaSelection);
      sortTanksByProperty(filtered, state.sortProperty, state.sortDescending);
      return {...state, playerTanks: filtered, allPlayerTanks: playerTanks }
    }

    case "PLAYER_TANK_TIER_SELECTED": {
      let newState = { ...state.criteriaSelection, tier: action.payload }
      let filtered = filterTanks(state.allPlayerTanks, newState);
      sortTanksByProperty(filtered, state.sortProperty, state.sortDescending);
      return {...state, criteriaSelection: newState, playerTanks: filtered }
    }

    case "PLAYER_TANK_TYPE_SELECTED": {
      let newState = { ...state.criteriaSelection, type: action.payload }
      let filtered = filterTanks(state.allPlayerTanks, newState);
      sortTanksByProperty(filtered, state.sortProperty, state.sortDescending);
      return {...state, criteriaSelection: newState, playerTanks: filtered }
    }

    case "PLAYER_TANK_NATION_SELECTED": {
      let newState = { ...state.criteriaSelection, nation: action.payload }
      let filtered = filterTanks(state.allPlayerTanks, newState);
      sortTanksByProperty(filtered, state.sortProperty, state.sortDescending);
      return {...state, criteriaSelection: newState, playerTanks: filtered }
    }

    case "PLAYER_TANK_BATTLE_COUNT_SELECTED": {
      let newState = { ...state.criteriaSelection, battleCount: action.payload }
      let filtered = filterTanks(state.allPlayerTanks, newState);
      sortTanksByProperty(filtered, state.sortProperty, state.sortDescending);
      return {...state, criteriaSelection: newState, playerTanks: filtered }
    }

    case "TOGGLE_PLAYER_TANK_STATS_CELL_VISIBILITY": {
      let columnVisibility = state.columnVisibility;
      return {...state, columnVisibility: { ...columnVisibility, [action.payload] : !columnVisibility[action.payload]}}
    }

    case "SORT_PLAYER_TANKS": {
      let property = action.payload;
      let newSortDescending = true;
      if (state.sortProperty === property) {
        newSortDescending = !state.sortDescending;
      }
      sortTanksByProperty(state.playerTanks, property, newSortDescending);
      return {...state, playerTanks: state.playerTanks, sortProperty: property, sortDescending: newSortDescending }
    }

    default:
      return state;
  }
}