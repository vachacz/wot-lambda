
export default function players(state={
    player: "",
    accountId: "",
    players: []
  }, action) {

  switch (action.type) {

    case "FETCH_PLAYERS_FULFILLED":
      return {...state, players: action.payload.players}

    case "PLAYER_SELECTED": {
      let player = state.players.find((player) => player.account_id === action.payload)
      return {...state, player: player.player, accountId: player.account_id}
    }

    default:
      return state;
  }
}