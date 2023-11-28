import { useSolution } from "src/context/SolutionContext";
import { getGuessStatuses } from "src/utils/statuses";
import { unicodeSplit } from "src/utils/words";

import { Cell } from "./Cell";

export const CompletedRow = ({
  guess,
  isRevealing,
}: {
  guess: string;
  isRevealing?: boolean;
}) => {
  const { solution } = useSolution();

  const statuses = getGuessStatuses(solution, guess);
  const splitGuess = unicodeSplit(guess);

  return (
    <div className="flex justify-center gap-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  );
};
