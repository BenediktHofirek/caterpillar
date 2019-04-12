import React, { Component } from "react";
import handleComputerMove from "../services/computerMove";
import handleHumanMove from "../services/humanMove";
import Board from "./board";
import boardSetup from "../services/boardSetup";

class CaterpilarGame extends Component {
  state = {
    boardSize: 15,
    itemsToCollectCount: 100
  };

  constructor() {
    super();
    this.state.boardCells = boardSetup.makeBoardCells(this.state);
    this.state.computerRunning = 0;
    this.state.computerLevel = 9.9;
    this.state.levelCount = 10;
    this.handleHumanMove = handleHumanMove.bind(this);
    this.handleComputerMove = handleComputerMove.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.computerRunning) {
      this.setState({ computerRunning: 1 });
      this.makeComputerMove();
    }
  }

  makeComputerMove = () => {
    const { computerLevel: level, levelCount } = this.state;
    const random = Math.random();
    const timeout = Math.ceil(random * 1000) * (levelCount - level);
    setTimeout(this.handleComputerMove, timeout);
  };

  render() {
    const { boardCells, boardSize, itemsToCollectCount } = this.state;
    return (
      <Board
        boardCells={boardCells}
        boardSize={boardSize}
        itemsToCollectCount={itemsToCollectCount}
        onKeyDown={this.handleHumanMove}
      />
    );
  }
}

export default CaterpilarGame;
