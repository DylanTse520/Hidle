import { unicodeSplit } from "./words";

export type CharStatus = "absent" | "present" | "correct";

export const getStatuses = (
  message: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {};
  const splitMessage = unicodeSplit(message);

  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {
      if (!splitMessage.includes(letter)) {
        return (charObj[letter] = "absent");
      }

      if (letter === splitMessage[i]) {
        return (charObj[letter] = "correct");
      }

      if (charObj[letter] !== "correct") {
        return (charObj[letter] = "present");
      }
    });
  });

  return charObj;
};

export const getGuessStatuses = (
  message: string,
  guess: string
): CharStatus[] => {
  const splitMessage = unicodeSplit(message);
  const splitGuess = unicodeSplit(guess);

  const messageCharsTaken = splitMessage.map((_) => false);

  const statuses: CharStatus[] = Array.from(Array(guess.length));

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitMessage[i]) {
      statuses[i] = "correct";
      messageCharsTaken[i] = true;
      return;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitMessage.includes(letter)) {
      // handles the absent case
      statuses[i] = "absent";
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitMessage.findIndex(
      (x, index) => x === letter && !messageCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = "present";
      messageCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = "absent";
      return;
    }
  });

  return statuses;
};
