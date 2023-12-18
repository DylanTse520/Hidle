import classnames from "classnames";
import { useEffect, useRef } from "react";
import { REVEAL_TIME_MS } from "src/constants/settings";
import { CharStatus } from "src/utils/statuses";
import { loadAccessibleMode } from "src/utils/storage";

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: {
  value?: string;
  status?: CharStatus;
  isRevealing?: boolean;
  isCompleted?: boolean;
  position?: number;
}) => {
  const isFilled = value && !isCompleted;
  const shouldReveal = isRevealing && isCompleted;
  const animationDelay = `${position * REVEAL_TIME_MS}ms`;
  const isAccessibleMode = loadAccessibleMode();

  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll into view when revealing
    if (shouldReveal && cellRef.current) {
      setTimeout(
        () => {
          cellRef.current?.scrollIntoView({ behavior: "smooth" });
        },
        (position - 1) * REVEAL_TIME_MS
      );
    }
  }, [position, shouldReveal]);

  const classes = classnames(
    "mx-0.5 xshort:w-11 xshort:h-11 short:text-2xl short:w-12 short:h-12 w-14 h-14 border-solid border-2 flex items-center justify-center text-4xl font-bold rounded dark:text-white",
    {
      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600":
        !value && !status,
      "border-slate-700 dark:border-slate-100": value && !status,
      "absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700":
        status === "absent",
      "correct shadowed bg-cyan-500 text-white underline decoration-solid border-cyan-500":
        status === "correct" && isAccessibleMode,
      "present shadowed bg-orange-500 text-white border-orange-500":
        status === "present" && isAccessibleMode,
      "correct shadowed bg-green-500 text-white border-green-500":
        status === "correct" && !isAccessibleMode,
      "present shadowed bg-amber-500 text-white border-amber-500":
        status === "present" && !isAccessibleMode,
      "cell-fill-animation": isFilled,
      "cell-reveal": shouldReveal,
    }
  );

  return (
    <div ref={cellRef} className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  );
};
