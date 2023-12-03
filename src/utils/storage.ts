const gameStateKey = "gameState";
const accessibleKey = "accessible";

export const saveGameState = (gameState: Map<string, string[]>) => {
  let gameStateArray = Array.from(gameState.entries());
  localStorage.setItem(gameStateKey, JSON.stringify(gameStateArray));
};

export const loadGameState = () => {
  const state = localStorage.getItem(gameStateKey);
  return state ? new Map<string, string[]>(JSON.parse(state)) : null;
};

export const saveDarkMode = (idDarkMode: boolean) => {
  localStorage.setItem("theme", idDarkMode ? "dark" : "light");
};

export const loadDarkMode = () => {
  return localStorage.getItem("theme")
    ? localStorage.getItem("theme") === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const saveAccessibleMode = (isAccessibleMode: boolean) => {
  if (isAccessibleMode) {
    localStorage.setItem(accessibleKey, "true");
  } else {
    localStorage.removeItem(accessibleKey);
  }
};

export const loadAccessibleMode = () => {
  return !!localStorage.getItem(accessibleKey);
};
