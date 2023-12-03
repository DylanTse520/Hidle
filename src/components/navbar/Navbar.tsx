import {
  InformationCircleIcon as InformationOutline,
  PlusCircleIcon as PlusOutline,
} from "@heroicons/react/24/outline";
import {
  InformationCircleIcon as InformationSolid,
  PlusCircleIcon as PlusSolid,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { VALID_GUESSES } from "src/constants/validGuesses";
import { encode, localeAwareUpperCase } from "src/utils/words";

export const Navbar = ({
  isInfoModalOpen,
  setIsInfoModalOpen,
  isShareModalOpen,
  setIsShareModalOpen,
}: {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (value: boolean) => void;
}) => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    const randomWord =
      VALID_GUESSES[Math.floor(Math.random() * VALID_GUESSES.length)];
    navigate("/" + encode(localeAwareUpperCase(randomWord)));
  };

  return (
    <div className="pb-4">
      <div className="flex-center flex h-12 items-center justify-between px-5 short:h-8">
        <h1
          className="text-xl font-bold leading-5 focus-visible:rounded
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
          focus-visible:outline-indigo-600 dark:text-white dark:focus-visible:outline-indigo-400"
          title="Guess a random new message"
          tabIndex={2}
          role="button"
          onClick={() => {
            handleHeaderClick();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleHeaderClick();
            }
          }}
        >
          Hidle
        </h1>
        <div className="flex gap-3">
          <div
            className="icon-group group"
            tabIndex={1}
            onClick={() => {
              setIsInfoModalOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsInfoModalOpen(true);
              }
            }}
            role="button"
            aria-label="Open modal for how to play and visual settings"
            title="How to play instructions and visual settings"
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
            tabIndex={1}
            onClick={() => {
              setIsShareModalOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsShareModalOpen(true);
              }
            }}
            role="button"
            aria-label="Open modal to hide new message to share"
            title="Hide a new message to share"
          >
            <PlusSolid
              className={`icon-solid group-hover:opacity-100${
                isShareModalOpen ? " opacity-100" : " opacity-0"
              }`}
            />
            <PlusOutline
              className={`icon-outline group-hover:opacity-0${
                isShareModalOpen ? " opacity-0" : " opacity-100"
              }`}
            />
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
