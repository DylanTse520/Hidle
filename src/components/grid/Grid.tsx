import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

export const Grid = ({
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  isGameWon,
}: {
  guesses: string[];
  currentGuess: string;
  isRevealing?: boolean;
  currentRowClassName: string;
  isGameWon: boolean;
}) => {
  // if game is not won, show 5 - guesses length of empty rows. with current row, there are at most 6 rows
  // if game is won, show 6 - guesses length of empty rows since no more current row
  // if guesses is more than 5, show 0 empty rows
  const emptyRows = new Array(
    Math.max((isGameWon ? 6 : 5) - guesses.length, 0)
  ).fill(0);

  return (
    <div className="flex grow flex-col overflow-auto">
      <div className="flex grow">
        <div className="mb-6 flex grow flex-col justify-center gap-1 short:mb-2">
          {
            // all guesses are mapped to completed rows
            guesses.map((guess, i) => (
              <CompletedRow
                key={i}
                guess={guess}
                isRevealing={isRevealing && guesses.length - 1 === i}
              />
            ))
          }
          {
            // if game is not won, show one current row
            !isGameWon && (
              <CurrentRow
                currentGuess={currentGuess}
                numberOfTotalGuesses={guesses.length}
                className={currentRowClassName}
              />
            )
          }
          {emptyRows.map((_, i) => (
            <EmptyRow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
