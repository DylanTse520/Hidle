import { ReactNode, createContext, useContext, useState } from "react";

export const MessageContext = createContext<{
  message: string;
  setMessage: (message: string) => void;
}>({
  message: "HELLO",
  setMessage: () => null,
});

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("HELLO");

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
