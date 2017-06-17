
export default function app(state={
    initialStateLoaded: false,
    isFetchingPlayer: false,
    isFetchingTank: false,
    effectiveIntroModalVisible: false
  }, action) {

  switch (action.type) {

    case "TANK_SELECTION_REQUEST": {
      return {...state, isFetchingTank: true }
    }

    case "TANK_SELECTION_COMPLETE": {
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

    case "EFFECTIVE_INTRO_MODAL_SHOW": {
      return { ...state, effectiveIntroModalVisible: true }
    }

    case "EFFECTIVE_INTRO_MODAL_HIDE": {
      return { ...state, effectiveIntroModalVisible: false }
    }

    default:
      return state;
  }
}