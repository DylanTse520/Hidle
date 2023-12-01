export const ShareFormItem = ({
  inputLabel,
  inputId,
  inputValue,
  inputReadonly = false,
  buttonText,
  buttonDisabled = false,
  onClick,
  onChange,
}: {
  inputLabel?: string;
  inputId?: string;
  inputValue?: string;
  inputReadonly?: boolean;
  buttonText: string;
  buttonDisabled?: boolean;
  onClick?: () => void;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {inputLabel && inputId && (
        <div className="flex">
          <label
            htmlFor={inputId}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            {inputLabel}
          </label>
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          id={inputId}
          value={inputValue}
          readOnly={inputReadonly}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 caret-indigo-600 shadow-sm
          ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
          dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-indigo-500
          sm:text-sm sm:leading-6"
          onChange={(e) => onChange && onChange(e.target.value)}
          onClick={(e) => e.currentTarget.select()}
        />
        <button
          disabled={buttonDisabled}
          onClick={onClick}
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-left
          text-base font-medium text-white shadow-sm hover:bg-indigo-700 hover:text-white/95
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800
          active:text-white/90 disabled:cursor-not-allowed
          disabled:bg-indigo-50 disabled:text-gray-400 dark:hover:bg-indigo-500/80
          dark:hover:text-white dark:focus-visible:outline-indigo-400 dark:active:bg-indigo-500 dark:active:text-white
          dark:disabled:bg-indigo-900 dark:disabled:text-gray-400 sm:text-sm"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
