import React, { Component } from "react";
import {
  player0HeadColor,
  player1HeadColor,
  player0Color,
  player1Color,
  itemColor,
  emptyCellColor
} from "../services/config.json";
import BoardCell from "./boardCell";

const Board = ({ boardSize, boardCells, onKeyDown }) => {
  return (
    <table onKeyDown={onKeyDown} tabIndex="0">
      <tbody>{makeBoard(boardSize, boardCells)}</tbody>
    </table>
  );
};

export default Board;

function makeBoard(boardSize, boardCells) {
  let board = [];

  for (let x = 0; x < boardSize; x++) {
    let boardRow = [];

    for (let y = 0; y < boardSize; y++) {
      const orderNumber = x * boardSize + y;
      const { player, item, char } = boardCells[orderNumber];
      boardRow[y] = (
        <td
          key={y}
          style={{
            backgroundColor: selectColor(player, item)
          }}
        >
          {!player ? char : null}
        </td>
      );
    }

    board[x] = <tr key={x}>{boardRow}</tr>;
  }

  return board;
}

function selectColor(player, item) {
  if (player) {
    if (player.head === true)
      return player.number === 0 ? player0HeadColor : player1HeadColor;
    else return player.number === 0 ? player0Color : player1Color;
  } else if (item === "item") return itemColor;
  else return emptyCellColor;
}
