import classnames from "classnames";

type Props = {
  settingName: string;
  flag: boolean;
  handleFlag: Function;
};

export const SettingsToggle = ({ settingName, flag, handleFlag }: Props) => {
  const toggleHolder = classnames(
    "w-12 h-7 flex shrink-0 items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer",
    {
      "bg-green-400": flag,
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
      <div className="text-gray-600 dark:text-gray-300">{settingName}</div>
      <div className={toggleHolder} onClick={() => handleFlag(!flag)}>
        <div className={toggleButton} />
      </div>
    </div>
  );
};
