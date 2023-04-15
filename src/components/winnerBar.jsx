import React from "react";

const WinnerBar = ({ player, winner }) => {
  return (
    <div>
      {winner && <p className="animation">We have winner Player{player}</p>}
    </div>
  );
};

export default WinnerBar;
