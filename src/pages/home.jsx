import React from "react";
import "../style/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-section">
      <button className="one-player-btn btn">
        <Link to="game/newGame">One Player</Link>
      </button>
      <button className="two-players-btn btn">
        <Link to="game" params={{ game: "twoPlayers" }} />
        Two Players
      </button>
    </div>
  );
};

export default Home;
