import {
  InformationCircleIcon as InformationOutline,
  PlusCircleIcon as PlusOutline,
} from "@heroicons/react/24/outline";
import {
  InformationCircleIcon as InformationSolid,
  PlusCircleIcon as PlusSolid,
} from "@heroicons/react/24/solid";
import { GAME_TITLE } from "src/constants/strings";

export const Navbar = ({
  isInfoModalOpen,
  setIsInfoModalOpen,
}: {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
}) => {
  return (
    <div className="pb-4">
      <div className="flex-center flex h-12 items-center justify-between px-5 short:h-8">
        <h1 className="text-xl font-bold dark:text-white">{GAME_TITLE}</h1>
        <div className="flex gap-3">
          <div
            className="icon-group group"
            tabIndex={0}
            onClick={() => setIsInfoModalOpen(true)}
            role="button"
            aria-label="Show how to play the game and visual settings"
          >
            <InformationSolid
              className={`icon-solid group-hover:opacity-100${
                isInfoModalOpen ? " opacity-100" : " opacity-0"
              }`}
            />
            <InformationOutline
              className={`icon-outline group-hover:opacity-0${
                isInfoModalOpen ? " opacity-0" : " opacity-100"
              }`}
            />
          </div>
          <div
            className="icon-group group"
            tabIndex={0}
            onClick={() => null}
            role="button"
            aria-label="Create a different game"
          >
            <PlusSolid
              className={`icon-solid group-hover:opacity-100${
                false ? " opacity-100" : " opacity-0"
              }`}
            />
            <PlusOutline
              className={`icon-outline group-hover:opacity-0${
                false ? " opacity-0" : " opacity-100"
              }`}
            />
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
