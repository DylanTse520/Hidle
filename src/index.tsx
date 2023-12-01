import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { AlertProvider } from "./context/AlertContext";
import { MessageProvider } from "./context/MessageContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
