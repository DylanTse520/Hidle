import { HIGH_CONTRAST_MODE_DESCRIPTION } from "src/constants/strings";

import { BaseModal } from "./BaseModal";
import { SettingsToggle } from "./SettingsToggle";

export const SettingsModal = ({
  isOpen,
  handleClose,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
}: {
  isOpen: boolean;
  handleClose: () => void;
  isDarkMode: boolean;
  handleDarkMode: Function;
  isHighContrastMode: boolean;
  handleHighContrastMode: Function;
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
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
      </div>
    </BaseModal>
  );
};
