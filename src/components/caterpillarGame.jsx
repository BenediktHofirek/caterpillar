import React, { Component } from "react";
import handleComputerMove from "../services/computerMove";
import handleHumanMove from "../services/humanMove";
import findWinner from "../services/findWinner";
import findBadMoves from "../services/findBadMoves";
import Board from "./board";
import boardSetup from "../services/boardSetup";

class CaterpilarGame extends Component {
  state = {
    boardSize: 20,
    itemsToCollectCount: 100
  };

  constructor() {
    super();
    this.state.boardCells = boardSetup.makeBoardCells(this.state);
    this.state.computerRunning = 0;
    /*computer level 1-10*/
    this.state.computerLevel = 1;
    this.state.computerLevelRange = [5, 4, 3.2, 2.5, 1.8, 1.3, 1, 0.7, 0.5, 0.3];
    this.handleHumanMove = handleHumanMove.bind(this);
    this.handleComputerMove = handleComputerMove.bind(this);
    this.findWinner = findWinner.bind(this);
    this.findBadMoves = findBadMoves.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    const badMovesUpdate = this.state.badMoves === nextState.badMoves;
    const computerTimeoutRefUpdate = this.state.computerTimeoutRef === nextState.computerTimeoutRef;
    return (badMovesUpdate && computerTimeoutRefUpdate);
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
    const { computerLevel: level, computerLevelRange: range } = this.state;
    /* -1 protoze level ma cislovani od jednicky*/
    const currentLevel = range[level-1];
    const random = Math.random();
    const sing = Math.round(Math.random()) ? -1 : 1 ;
    const timeout = (currentLevel + Math.ceil(random * currentLevel/2)) * 1000 * sing;
    console.log(timeout/1000);
    const timeoutRef = setTimeout(this.handleComputerMove, timeout);
    this.setState({ computerTimeoutRef: timeoutRef });
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
