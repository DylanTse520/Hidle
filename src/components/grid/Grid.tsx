import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  solution: string;
  guesses: string[];
  currentGuess: string;
  isRevealing?: boolean;
  currentRowClassName: string;
};

export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
}: Props) => {
  const emptyRows = new Array(Math.max(5 - guesses.length, 0)).fill(0);

  return (
    <div className="mb-6 flex grow overflow-auto short:mb-2">
      <div className="flex grow flex-col justify-center gap-1">
        {guesses.map((guess, i) => (
          <CompletedRow
            key={i}
            guess={guess}
            isRevealing={isRevealing && guesses.length - 1 === i}
          />
        ))}
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
        {emptyRows.map((_, i) => (
          <EmptyRow key={i} />
        ))}
      </div>
    </div>
  );
};
