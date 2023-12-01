const gameStateKey = "gameState";
const accessibleKey = "accessible";

export type StoredGameState = {
  guesses: string[];
  message: string;
};

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  const key = gameStateKey;
  localStorage.setItem(key, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const key = gameStateKey;
  const state = localStorage.getItem(key);
  return state ? (JSON.parse(state) as StoredGameState) : null;
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
