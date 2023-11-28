import { default as GraphemeSplitter } from "grapheme-splitter";
import { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useNavigate, useParams } from "react-router-dom";

import { AlertContainer } from "./components/alerts/AlertContainer";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { InfoModal } from "./components/modals/InfoModal";
import { SettingsModal } from "./components/modals/SettingsModal";
import { Navbar } from "./components/navbar/Navbar";
import { REVEAL_TIME_MS, WELCOME_INFO_MODAL_MS } from "./constants/settings";
import { NOT_ENOUGH_LETTERS_MESSAGE, WIN_MESSAGES } from "./constants/strings";
import { useAlert } from "./context/AlertContext";
import { useSolution } from "./context/SolutionContext";
import {
  getStoredIsHighContrastMode,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
} from "./utils/localStorage";
import { getSolution, unicodeLength } from "./utils/words";

function App() {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const { code } = useParams();
  const navigate = useNavigate();
  const { solution, setSolution } = useSolution();

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : prefersDarkMode
  );
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  );
  const [isRevealing, setIsRevealing] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.solution !== solution) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    return loaded.guesses;
  });

  useEffect(() => {
    if (!code) {
      navigate("/WELCOME"); // todo: randomly choose a word
    } else {
      setSolution(getSolution(code));
    }
  }, [code, navigate, setSolution]);

  useEffect(() => {
    // if no game state is loaded, show welcome modal
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, WELCOME_INFO_MODAL_MS);
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [isDarkMode, isHighContrastMode]);

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses, solution]);

  useEffect(() => {
    // if game is won, show success alert
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
      const delayMs = REVEAL_TIME_MS * solution.length;

      showSuccessAlert(winMessage, {
        delayMs,
      });
    }
  }, [isGameWon, showSuccessAlert, solution]);

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast);
    setStoredIsHighContrastMode(isHighContrast);
  };

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.length &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join("")
    );
  };

  const onEnter = () => {
    // if game is already won, do nothing
    if (isGameWon) {
      return;
    }

    // if not enough letters, show error
    if (!(unicodeLength(currentGuess) === solution.length)) {
      setCurrentRowClass("jiggle");
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: () => {
          setCurrentRowClass("");
        },
      });
    }

    // todo: in word mode, check if word is in word list
    // if guess is not a word, show error
    // if (!isWordInWordList(currentGuess)) {
    //   setCurrentRowClass("jiggle");
    //   return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
    //     onClose: () => {
    //       setCurrentRowClass("");
    //     },
    //   });
    // }

    // play reveal animation
    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, REVEAL_TIME_MS * solution.length);

    // add guess to guesses
    setGuesses([...guesses, currentGuess]);
    setCurrentGuess("");

    // if guess is correct, set game won
    if (solution === currentGuess) {
      return setIsGameWon(true);
    }
  };

  return (
    <Div100vh>
      <div className="flex h-full flex-col dark:bg-slate-900">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />
        <div className="content-height flex w-full flex-col px-1 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2">
          <Grid
            solution={solution}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            isRevealing={isRevealing}
          />
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isHighContrastMode={isHighContrastMode}
            handleHighContrastMode={handleHighContrastMode}
          />
          <AlertContainer />
        </div>
      </div>
    </Div100vh>
  );
}

export default App;
