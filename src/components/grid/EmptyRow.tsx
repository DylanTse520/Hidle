import { useContext } from "react";
import { SolutionContext } from "src/context/SolutionContext";

import { Cell } from "./Cell";

export const EmptyRow = () => {
  const { solution } = useContext(SolutionContext);
  const emptyCells = Array.from(Array(solution.length));

  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
