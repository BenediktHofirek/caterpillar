import makeMove from "./makeMove";
import findBestMove from "./findBestMove";

export default function handleComputerMove() {
  /*computer je player 1*/
  const { boardCells, boardSize } = this.state;
  const oldBoardCells = [...boardCells];
  const computerPlayer = 1;

  const playerPosition = boardCells.findIndex(
    cell =>
      cell.player &&
      cell.player.head === true &&
      cell.player.number === computerPlayer
  );

  const targetIndex = findBestMove(boardCells, playerPosition, boardSize);

  /*pokud nelze udelat tah nebo neni uz zadny item, tah se neprovede*/

  /*!!!!!!!!!!!!!POZOR, JE NUTNE DAT === NULL, PROTOZE TARGER MUZE BYT I NA POLE 0!!!!!!!!!!!!!!*/
  if (targetIndex === null) {
    console.log("no move");
    this.setState({ computerRunning: 1 });
    return;
  }
  console.log("Move!", targetIndex);

  const newBoardCells = makeMove(oldBoardCells, targetIndex, playerPosition);
  this.setState({ boardCells: newBoardCells, computerRunning: 0 });
}
