import React from "react";

const WinnerBar = ({ player, winner }) => {
  if (winner) {
    return <p className="animation">We have winner Player{player}</p>;
  } else if (winner === false) return <p className="animation">Tie</p>;
};

export default WinnerBar;
