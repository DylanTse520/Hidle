import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { AlertProvider } from "./context/AlertContext";
import { MessageProvider } from "./context/MessageContext";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AlertProvider>
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/:code" element={<App />} />
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </AlertProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
