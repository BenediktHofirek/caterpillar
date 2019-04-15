export default function findPossibleMoves(playerPosition, boardSize, cells) {
  /* pp = playerPosition, bs = boardSize, bs2 = boardSize^2*, cells = boardCells*/
  const pp = Number(playerPosition);
  const bs = Number(boardSize);
  const bs2 = bs * bs;

  /*pohyb neni mozny po diagonale, pouze sloupec nebo radek*/
  const possibleMovesIndexes = [
    (pp - bs >= 0) && (pp - bs),
    ((pp - 1 >= 0) && (pp % bs !== 0)) && (pp - 1),
    ((pp + 1 < bs2) && ((pp + 1) % bs !== 0)) && (pp + 1),
    (pp + bs < bs2) && (pp + bs)
  ];

  /*oreze prazdne kolonky a pozice, kde uz je hrac*/
  let possibleMoves = [];
  for (let e of possibleMovesIndexes) {
    if (typeof e === "number" && !cells[e].player ) possibleMoves.push(e);
  }

  /*vraci array of indexes of cells in boardCells*/
  return possibleMoves;
}
