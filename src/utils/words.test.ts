import { VALID_GUESSES } from "src/constants/validGuesses";

import { decode, encode } from "./words";

describe("encode and decode", () => {
  test("message should be the same after encoding and decoding", () => {
    VALID_GUESSES.forEach((word) => {
      const uppercase = word.toUpperCase();
      const encoded = encode(uppercase);
      const decoded = decode(encoded);
      expect(decoded).toEqual(uppercase);
    });
  });
});
