import makeMove from "./makeMove";
import findPossibleMoves from "./findPossibleMoves";

export default function handleHumanMove({ key }) {
  /*predpoklad, ze clovek je player 0*/
  const humanPlayer = 0;
  const { boardCells, boardSize, gameHasStarted } = this.state;

  if (!gameHasStarted) this.setState({ gameHasStarted: true });

  const playerPosition = boardCells.findIndex(
    cell =>
      cell.player &&
      cell.player.head === true &&
      cell.player.number === humanPlayer
  );

  const possibleMovesIndexes = findPossibleMoves(
    playerPosition,
    boardSize,
    boardCells
  );

  let possibleMoves = [];

  /*potrebuji objekty jednotlivych cells, ne jejich indexy*/

  for (let item of possibleMovesIndexes) {
    if (item === false || boardCells[item].player) continue;

    possibleMoves.push(boardCells[item]);
  }

  const indexOfTargetPosition = possibleMoves.findIndex(
    item => item.char === key
  );
  if (indexOfTargetPosition === -1) return;
  else {
    const targetCell = possibleMoves[indexOfTargetPosition];
    const targetIndex = boardCells.indexOf(targetCell);
    const oldBoardCells = [...boardCells];

    const newBoardCells = makeMove(oldBoardCells, targetIndex, playerPosition);
    this.setState({ boardCells: newBoardCells, gameHasStarted: 1 });
  }
}
