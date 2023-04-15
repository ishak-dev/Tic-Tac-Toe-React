import React from "react";

const PlayerBar = ({ id, move, result }) => {
  return (
    <div
      className={`player player-${id == 1 ? "first" : "second"} ${
        move && "active"
      }`}
    >
      {id == 1 ? (
        <p>
          Player{id} <span>{result}</span>
        </p>
      ) : (
        <p>
          <span>{result}</span> Player{id}{" "}
        </p>
      )}
    </div>
  );
};

export default PlayerBar;
