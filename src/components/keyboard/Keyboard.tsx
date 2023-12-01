import { BackspaceIcon as BackspaceOutline } from "@heroicons/react/24/outline";
import { BackspaceIcon as BackspaceSolid } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { ENTER_TEXT } from "src/constants/strings";
import { useMessage } from "src/context/MessageContext";
import { getStatuses } from "src/utils/statuses";
import { localeAwareUpperCase } from "src/utils/words";

import { Key } from "./Key";

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}: {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  isRevealing?: boolean;
}) => {
  const { message } = useMessage();

  const charStatuses = getStatuses(message, guesses);

  const onClick = (value: string) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = localeAwareUpperCase(e.key);
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className="mb-1 flex justify-center">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          <div className="group relative flex h-full w-full items-center justify-center">
            <div className="absolute h-6 w-6">
              <BackspaceSolid className="absolute inset-0 opacity-0 group-hover:opacity-100 dark:text-white" />
              <BackspaceOutline className="absolute inset-0 opacity-100 group-hover:opacity-0 dark:stroke-white" />
            </div>
          </div>
        </Key>
      </div>
    </div>
  );
};
