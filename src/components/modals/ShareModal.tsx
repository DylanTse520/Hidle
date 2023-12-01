import { useState } from "react";
import { useAlert } from "src/context/AlertContext";
import { copyTextToClipboard } from "src/utils/clipboard";
import { encode, localeAwareUpperCase } from "src/utils/words";

import { BaseModal } from "./BaseModal";
import { ShareFormItem } from "./ShareFormItem";

export const ShareModal = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const [message, setMessage] = useState<string>();
  const [code, setCode] = useState<string>();

  const { showSuccess } = useAlert();

  return (
    <BaseModal
      title="Create new game"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-2">
        <ShareFormItem
          inputLabel={"Message to hide:"}
          inputId={"message"}
          inputValue={message}
          buttonText={"Create"}
          buttonDisabled={!message}
          onChange={(value) => {
            const upperCaseMessage = localeAwareUpperCase(value);
            const lettersOnlyMessage = upperCaseMessage.replace(/[^A-Z]/g, "");
            setMessage(lettersOnlyMessage);
          }}
          onClick={() => {
            setCode(encode(message!));
          }}
        />
        <ShareFormItem
          inputLabel={"Share this link:"}
          inputId={"new-game-url"}
          inputValue={code ? window.location.origin + "/" + code : ""}
          inputReadonly
          buttonText={"Copy"}
          buttonDisabled={!code}
          onClick={() => {
            copyTextToClipboard(window.location.origin + "/" + code);
            showSuccess("Copied to clipboard!");
          }}
        />
      </div>
      <hr className="my-5"></hr>
      <h2 className="mb-5 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
        Share current game
      </h2>
      <ShareFormItem
        inputId={"current-game-url"}
        inputValue={window.location.href}
        inputReadonly
        buttonText={"Copy"}
        onClick={() => {
          copyTextToClipboard(window.location.href);
          showSuccess("Copied to clipboard!");
        }}
      />
    </BaseModal>
  );
};
