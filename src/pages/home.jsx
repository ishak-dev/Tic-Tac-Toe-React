import React from "react";
import "../style/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-section">
      <Link className="one-player-btn btn" to="game/onePlayer">
        One Player
      </Link>

      <Link className="two-players-btn btn" to="game/twoPlayers">
        Two Players
      </Link>
    </div>
  );
};

export default Home;
