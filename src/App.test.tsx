import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";

import App from "./App";

// Mock the module that contains useParams and useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn().mockImplementation((query) => ({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

test("renders App component", () => {
  // Mock the useParams hook
  (useParams as jest.Mock).mockReturnValue({ code: "X0RALT01fRg" });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const linkElement = screen.getByText("Hidle");
  expect(linkElement).toBeInTheDocument();
});
