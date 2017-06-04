export function selectActiveTab(tab) {
  return dispatch => {
    dispatch({type: "ACTIVE_TAB_SELECTED", payload: tab })
  }
}