import React, { Component } from "react";

const Board = ({
  boardSize,
  boardCells,
  playersColors,
  itemColor,
  emptyCellColor,
  onKeyDown,
}) => {
  return (
    <table onKeyDown={onKeyDown} tabIndex="0" ref={input => input && input.focus()}>
      <tbody>
        {makeBoard(boardSize, boardCells, playersColors, itemColor, emptyCellColor)}
      </tbody>
    </table>
  );
};

export default Board;

function makeBoard(boardSize, boardCells, playersColors, itemColor, emptyCellColor) {
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
            backgroundColor: selectColor(player, item, playersColors, itemColor, emptyCellColor)
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

function selectColor(player, item, playersColors, itemColor, emptyCellColor) {
  if (player) {
    if (player.head === true)
      return playersColors[player.number].headColor;
    else return playersColors[player.number].bodyColor;
  } else if (item === "item") return itemColor;
  else return emptyCellColor;
}
