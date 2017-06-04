
export default function mainApp(state={
    activeTab: 1
  }, action) {

  switch (action.type) {

    case "ACTIVE_TAB_SELECTED": {
      return {...state, activeTab: action.payload}
    }

    default:
      return state;
  }
}