import { default as GraphemeSplitter } from "grapheme-splitter";
import { useContext, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useNavigate, useParams } from "react-router-dom";

import { AlertContainer } from "./components/alerts/AlertContainer";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { InfoModal } from "./components/modals/InfoModal";
import { MigrateStatsModal } from "./components/modals/MigrateStatsModal";
import { SettingsModal } from "./components/modals/SettingsModal";
import { StatsModal } from "./components/modals/StatsModal";
import { Navbar } from "./components/navbar/Navbar";
import {
  DISCOURAGE_IN_APP_BROWSERS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
} from "./constants/settings";
import {
  CORRECT_WORD_MESSAGE,
  DISCOURAGE_IN_APP_BROWSER_TEXT,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WIN_MESSAGES,
} from "./constants/strings";
import { useAlert } from "./context/AlertContext";
import { SolutionContext } from "./context/SolutionContext";
import { isInAppBrowser } from "./utils/browser";
import {
  getStoredIsHighContrastMode,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
} from "./utils/localStorage";
import { addStatsForCompletedGame, loadStats } from "./utils/stats";
import { getSolution, unicodeLength } from "./utils/words";

function App() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { solution, setSolution } = useContext(SolutionContext);

  useEffect(() => {
    if (!code) {
      navigate("/welcome"); // todo: randomly choose a word
    } else {
      setSolution(getSolution(code));
    }
  }, [code, navigate, setSolution]);

  const isLatestGame = true;
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false);
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
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true);
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      });
    }
    return loaded.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, WELCOME_INFO_MODAL_MS);
    }
  });

  useEffect(() => {
    DISCOURAGE_IN_APP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_IN_APP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      });
  }, [showErrorAlert]);

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

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast);
    setStoredIsHighContrastMode(isHighContrast);
  };

  const clearCurrentRowClass = () => {
    setCurrentRowClass("");
  };

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
      const delayMs = REVEAL_TIME_MS * solution.length;

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      });
    }

    if (isGameLost) {
      setTimeout(
        () => {
          setIsStatsModalOpen(true);
        },
        (solution.length + 1) * REVEAL_TIME_MS
      );
    }
  }, [isGameWon, isGameLost, showSuccessAlert]);

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES &&
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
    if (isGameWon || isGameLost) {
      return;
    }

    if (!(unicodeLength(currentGuess) === solution.length)) {
      setCurrentRowClass("jiggle");
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      });
    }

    // todo: in word mode, check if word is in word list
    // if (!isWordInWordList(currentGuess)) {
    //   setCurrentRowClass("jiggle");
    //   return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
    //     onClose: clearCurrentRowClass,
    //   });
    // }

    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, REVEAL_TIME_MS * solution.length);

    if (
      unicodeLength(currentGuess) === solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (solution === currentGuess) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length));
        }
        return setIsGameWon(true);
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        }
        setIsGameLost(true);
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.length + 1,
        });
      }
    }
  };

  return (
    <Div100vh>
      <div className="flex h-full flex-col dark:bg-slate-900">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />
        <div className="mx-auto flex w-full grow flex-col px-1 pb-8 pt-2 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
          <div className="flex grow flex-col justify-center pb-6 short:pb-2">
            <Grid
              solution={solution}
              guesses={guesses}
              currentGuess={currentGuess}
              isRevealing={isRevealing}
              currentRowClassName={currentRowClass}
            />
          </div>
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
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            gameStats={stats}
            isLatestGame={isLatestGame}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            handleMigrateStatsButton={() => {
              setIsStatsModalOpen(false);
              setIsMigrateStatsModalOpen(true);
            }}
            numberOfGuessesMade={guesses.length}
          />
          <MigrateStatsModal
            isOpen={isMigrateStatsModalOpen}
            handleClose={() => setIsMigrateStatsModalOpen(false)}
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
