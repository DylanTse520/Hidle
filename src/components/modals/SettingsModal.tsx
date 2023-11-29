import { BaseModal } from "./BaseModal";
import { SettingsToggle } from "./SettingsToggle";

export const SettingsModal = ({
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
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-2 flex flex-col divide-y">
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
      </div>
    </BaseModal>
  );
};
