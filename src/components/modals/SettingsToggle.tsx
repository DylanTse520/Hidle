import classnames from "classnames";

export const SettingsToggle = ({
  settingName,
  flag,
  handleFlag,
}: {
  settingName: string;
  flag: boolean;
  handleFlag: Function;
}) => {
  const toggleHolder = classnames(
    `w-12 h-7 flex shrink-0 items-center bg-gray-300 rounded-full
    p-1 duration-300 ease-in-out cursor-pointer
    focus-visible:rounded-full focus-visible:outline focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400`,
    {
      "bg-indigo-600": flag,
    }
  );
  const toggleButton = classnames(
    "bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out cursor-pointer",
    {
      "translate-x-5": flag,
    }
  );

  return (
    <div className="mt-2 flex items-center justify-between gap-1">
      <label className="text-gray-600 dark:text-gray-300">
        {settingName}
        <input
          type="checkbox"
          className="invisible"
          checked={flag}
          onClick={() => handleFlag(!flag)}
        />
      </label>
      <div
        className={toggleHolder}
        onClick={() => handleFlag(!flag)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleFlag(!flag);
          }
        }}
        aria-checked={flag}
        tabIndex={0}
      >
        <div className={toggleButton} />
      </div>
    </div>
  );
};
