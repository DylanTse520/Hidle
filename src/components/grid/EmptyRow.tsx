import { useMessage } from "src/context/MessageContext";

import { Cell } from "./Cell";

export const EmptyRow = () => {
  const { message } = useMessage();

  const emptyCells = Array.from(Array(message.length));

  return (
    <div className="flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
