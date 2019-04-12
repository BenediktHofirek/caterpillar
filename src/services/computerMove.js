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
    boardCells,
    playerPosition,
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
  }
  /*pokud se nenaplnila predchozi podminka*/
  const targetIndex = bestMove;
  /*pokud nelze udelat tah nebo neni uz zadny item, tah se neprovede*/

  /*!!!!!!!!!!!!!POZOR, JE NUTNE DAT === NULL, PROTOZE TARGER MUZE BYT I NA POLE 0!!!!!!!!!!!!!!*/
  if (targetIndex === null) {
    this.setState({ computerRunning: 1 }); //!!!!!!!!!Tady ma byt v produkcnim 1!!!!!!*/
    return;
  }

  const newBoardCells = makeMove(oldBoardCells, targetIndex, playerPosition);
  this.setState({ boardCells: newBoardCells, computerRunning: 0 });
}
