import findPossibleMoves from "./findPossibleMoves";

export default function findBadMoves() {
  /*predpoklad ze computer player ma cislo 1*/
  const { boardSize, boardCells } = this.state;
  const computerPlayer = 1;

  const playerPosition = boardCells.findIndex(
    cell =>
      cell.player &&
      cell.player.head === true &&
      cell.player.number === computerPlayer
  );

  const givenMoves = findPossibleMoves(playerPosition, boardSize, boardCells);
  /*testuje se, jestli se da alespon na jednom z osmi smeru dostat na vzdalenost boardSize/2*/
  const possibleDirections = [
    [-boardSize, -boardSize],
    [-boardSize, 1],
    [1, 1],
    [1, boardSize],
    [boardSize, boardSize],
    [boardSize, -1],
    [-1, -1],
    [-1, -boardSize]
  ];

  let badMoves = [];
  console.log("given",givenMoves)
  for (let i = 0; i < givenMoves.length; i++) {
    /*pokud vsechny smery selzou, tah je spatny*/
    let moveIsBad = true;

    for (let x = 0, noWay = true; x < possibleDirections.length && noWay; x++) {
      const direction = possibleDirections[x];
      console.log(direction);
      let position = playerPosition;
      let path = [];
      console.log(path)
      for (let y = 0; y < boardSize / 4; y++) {
        path.push(...direction);
      }

      for (let z = 0; z < path.length; z++) {
        let previousPosition = position;
        console.log(typeof boardCells[position].player);
        position += direction.pop(); //na poradi vytazenych elementu nezalezi
        if (
          typeof boardCells[position].player === "undefined" ||
          position < 0 ||
          position >= boardSize ** 2 ||
          ((previousPosition + 1) % boardSize === 0 &&
            position % boardSize === 0) ||
          ((position + 1) % boardSize === 0 &&
            previousPosition % boardSize === 0)
        )
          break;
        else if (z === path.length - 1) {
          //pokud je cesta pruchozi
          noWay = false;
          moveIsBad = false;
        }
      }
    }
    if (moveIsBad) badMoves.push(givenMoves[i]);
  }
  
  return badMoves;
}