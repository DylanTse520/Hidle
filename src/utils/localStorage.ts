const gameStateKey = "gameState";
const accessibleKey = "accessible";

export const saveGameStateToLocalStorage = (
  gameState: Map<string, string[]>
) => {
  let gameStateArray = Array.from(gameState.entries());
  localStorage.setItem(gameStateKey, JSON.stringify(gameStateArray));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);
  return state ? new Map<string, string[]>(JSON.parse(state)) : null;
};

export const setStoredAccessibleMode = (isAccessibleMode: boolean) => {
  if (isAccessibleMode) {
    localStorage.setItem(accessibleKey, "true");
  } else {
    localStorage.removeItem(accessibleKey);
  }
};

export const getStoredAccessibleMode = () => {
  const isAccessibleMode = localStorage.getItem(accessibleKey);
  return isAccessibleMode === "true";
};
