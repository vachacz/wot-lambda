
export default function app(state={
    initialStateLoaded: false
  }, action) {

  switch (action.type) {

    case "INITIAL_STATE_LOADED":
      return { ...state, initialStateLoaded: true }

    default:
      return state;
  }
}