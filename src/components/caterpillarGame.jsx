import React, { Component } from "react";
import handleComputerMove from "../services/computerMove";
import handleHumanMove from "../services/humanMove";
import findWinner from "../services/findWinner";
import findBadMoves from "../services/findBadMoves";
import Board from "./board";
import boardSetup from "../services/boardSetup";

class CaterpilarGame extends Component {
  state = {
    boardSize: 18,
    itemsToCollectCount: 400
  };

  constructor() {
    super();
    this.state.boardCells = boardSetup.makeBoardCells(this.state);
    this.state.computerRunning = 0;
    this.state.computerLevel = 9.999;
    this.state.levelCount = 10;
    this.handleHumanMove = handleHumanMove.bind(this);
    this.handleComputerMove = handleComputerMove.bind(this);
    this.findWinner = findWinner.bind(this);
    this.findBadMoves = findBadMoves.bind(this);
  }

  componentDidUpdate() {
    const { computerTimeoutRef } = this.state;
    const winner = this.findWinner();
    /*winner muze byt i hrac nula, proto se returnuje null pri neuspechu*/
    if (winner !== null) {
      /*pokud vyhral clovek, vypne se stroj aby nedelal dalsi tah*/
      if (winner === 0) clearTimeout(computerTimeoutRef);
      return;
    }

    if (!this.state.computerRunning) {
      this.setState({ computerRunning: 1 });
      this.makeComputerMove();
    }
  }

  makeComputerMove = () => {
    const { computerLevel: level, levelCount } = this.state;
    const random = Math.random();
    const timeout = Math.ceil(random * 1000) * (levelCount - level);
    const timeoutRef = setTimeout(this.handleComputerMove, timeout);
    this.setState({ computerTimeoutRef: timeoutRef });
    /*v case mezi jednotlivymi tahy pocitace probehne ochrana proti zamotani*/
    const badMoves = this.findBadMoves();
    if (badMoves.length !== 0) {this.setState({ badMoves }); 
    console.log("BadMove FINDED", badMoves);
  
  };
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
