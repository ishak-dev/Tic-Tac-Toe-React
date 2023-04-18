import React, { useEffect, useRef, useState } from "react";
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
  const [playerOnMove, setPlayerOnMove] = useState(1);
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
      symbol: "X",
      move: true,
      result: localStorage.getItem("player1")
        ? localStorage.getItem("player1")
        : 0,
    },
    {
      id: "2",
      playerMoves: [],
      symbol: "O",
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

  const handleClick = (fieldId, field) => {
    console.log(fieldId);
    if (winner.winner) return console.log("Winner already exist");
    if (field != "") return console.log("field must be empty");
    setFields((prevState) => {
      return prevState.map((field) => {
        return fieldId == field.id && field.field == ""
          ? { ...field, field: getUserSymbol() }
          : field;
      });
    });

    handlePlayer(fieldId);
    setHistoryMoves((prevHistory) => [...prevHistory, fieldId]);
  };

  const getUserSymbol = () => {
    console.log(playerOnMove);
    let player = players.find((player) => player.move === true);
    return player.symbol;
  };

  //Autoplay
  if (gameType == "onePlayer") {
    useEffect(() => {
      if (getUserSymbol() === "O") {
        setTimeout(() => autoPlayer(), 500);
      }
    }, [playerOnMove]);
  }

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
    let player = players.find((player) => player.move === false);
    checkWinner(player.playerMoves, player.id, player.result);
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
    if (historyMoves.length != 0) {
      setPlayerOnMove((prevMove) => (prevMove == 1 ? 2 : 1));
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
  };

  const undo = () => {
    setPlayer((prevState) => {
      return prevState.map((player) => {
        let undoArray = player.playerMoves.slice(0, -1);
        if (gameType == "onePlayer") {
          return {
            ...player,
            playerMoves: [...undoArray],
          };
        } else if (gameType == "twoPlayers") {
          return player.move == false
            ? {
                ...player,
                playerMoves: [...undoArray],
                move: true,
              }
            : {
                ...player,
                move: false,
              };
        }
      });
    });
    if (gameType == "twoPlayers") {
      const lastMove = historyMoves.pop();
      setFields((prevState) => {
        return prevState.map((field) => {
          return lastMove == field.id ? { ...field, field: "" } : field;
        });
      });
    } else if (gameType == "onePlayer") {
      console.log(historyMoves);
      const lastMoveO = historyMoves.pop();
      const lastMoveX = historyMoves.pop();
      setFields((prevState) => {
        return prevState.map((field) => {
          return lastMoveO == field.id || lastMoveX == field.id
            ? { ...field, field: "" }
            : field;
        });
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
      <div className="reset-section">
        <ImUndo2 className="undo-icon icon" onClick={undo} />
        <GiBolas className="reset-icon icon" onClick={resetGame} />
      </div>
    </div>
  );
};

export default Game;
