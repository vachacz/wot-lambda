export default function playerTanks(state={
    playerTanks: [],
    columnVisibility: {
      max: false,
      totals: false,
      avgs: true,
      ratios: true,
      visible: true
    },
    tankSelection: {
      tier: "",
      type: "",
      nation: "",
      tank: ""
    }
  }, action) {

  switch (action.type) {

    case "FETCH_PLAYER_TANKS_FULFILLED": {
      return {...state, playerTanks: action.payload.tanks}
    }

    default:
      return state;
  }
}