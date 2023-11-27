import { useContext } from "react";
import { SolutionContext } from "src/context/SolutionContext";
import { unicodeSplit } from "src/utils/words";

import { Cell } from "./Cell";

export const CurrentRow = ({
  guess,
  className,
}: {
  guess: string;
  className: string;
}) => {
  const { solution } = useContext(SolutionContext);

  const splitGuess = unicodeSplit(guess);
  const emptyCells = Array.from(Array(solution.length - splitGuess.length));
  const classes = `flex justify-center mb-1 ${className}`;

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
