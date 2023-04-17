import React, { useEffect, useState } from "react";
import "../style/game.css";
import { useParams } from "react-router-dom";
import { GiBolas } from "react-icons/gi";
import { ImUndo2 } from "react-icons/im";
import Field from "../components/field";
import PlayerBar from "../components/playerBar";
import WinnerBar from "../components/winnerBar";

const Game = () => {
  const { gameType } = useParams();
  const [winner, setWinner] = useState({ player: "", winner: "" });
  const [historyMoves, setHistoryMoves] = useState([]);
  const [botPlay, setBotPlay] = useState(false);
  const [symbol, setSymbol] = useState("X");
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
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
      result: localStorage.getItem("player1")
        ? localStorage.getItem("player1")
        : 0,
    },
    {
      id: "2",
      playerMoves: [],
      playerSymbol: "O",
      move: false,
      result: localStorage.getItem("player2")
        ? localStorage.getItem("player2")
        : 0,
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

  //AutoPlay
  useEffect(() => {
    if (historyMoves.length % 2 == 1 && historyMoves.length != 0) {
      autoPlayer();
    }
  }, [symbol]);

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
    checkWinner(
      lastPlayerMoves.playerMoves,
      lastPlayerMoves.id,
      lastPlayerMoves.result
    );
  }, [players]);

  const checkWinner = (playerCombinations, id, result) => {
    let check = false;
    for (let combination of winningCombinations) {
      check = combination.every((field) => playerCombinations.includes(field));
      if (check == true) {
        setWinner((prevState) => {
          return { ...prevState, player: id, winner: true };
        });
        result++;
        return localStorage.setItem(`player${id}`, result);
      }
    }
    if (historyMoves.length == 9) {
      setWinner((prevState) => {
        return { ...prevState, player: "none", winner: false };
      });
    }
  };

  const resetGame = () => {
    setPlayer((prevState) => {
      return prevState.map((player) => {
        console.log(player);
        return {
          ...player,
          playerMoves: [],
          move: player.id == "1" ? true : false,
          result: localStorage.getItem(`player${player.id}`)
            ? localStorage.getItem(`player${player.id}`)
            : 0,
        };
      });
    });
    setFields((prevState) => {
      return prevState.map((field) => {
        return { ...field, field: "" };
      });
    });
    setWinner((prevState) => {
      return { ...prevState, player: "", winner: "" };
    });
    setHistoryMoves([]);
    setSymbol("X");
  };

  const autoPlayer = () => {
    let randomField;
    let availableFields = [];
    for (let i = 1; i <= 9; i++) {
      !historyMoves.includes(i) && availableFields.push(i);
    }

    randomField = Math.floor(Math.random() * (availableFields.length - 1)) + 0;
    let chooseField = availableFields[randomField];
    handleClick(chooseField, "");
  };

  const undo = () => {
    const lastMoveO = historyMoves.pop();
    const lastMoveX = historyMoves.pop();

    setFields((prevState) => {
      return prevState.map((field) => {
        return lastMoveX == field.id || lastMoveO == field.id
          ? { ...field, field: "" }
          : field;
      });
    });
    setPlayer((prevState) => {
      return prevState.map((player) => {
        let undoArray = player.playerMoves.slice(0, -1);
        return {
          ...player,
          playerMoves: [...undoArray],
        };
      });
    });
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
      <div className="reset-section">
        <ImUndo2 className="undo-icon icon" onClick={undo} />
        <GiBolas className="reset-icon icon" onClick={resetGame} />
      </div>
    </div>
  );
};

export default Game;
