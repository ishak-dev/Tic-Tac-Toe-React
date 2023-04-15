import React, { useEffect, useState } from "react";
import "../style/game.css";
import { useParams } from "react-router-dom";
import Field from "../components/field";
import PlayerBar from "../components/playerBar";
import WinnerBar from "../components/winnerBar";

const Game = () => {
  const { gameType } = useParams();
  const [winner, setWinner] = useState({ player: "", winner: false });
  const [historyMoves, setHistoryMoves] = useState([]);
  const [symbol, setSymbol] = useState("X");
  const winningCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const [players, setPlayer] = useState([
    {
      id: "1",
      playerMoves: [],
      playerSymbol: "X",
      move: true,
      result: 0,
    },
    {
      id: "2",
      playerMoves: [],
      playerSymbol: "O",
      move: false,
      result: 0,
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

  const handleClick = (id, field) => {
    console.log(winner);
    if (winner.winner == true) return console.log("Winner already exist");
    if (field != "") return console.log("field must be empty");
    setFields((prevState) => {
      return prevState.map((field) => {
        return id == field.id && field.field == ""
          ? { ...field, field: symbol }
          : field;
      });
    });

    handlePlayer(id);
    setHistoryMoves((prevHistory) => [...prevHistory, id]);
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
  };

  useEffect(() => {
    let lastPlayerMoves = players.find((player) => player.move === false);
    checkWinner(lastPlayerMoves.playerMoves, lastPlayerMoves.id);
  }, [players]);

  const checkWinner = (playerCombinations, id) => {
    let check = false;
    for (let combination of winningCombinations) {
      check = combination.every((field) => playerCombinations.includes(field));
      if (check == true)
        setWinner((prevState) => {
          return { ...prevState, player: id, winner: true };
        });
    }
  };

  return (
    <div className="game-container">
      <div className="winner-bar ">
        <WinnerBar winner={winner.winner} player={winner.player} />
      </div>
      <div className="player-bar">
        {players.map((player) => (
          <PlayerBar id={player.id} result={player.result} move={player.move} />
        ))}
      </div>
      <div className="grid-container">
        {fields.map((field) => (
          <Field id={field.id} field={field.field} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Game;
