import { getGuessStatuses } from "src/utils/statuses";
import { unicodeSplit } from "src/utils/words";

import { Cell } from "./Cell";

type Props = {
  solution: string;
  guess: string;
  isRevealing?: boolean;
};

export const CompletedRow = ({ solution, guess, isRevealing }: Props) => {
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
