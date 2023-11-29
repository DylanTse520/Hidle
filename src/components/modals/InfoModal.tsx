import { Cell } from "../grid/Cell";
import { BaseModal } from "./BaseModal";
import { SettingsToggle } from "./SettingsToggle";

export const InfoModal = ({
  isOpen,
  handleClose,
  isDarkMode,
  handleDarkMode,
  isAccessibilityMode,
  handleAccessibilityMode,
}: {
  isOpen: boolean;
  handleClose: () => void;
  isDarkMode: boolean;
  handleDarkMode: Function;
  isAccessibilityMode: boolean;
  handleAccessibilityMode: Function;
}) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Guess the hidden message as many times as needed. The tile colors will
        change to show how close the guess is to the message. Don't forget to
        hide and share your own message!
      </p>

      <div className="mb-1 mt-5 flex justify-center">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="W"
          status="correct"
        />
        <Cell value="E" isCompleted={true} />
        <Cell value="A" isCompleted={true} />
        <Cell value="R" isCompleted={true} />
        <Cell value="Y" isCompleted={true} />
      </div>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        The letter W is in the word and in the correct spot.
      </p>

      <div className="mb-1 mt-5 flex justify-center">
        <Cell value="P" isCompleted={true} />
        <Cell value="I" isCompleted={true} />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="L"
          status="present"
        />
        <Cell value="O" isCompleted={true} />
        <Cell value="T" isCompleted={true} />
      </div>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        The letter L is in the word but in the wrong spot.
      </p>

      <div className="mb-1 mt-5 flex justify-center">
        <Cell value="V" isCompleted={true} />
        <Cell value="A" isCompleted={true} />
        <Cell value="G" isCompleted={true} />
        <Cell isRevealing={true} isCompleted={true} value="U" status="absent" />
        <Cell value="E" isCompleted={true} />
      </div>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>

      <hr className="my-5"></hr>

      <SettingsToggle
        settingName="Dark Mode"
        flag={isDarkMode}
        handleFlag={handleDarkMode}
      />
      <SettingsToggle
        settingName="Visual Accessibility Mode"
        flag={isAccessibilityMode}
        handleFlag={handleAccessibilityMode}
      />
    </BaseModal>
  );
};
