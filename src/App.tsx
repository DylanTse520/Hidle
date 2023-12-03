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
  loadAccessibleMode,
  loadDarkMode,
  loadGameState,
  saveAccessibleMode,
  saveDarkMode,
  saveGameState,
} from "./utils/storage";
import {
  decode,
  encode,
  localeAwareUpperCase,
  unicodeLength,
} from "./utils/words";

function App() {
  const WIN_MESSAGES = useMemo(
    () => ["You got it!", "Great job!", "Well done!"],
    []
  );

  const { code } = useParams();
  const navigate = useNavigate();
  const { message, setMessage } = useMessage();
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(loadDarkMode());
  const [isAccessibleMode, setAccessibleMode] = useState(loadAccessibleMode());

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
      // clear current guess and guesses
      setCurrentGuess("");
      setGuesses([]);
    }
  }, [code, navigate, setMessage]);

  useEffect(() => {
    // this useEffect loads game state from local storage
    if (code) {
      // read local storage
      const loaded = loadGameState();
      if (!loaded) {
        // if no game state is found, save game state to local storage
        saveGameState(new Map([[code!, []]]));
        // show welcome info modal
        setTimeout(() => {
          setIsInfoModalOpen(true);
        }, WELCOME_INFO_MODAL_MS);
      } else {
        // if game state is found, get stored guesses
        const storedGuesses = loaded.get(code);
        if (!storedGuesses) {
          // if no stored guesses is found, save empty guesses to local storage
          loaded.set(code!, []);
          saveGameState(loaded);
        } else if (storedGuesses.length > guesses.length) {
          // if stored guesses is found, set guesses to stored guesses
          setGuesses(storedGuesses);
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
    const handleChange = () => {
      setIsDarkMode(loadDarkMode());
    };
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // set dark mode and theme color
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
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
  }, [isDarkMode, isAccessibleMode]);

  const handleDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
    saveDarkMode(isDarkMode);
  };

  const handleAccessibleMode = (isAccessibleMode: boolean) => {
    setAccessibleMode(isAccessibleMode);
    saveAccessibleMode(isAccessibleMode);
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
    if (!isInfoModalOpen && !isShareModalOpen) {
      setCurrentGuess(
        new GraphemeSplitter()
          .splitGraphemes(currentGuess)
          .slice(0, -1)
          .join("")
      );
    }
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

    // update guesses
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    // clear current guess
    setCurrentGuess("");
    // update game state
    const loaded = loadGameState();
    loaded!.set(code!, newGuesses);
    saveGameState(loaded!);

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
