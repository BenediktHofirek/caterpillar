import React from "react";
import { gameOverMessages } from "../services/config.json";

const Winner = ({ winner, newGame }) => {
  if (winner === null) return null;

  let message;
  const colors = gameOverMessages;
  const index = colors.findIndex(e => e.id === winner);

  switch (winner) {
    case 0: {
      message = "Congratulation, you won!";
      break;
    }
    case 1: {
      message = "Unfortunatelly, you lost!";
      break;
    }
    case "draw": {
      message = "Wow, it's a draw!";
      break;
    }
  }

  return (
    <div className="game-over-message-wrapper">
      <div
        style={{
          backgroundColor: colors[index].bgc,
          color: colors[index].c
        }}
        className="game-over-message"
      >
        <h3>{message}</h3>
        <button
          className="btn btn-lg m-2 btn-primary button-new-game"
          onClick={newGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Winner;
