import { ReactNode, createContext, useContext, useState } from "react";

export const SolutionContext = createContext<{
  solution: string;
  setSolution: (newSolution: string) => void;
}>({
  solution: "HELLO",
  setSolution: () => null,
});

export const useSolution = () => useContext(SolutionContext);

export const SolutionProvider = ({ children }: { children: ReactNode }) => {
  const [solution, setSolution] = useState("HELLO");

  return (
    <SolutionContext.Provider
      value={{
        solution,
        setSolution,
      }}
    >
      {children}
    </SolutionContext.Provider>
  );
};
