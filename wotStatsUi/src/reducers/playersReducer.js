
export default function players(state={
    player: "",
    accountId: "",
    players: []
  }, action) {

  switch (action.type) {

    case "INITIAL_STATE_LOADED":
      return {...state, players: action.payload.players}

    case "PLAYER_SELECTION_COMPLETE": {
      let player = state.players.find((player) => player.account_id === action.payload.accountId)
      return { ...state, player: player.player, accountId: player.account_id }
    }

    default:
      return state;
  }
}