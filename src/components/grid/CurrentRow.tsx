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

  const classes = classNames("invisible absolute", {
    [`w-[7.25rem] h-[7.25rem] left-[calc(100%-3.5rem)] top-[calc(100%-3.5rem)]
    md:w-[6.25rem] md:h-[6.25rem] md:left-[calc(100%-3rem)] md:top-[calc(100%-3rem)]
    sm:w-[5.75rem] sm:h-[5.75rem] sm:left-[calc(100%-2.75rem)] sm:top-[calc(100%-2.75rem)]`]:
      splitGuess.length < message.length && numberOfTotalGuesses < 5,
    [`w-[3.5rem] h-[7.25rem] right-0 top-[calc(100%-3.5rem)]
    md:w-[3rem] md:h-[6.25rem] md:top-[calc(100%-3rem)]
    sm:w-[2.75rem] sm:h-[5.75rem] sm:top-[calc(100%-2.75rem)]`]:
      splitGuess.length === message.length && numberOfTotalGuesses < 5,
    [`w-[7.25rem] h-[3.5rem] left-[calc(100%-3.5rem)] bottom-0
    md:w-[6.25rem] md:h-[3rem] md:left-[calc(100%-3rem)]
    sm:w-[5.75rem] sm:h-[2.75rem] sm:left-[calc(100%-2.75rem)]`]:
      splitGuess.length < message.length && numberOfTotalGuesses >= 5,
    [`w-[3.5rem] h-[3.5rem] right-0 bottom-0
    md:w-[3rem] md:h-[3rem]
    sm:w-[2.75rem] sm:h-[2.75rem]`]:
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
