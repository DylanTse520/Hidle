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

export const getSolution = (code: string) => {
  return code;
};
