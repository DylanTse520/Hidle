const gameStateKey = "gameState";
const highContrastKey = "highContrast";

export type StoredGameState = {
  guesses: string[];
  solution: string;
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

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, "true");
  } else {
    localStorage.removeItem(highContrastKey);
  }
};

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey);
  return highContrast === "true";
};
