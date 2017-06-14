
export function selectTankTier(selectedTiers) {
  return { type: "PLAYER_TANK_TIER_SELECTED", payload: selectedTiers }
}

export function selectTankType(selectedTypes) {
  return { type: "PLAYER_TANK_TYPE_SELECTED", payload: selectedTypes }
}

export function selectTankNation(selectedNations) {
  return { type: "PLAYER_TANK_NATION_SELECTED", payload: selectedNations }
}

export function toggleGroupVisibility(group) {
  return { type: "TOGGLE_PLAYER_TANK_STATS_CELL_VISIBILITY", payload: group }
}

export function sortTanks(property) {
  return { type: "SORT_PLAYER_TANKS", payload: property }
}

export function selectBattleCount(battleCount) {
  return { type: "PLAYER_TANK_BATTLE_COUNT_SELECTED", payload: battleCount }
}