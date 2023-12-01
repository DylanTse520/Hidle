import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useMessage } from "src/context/MessageContext";
import { unicodeSplit } from "src/utils/words";

import { Cell } from "./Cell";

export const CurrentRow = ({
  currentGuess,
  numberOfTotalGuesses,
  className,
}: {
  currentGuess: string;
  numberOfTotalGuesses: number;
  className: string;
}) => {
  const { message } = useMessage();

  const currentCellRef = useRef<HTMLDivElement>(null);

  const splitGuess = unicodeSplit(currentGuess);
  const emptyCells = new Array(message.length - splitGuess.length).fill(0);

  useEffect(() => {
    // scroll into view when revealing
    if (currentCellRef.current) {
      currentCellRef.current!.scrollIntoView({ behavior: "smooth" });
    }
  });

  const classes = classNames("invisible", {
    "current-cell-box-big":
      splitGuess.length < message.length && numberOfTotalGuesses < 5,
    "current-cell-box-slim":
      splitGuess.length === message.length && numberOfTotalGuesses < 5,
    "current-cell-box-short":
      splitGuess.length < message.length && numberOfTotalGuesses >= 5,
    "current-cell-box-small":
      splitGuess.length === message.length && numberOfTotalGuesses >= 5,
  });

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative flex">
        <div className={classes} ref={currentCellRef} />
        {splitGuess.map((letter, i) => (
          <Cell key={i} value={letter} />
        ))}
      </div>
      <div className="flex">
        {emptyCells.map((_, i) => (
          <Cell key={i} />
        ))}
      </div>
    </div>
  );
};
