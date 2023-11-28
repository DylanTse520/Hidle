import {
  Cog8ToothIcon as CogOutline,
  InformationCircleIcon as InformationOutline,
  PlusCircleIcon as PlusOutline,
} from "@heroicons/react/24/outline";
import {
  Cog8ToothIcon as CogSolid,
  InformationCircleIcon as InformationSolid,
  PlusCircleIcon as PlusSolid,
} from "@heroicons/react/24/solid";
import { GAME_TITLE } from "src/constants/strings";

export const Navbar = ({
  setIsInfoModalOpen,
  setIsSettingsModalOpen,
}: {
  setIsInfoModalOpen: (value: boolean) => void;
  setIsSettingsModalOpen: (value: boolean) => void;
}) => {
  return (
    <div className="pb-4">
      <div className="flex-center flex h-12 items-center justify-between px-5 short:h-8">
        <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="flex gap-3">
          <div
            className="icon-group group"
            tabIndex={0}
            onClick={() => setIsInfoModalOpen(true)}
            role="button"
            aria-label="How to play this game"
          >
            <InformationSolid className="icon-solid group-hover:opacity-100" />
            <InformationOutline className="icon-outline group-hover:opacity-0" />
          </div>
          <div
            className="icon-group group"
            tabIndex={0}
            onClick={() => null}
            role="button"
            aria-label="View game statistics"
          >
            <PlusSolid className="icon-solid group-hover:opacity-100" />
            <PlusOutline className="icon-outline group-hover:opacity-0" />
          </div>
          <div
            className="icon-group group"
            tabIndex={0}
            onClick={() => setIsSettingsModalOpen(true)}
            role="button"
            aria-label="Settings"
          >
            <CogSolid className="icon-solid group-hover:opacity-100" />
            <CogOutline className="icon-outline group-hover:opacity-0" />
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
