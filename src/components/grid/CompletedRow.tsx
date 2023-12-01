import { useMessage } from "src/context/MessageContext";
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
  const { message } = useMessage();

  const statuses = getGuessStatuses(message, guess);
  const splitGuess = unicodeSplit(guess);

  return (
    <div className="flex justify-center">
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
