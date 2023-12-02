import { default as GraphemeSplitter } from "grapheme-splitter";
import { useEffect, useMemo, useState } from "react";
import Div100vh from "react-div-100vh";
import { useNavigate, useParams } from "react-router-dom";

import { AlertContainer } from "./components/alerts/AlertContainer";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { InfoModal } from "./components/modals/InfoModal";
import { ShareModal } from "./components/modals/ShareModal";
import { Navbar } from "./components/navbar/Navbar";
import { REVEAL_TIME_MS, WELCOME_INFO_MODAL_MS } from "./constants/settings";
import { VALID_GUESSES } from "./constants/validGuesses";
import { useAlert } from "./context/AlertContext";
import { useMessage } from "./context/MessageContext";
import {
  getStoredAccessibleMode,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredAccessibleMode,
} from "./utils/localStorage";
import {
  decode,
  encode,
  localeAwareUpperCase,
  unicodeLength,
} from "./utils/words";

function App() {
  const metaThemeColor = document.querySelector("meta[name='theme-color']");

  const WIN_MESSAGES = useMemo(
    () => ["You got it!", "Great job!", "Well done!"],
    []
  );

  const { code } = useParams();
  const navigate = useNavigate();

  const { message, setMessage } = useMessage();
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();

  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isAccessibleMode, setAccessibleMode] = useState(
    getStoredAccessibleMode()
  );
  const [isRevealing, setIsRevealing] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);

  useEffect(() => {
    if (!code) {
      // if no code is given, randomly choose a word from the word list
      // and navigate to that code
      const randomWord =
        VALID_GUESSES[Math.floor(Math.random() * VALID_GUESSES.length)];
      navigate("/" + encode(localeAwareUpperCase(randomWord)));
    } else {
      // if code is given, set message to decoded code
      setMessage(decode(code));
    }
  }, [code, navigate, setMessage]);

  useEffect(() => {
    if (code) {
      // load game state from local storage
      const loaded = loadGameStateFromLocalStorage();
      if (!loaded) {
        // if no game state is found, save game state to local storage
        saveGameStateToLocalStorage(new Map([[code!, []]]));
        // show welcome info modal
        setTimeout(() => {
          setIsInfoModalOpen(true);
        }, WELCOME_INFO_MODAL_MS);
      } else {
        const storedGuesses = loaded.get(code);
        if (!storedGuesses) {
          // if no stored game state is found, set game state to empty array
          loaded.set(code!, []);
          saveGameStateToLocalStorage(loaded);
          setGuesses([]);
        } else {
          if (storedGuesses.length < guesses.length) {
            // if stored game state is shorter, update stored game state
            loaded.set(code!, guesses);
            saveGameStateToLocalStorage(loaded);
          } else if (storedGuesses.length > guesses.length) {
            // if stored game state is shorter, update guesses
            setGuesses(loaded.get(code)!);
          }
        }
      }
    }
  }, [code, guesses]);

  useEffect(() => {
    // after message and guesses are loaded
    // if message is in guesses, set game won and show success
    if (message && guesses.includes(message) && !isGameWon) {
      setIsGameWon(true);
      showSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      );
    }
  }, [WIN_MESSAGES, guesses, isGameWon, message, showSuccessAlert]);

  useEffect(() => {
    // set dark mode and theme color
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      metaThemeColor?.setAttribute("content", "#0F172A");
    } else {
      document.documentElement.classList.remove("dark");
      metaThemeColor?.setAttribute("content", "#FFFFFF");
    }

    // set accessible mode
    if (isAccessibleMode) {
      document.documentElement.classList.add("accessible");
    } else {
      document.documentElement.classList.remove("accessible");
    }
  }, [isDarkMode, isAccessibleMode, metaThemeColor]);

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleAccessibleMode = (isAccessibleMode: boolean) => {
    setAccessibleMode(isAccessibleMode);
    setStoredAccessibleMode(isAccessibleMode);
  };

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= message.length &&
      !isGameWon &&
      !isRevealing &&
      !isInfoModalOpen &&
      !isShareModalOpen
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
    // if game is already won or is revealing answer, do nothing
    if (isGameWon || isRevealing || isInfoModalOpen || isShareModalOpen) {
      return;
    }

    // if not enough letters, show error
    if (!(unicodeLength(currentGuess) === message.length)) {
      setCurrentRowClass("jiggle");
      return showErrorAlert("Not enough letters", {
        onClose: () => {
          setCurrentRowClass("");
        },
      });
    }

    const delayMs = REVEAL_TIME_MS * message.length;

    // play reveal animation
    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, delayMs);

    // if guess is correct, show success and set game won
    if (message === currentGuess) {
      setIsGameWon(true);
      showSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)],
        {
          delayMs,
        }
      );
    }

    // add guess to guesses
    setGuesses([...guesses, currentGuess]);
    setCurrentGuess("");
  };

  return (
    <Div100vh>
      <div className="flex h-full flex-col dark:bg-slate-900">
        <Navbar
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
          isShareModalOpen={isShareModalOpen}
          setIsShareModalOpen={setIsShareModalOpen}
        />
        <div className="content-height flex w-full flex-col px-1 pb-8 sm:px-6 lg:px-8 short:pb-2">
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            isGameWon={isGameWon}
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
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isAccessibleMode={isAccessibleMode}
            handleAccessibleMode={handleAccessibleMode}
          />
          <ShareModal
            isOpen={isShareModalOpen}
            handleClose={() => setIsShareModalOpen(false)}
          />
          <AlertContainer />
        </div>
      </div>
    </Div100vh>
  );
}

export default App;
