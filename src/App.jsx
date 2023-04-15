import { useState } from "react";

import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Game from "./pages/game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game/:gameType" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
