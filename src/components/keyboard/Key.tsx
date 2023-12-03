import classnames from "classnames";
import { ReactNode } from "react";
import { REVEAL_TIME_MS } from "src/constants/settings";
import { useMessage } from "src/context/MessageContext";
import { CharStatus } from "src/utils/statuses";
import { loadAccessibleMode } from "src/utils/storage";

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
}: {
  children?: ReactNode;
  value: string;
  width?: number;
  status?: CharStatus;
  onClick: (value: string) => void;
  isRevealing?: boolean;
}) => {
  const { message } = useMessage();

  const keyDelayMs = REVEAL_TIME_MS * message.length;
  const isAccessibleMode = loadAccessibleMode();

  const classes = classnames(
    `xxshort:h-8 xxshort:w-8 xxshort:text-xxs
    xshort:w-10 xshort:h-10 flex short:h-12 h-14
    items-center justify-center rounded mx-0.5 text-xs
    font-bold cursor-pointer select-none dark:text-white
    focus-visible:rounded focus-visible:outline focus-visible:outline-2
    focus-visible:outline-offset-1 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400`,
    {
      "transition ease-in-out": isRevealing,
      "bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400":
        !status,
      "bg-slate-400 dark:bg-slate-800 text-white": status === "absent",
      "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white":
        status === "correct" && isAccessibleMode,
      "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white":
        status === "present" && isAccessibleMode,
      "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white":
        status === "correct" && !isAccessibleMode,
      "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white":
        status === "present" && !isAccessibleMode,
    }
  );

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : "unset",
    width: `${width}px`,
  };

  return (
    <div
      role="button"
      style={styles}
      aria-label={`${value}${status ? " " + status : ""}`}
      className={classes}
      tabIndex={0}
      onClick={() => {
        onClick(value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick(value);
        }
      }}
    >
      {children || value}
    </div>
  );
};
