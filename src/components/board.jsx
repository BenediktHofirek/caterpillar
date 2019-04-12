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

class Board extends Component {


  setColor({ player, item }) {
    if (player) {
      if (player.head === true)
        return player.number === 0 ? player0HeadColor : player1HeadColor;
      else return player.number === 0 ? player0Color : player1Color;
    } else if (item === "item") return itemColor;
    else return emptyCellColor;
  }

  makeBoard() {
    const { boardSize, boardCells } = this.props;
    let board = [];

    for (let x = 0; x < boardSize; x++) {
      let boardRow = [];

      for (let y = 0; y < boardSize; y++) {
        const orderNumber = x * boardSize + y;
        boardRow[y] = (
          <td
            key={y}
            style={{ backgroundColor: this.setColor(boardCells[orderNumber]) }}
          >
            <BoardCell displayInfo={boardCells[orderNumber]} />
          </td>
        );
      }

      board[x] = <tr key={x}>{boardRow}</tr>;
    }

    return board;
  }

  render() {
    return (
      <table onKeyDown={this.props.onKeyDown} tabIndex="0">
        <tbody>{this.makeBoard()}</tbody>
      </table>
    );
  }
}

export default Board;
