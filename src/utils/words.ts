import { default as GraphemeSplitter } from "grapheme-splitter";

import { VALID_GUESSES } from "../constants/validGuesses";

export const isWordInWordList = (word: string) => {
  return VALID_GUESSES.includes(localeAwareLowerCase(word));
};

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word);
};

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length;
};

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase();
};

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase();
};

export const encode = (solution: string) => {
  // shift each character by its index + 1
  const shifted = solution
    .split("")
    .map((character, index) => {
      // for each character, shift if by index + 1
      const shiftedCharCode = character.charCodeAt(0) + index + 1;
      // if the shifted value is bigger than Z, subtract 26
      const normalizedCode = shiftedCharCode - (shiftedCharCode > 90 ? 26 : 0);
      // convert the final value to a character
      return String.fromCharCode(normalizedCode);
    })
    .join("");

  // insert one "_" at the beginning and another at random position to the shifted string
  const underscoreIndex = Math.floor(Math.random() * shifted.length);
  const inserted =
    "_" +
    shifted.slice(0, underscoreIndex) +
    "_" +
    shifted.slice(underscoreIndex);

  // encode the inserted string
  const encoded = btoa(inserted).replace(/=+$/, "");

  // randomly insert "A" to encoded string
  const randomIndex = Math.floor(Math.random() * encoded.length);
  return encoded.slice(0, randomIndex) + "A" + encoded.slice(randomIndex);
};

export const decode = (code: string) => {
  // remove the randomly inserted "A" and decode the string
  const decoded = atob(code.replace("A", ""));

  // remove the inserted "_" from the decoded string
  return decoded
    .replace(/_/g, "")
    .split("")
    .map((character, index) => {
      // for each character, shift it backwards by index + 1
      const shiftedCharCode = character.charCodeAt(0) - index - 1;
      // if the shifted value is smaller than A, add 26
      const normalizedCode = shiftedCharCode + (shiftedCharCode < 65 ? 26 : 0);
      // convert the final value to a character
      return String.fromCharCode(normalizedCode);
    })
    .join("");
};
