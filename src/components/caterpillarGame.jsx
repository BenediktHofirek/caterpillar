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
    itemsToCollectCount: 100
  };

  constructor() {
    super();
    this.state.boardCells = boardSetup.makeBoardCells(this.state);
    this.state.computerRunning = 0;
    /*computer level 1-15*/
    this.state.computerLevel = 7;
    this.state.computerLevelRange = [
      5,
      4,
      3.5,
      3,
      2.5,
      2,
      1.5,
      1.2,
      1,
      0.8,
      0.6,
      0.4,
      0.3,
      0.2,
      0.1
    ];
    this.handleHumanMove = handleHumanMove.bind(this);
    this.handleComputerMove = handleComputerMove.bind(this);
    this.findWinner = findWinner.bind(this);
    this.findBadMoves = findBadMoves.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const badMovesUpdate = this.state.badMoves === nextState.badMoves;
    const computerTimeoutRefUpdate =
      this.state.computerTimeoutRef === nextState.computerTimeoutRef;
    return badMovesUpdate && computerTimeoutRefUpdate;
  }

  componentDidUpdate() {
    const { computerTimeoutRef } = this.state;
    const winner = this.findWinner();
    /*winner muze byt i hrac nula, proto se returnuje null pri neuspechu*/
    if (winner !== null) {
      /*pokud vyhral clovek, vypne se stroj aby nedelal dalsi tah*/
      if (winner === 0) clearTimeout(computerTimeoutRef);
      else if (winner === "draw") clearTimeout(computerTimeoutRef);
      return;
    }

    if (!this.state.computerRunning) {
      this.setState({ computerRunning: 1 });
      this.handleBadMoves();
      this.makeComputerMove();
    }
  }

  handleBadMoves = () => {
    const newBadMoves = this.findBadMoves();
    /*update pouze, pokud jsou nove badMoves odlisne od starych*/
    if (newBadMoves !== this.state.badMoves) {
      this.setState({ badMoves: newBadMoves });
    }
  };

  makeComputerMove = () => {
    const { computerLevel: level, computerLevelRange: range } = this.state;
    /* -1 protoze level ma cislovani od jednicky*/
    const currentLevel = range[level - 1];
    const sing = Math.round(Math.random()) ? -1 : 1;
    const timeout = Math.ceil(
      (currentLevel + Math.random() * (currentLevel / 2) * sing) * 1000
    );
    console.log(timeout / 1000);
    const timeoutRef = setTimeout(this.handleComputerMove, timeout);
    this.setState({ computerTimeoutRef: timeoutRef });
  };

  render() {
    const { boardCells, boardSize } = this.state;
    return (
      <Board
        boardCells={boardCells}
        boardSize={boardSize}
        onKeyDown={this.handleHumanMove}
      />
    );
  }
}

export default CaterpilarGame;
