import React, { Component } from "react";
import GameNavigation from "./gameNavigation";
import Settings from "./settings";
import Board from "./board";
import boardSetup from "../services/boardSetup";
import handleComputerMove from "../services/computerMove";
import handleHumanMove from "../services/handleHumanMove";
import findWinner from "../services/findWinner";
import findBadMoves from "../services/findBadMoves";
import {
  computerLevelRange,
  player0HeadColor,
  player1HeadColor,
  player0Color,
  player1Color,
  itemColor,
  emptyCellColor
} from "../services/config.json";

class CaterpilarGame extends Component {
  state = {
    boardSize: 18,
    /*od 1 do 5*/
    itemsToCollectCount: 3,
    playersColors: [
      { headColor: player0HeadColor, bodyColor: player0Color },
      { headColor: player1HeadColor, bodyColor: player1Color }
    ],
    /*jestli je okno nastaveni aktivni*/
    showSettings: false,

    itemColor: itemColor,
    emptyCellColor: emptyCellColor,

    /*gameHas... kontroluje, aby computer nezacal hrat jako prvni*/
    gameHasStarted: false,
    computerRunning: 0,

    /*computer level 1-15*/
    computerLevel: 5,
    computerLevelRange: computerLevelRange
  };

  constructor() {
    super();

    this.boardSetup = boardSetup.bind(this);
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

  /*pro nacteni boardu pri prvnim nacteni stranky*/
  componentWillMount() {
    if (!this.state.boardCells) {
      this.makeNewBoard();
    }
  }

  componentDidUpdate() {
    const { computerTimeoutRef, computerRunning, gameHasStarted } = this.state;
    const winner = this.findWinner();
    /*winner muze byt i hrac nula, proto se returnuje null pri neuspechu*/
    if (winner !== null) {
      /*pokud vyhral clovek, vypne se stroj aby nedelal dalsi tah*/
      if (winner === 0) {
        clearTimeout(computerTimeoutRef);
        this.setState({ winner });
      } else if (winner === "draw") {
        clearTimeout(computerTimeoutRef);
        this.setState({ winner });
      }
      return;
    } else if (!computerRunning && gameHasStarted) {
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
    return;
  };

  makeComputerMove = () => {
    const { computerLevel: level, computerLevelRange: range } = this.state;
    /* -1 protoze level ma cislovani od jednicky*/
    const currentLevel = range[level - 1];
    const sing = Math.round(Math.random()) ? -1 : 1;
    const timeout = Math.ceil(
      (currentLevel + Math.random() * (currentLevel / 2) * sing) * 1000
    );
    const timeoutRef = setTimeout(this.handleComputerMove, timeout);
    this.setState({ computerTimeoutRef: timeoutRef });
  };

  stopGame = () => {
    const { computerTimeoutRef } = this.state;
    if (computerTimeoutRef) clearTimeout(computerTimeoutRef);
    this.setState({ computerRunning: 0, gameHasStarted: false });
  };

  handleNewGame = () => {
    this.stopGame();
    this.makeNewBoard();
  };

  proofItemsCount = boardCells => {
    /*zajisti, aby pocet itemu nebyl nula*/
    const count = boardCells.filter(e => e.item === "item").length;
    return count; /*kdyz je count nula, vrati se false*/
  };

  makeNewBoard = async () => {
    let newBoardCells;
    while (true) {
      newBoardCells = this.boardSetup();
      if (this.proofItemsCount(newBoardCells)) break;
    }

    await this.setState({ boardCells: newBoardCells });
  };

  handleLevelChange = ({ currentTarget }) => {
    this.setState({ computerLevel: currentTarget.value });
  };

  handleShowSettings = () => {
    this.stopGame();
    this.setState({ showSettings: true });
  };

  handleSettingsChange = async newState => {
    await this.setState({ ...newState });
    this.makeNewBoard();
    this.setState({ showSettings: false });
  };

  render() {
    const {
      showSettings,
      boardCells,
      boardSize,
      playersColors,
      itemColor,
      emptyCellColor,
      computerLevel,
      itemsToCollectCount,
      winner
    } = this.state;
    return (
      <React.Fragment>
        <GameNavigation
          playersColors={playersColors}
          settings={this.handleSettings}
          newGame={this.handleNewGame}
          levelValue={computerLevel}
          changeLevel={this.handleLevelChange}
          showSettings={this.handleShowSettings}
        />
        <div>{winner}</div>
        {(showSettings && (
          <Settings
            handleSettingsChange={this.handleSettingsChange}
            boardSize={boardSize}
            emptyCellColor={emptyCellColor}
            itemColor={itemColor}
            itemsToCollectCount={itemsToCollectCount}
            playersColors={playersColors}
          />
        )) || (
          <Board
            boardCells={boardCells}
            boardSize={boardSize}
            playersColors={playersColors}
            itemColor={itemColor}
            emptyCellColor={emptyCellColor}
            onKeyDown={this.handleHumanMove}
          />
        )}
      </React.Fragment>
    );
  }
}

export default CaterpilarGame;
