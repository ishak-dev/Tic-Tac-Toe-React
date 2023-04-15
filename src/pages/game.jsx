import React, { useState } from "react";
import "../style/game.css";
import { useParams } from "react-router-dom";
import Field from "../components/field";

const Game = (e) => {
  const { gameType } = useParams();
  let historyMoves = [];
  const [symbol, setSymbol] = useState("X");
  const [player, setPlayer] = useState([
    {
      id: "1",
      playerMoves: [],
      playerSymbol: "X",
      move: true,
    },
    {
      id: "2",
      playerMoves: [],
      playerSymbol: "O",
      move: false,
    },
  ]);

  const [fields, setFields] = useState([
    { id: 1, field: "" },
    { id: 2, field: "" },
    { id: 3, field: "" },
    { id: 4, field: "" },
    { id: 5, field: "" },
    { id: 6, field: "" },
    { id: 7, field: "" },
    { id: 8, field: "" },
    { id: 9, field: "" },
  ]);
  console.log(gameType);

  const handleClick = (id) => {
    setFields((prevState) => {
      return prevState.map((field) => {
        return id == field.id && field.field == ""
          ? { ...field, field: symbol }
          : field;
      });
    });
    !historyMoves.includes(id) && handlePlayer(id);
    historyMoves.push(id);
    setSymbol((prevState) => (prevState == "X" ? "O" : "X"));
  };

  const handlePlayer = (id) => {
    setPlayer((prevState) => {
      return prevState.map((player) => {
        return player.move == true
          ? {
              ...player,
              move: !player.move,
              playerMoves: [...player.playerMoves, id],
            }
          : { ...player, move: !player.move };
      });
    });
    console.log(player);
  };

  return (
    <div className="game-container">
      <div className="grid-container">
        {fields.map((field) => (
          <Field id={field.id} field={field.field} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Game;
