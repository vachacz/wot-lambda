
export default function playersReducer(state={
    player: "",
    accountId: "",
    players: []
  }, action) {

  switch (action.type) {

    case "FETCH_PLAYERS_FULFILLED":
      return {...state, players: action.payload.players}

    case "PLAYER_SELECTED":
      return {...state, player: action.payload.player, accountId: action.payload.account_id}

    default:
      return state;
  }
}