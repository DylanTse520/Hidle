const gameStateKey = "gameState";
const accessibilityKey = "accessibility";

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

export const setStoredIsAccessibilityMode = (isAccessibility: boolean) => {
  if (isAccessibility) {
    localStorage.setItem(accessibilityKey, "true");
  } else {
    localStorage.removeItem(accessibilityKey);
  }
};

export const getStoredIsAccessibilityMode = () => {
  const accessibility = localStorage.getItem(accessibilityKey);
  return accessibility === "true";
};
