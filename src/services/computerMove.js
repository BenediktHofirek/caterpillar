import makeMove from "./makeMove";
import findBestMove from "./findBestMove";

export default function handleComputerMove() {
  /*computer je player 1*/
  const { boardCells, boardSize, calcDepthForNextMove, badMoves } = this.state;
  const oldBoardCells = [...boardCells];
  const computerPlayer = 1;

  const playerPosition = boardCells.findIndex(
    cell =>
      cell.player &&
      cell.player.head === true &&
      cell.player.number === computerPlayer
  );

  const bestMove = findBestMove(
    playerPosition,
    boardCells,
    boardSize,
    calcDepthForNextMove,
    badMoves
  );

  /*i null je object, proto je nutna dvojita podminka*/
  if (typeof bestMove === "object" && bestMove !== null) {
    const targetIndex = bestMove.targetIndex;
    const calcDepthForNextMove = bestMove.calcDepthForNextMove;
    const newBoardCells = makeMove(oldBoardCells, targetIndex, playerPosition);
    this.setState({
      boardCells: newBoardCells,
      computerRunning: 0,
      calcDepthForNextMove
    });
    return;
  }else {
    /*pokud se nenaplnila predchozi podminka*/
    const targetIndex = bestMove;
    /*pokud nelze udelat tah nebo neni uz zadny item, tah se neprovede*/
    
    /*!!!!!!!!!!!!!POZOR, JE NUTNE DAT === NULL, PROTOZE TARGER MUZE BYT I NA POLE 0!!!!!!!!!!!!!!*/
    /*pokud neni mozne udelat tah, pokusi se o dalsi tah az za 5 vterin*/
    if (targetIndex === null) {
      const { computerLevel: level, computerLevelRange: range} = this.state;
      const timeout = 1000 * (5 - range[level-1]);
      setTimeout(() => this.setState({ computerRunning: 0 }), timeout); 
      //!!!!!!!!!Vyse ma byt v produkcnim 0!!!!!!*/
      return;
    }

    const newBoardCells = makeMove(oldBoardCells, targetIndex, playerPosition);
    this.setState({ boardCells: newBoardCells, computerRunning: 0 });
     return;
  }
}
