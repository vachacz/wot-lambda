
export default function app(state={
    initialStateLoaded: false,
    isFetchingPlayer: false,
    isFetchingTank: false,
  }, action) {

  switch (action.type) {

    case "FETCH_TANKS_REQUEST": {
      return {...state, isFetchingTank: true }
    }

    case "TANK_SELECTED": {
      return {...state, isFetchingTank: false }
    }

    case "PLAYER_SELECTION_REQUEST": {
      return {...state, isFetchingPlayer: true}
    }

    case "PLAYER_SELECTION_COMPLETE": {
      return { ...state, isFetchingPlayer: false }
    }

    case "INITIAL_STATE_LOADED": {
      return { ...state, initialStateLoaded: true }
    }

    default:
      return state;
  }
}