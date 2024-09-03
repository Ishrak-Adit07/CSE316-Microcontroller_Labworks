import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/app.css";
import PlayersProvider from "./contexts/PlayersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayersProvider>
      <App />
    </PlayersProvider>
  </React.StrictMode>
);
