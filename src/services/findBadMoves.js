import findPossibleMoves from "./findPossibleMoves";
import findWay from "./findWay";

export default function findbadMovesIndexes() {
  /*predpoklad ze computer player ma cislo 1*/
  const { boardSize, boardCells } = this.state;
  const computerPlayer = 1;
  const calculationDepht = boardSize; //hloubka hledani bude toto
  let badMovesIndexes = [];

  const playerPosition = boardCells.findIndex(
    cell =>
      cell.player &&
      cell.player.head === true &&
      cell.player.number === computerPlayer
  );

  const givenMoves = findPossibleMoves(playerPosition, boardSize, boardCells);

  for (let i = 0; i < givenMoves.length; i++) {
    /*pokud se nepodari z jednoho z given moves najit cestu*/
    /*do findway se posila konkretni index, ne array; vraci se maximalni delka cesty nebo 1000, pokud je cesta pruchozi*/
    const wayLength = findWay(givenMoves[i], boardCells, boardSize, calculationDepht, computerPlayer);
    /*v badMovesIndexes se uchovava hloubka cesty jednotlivych indexu z givenMoves*/
    badMovesIndexes.push(wayLength);
  }

  let badMoves = [];
  /*pokud jsou spatne vsechny moznosti (tedy zadna nema hodnotu 1000), 
  vymaze tu nejmene spatnou, aby bylo mozne udelat tah*/
  if(!badMovesIndexes.find(e => e === 1000)){
    let bestMove = Math.max(...badMovesIndexes);
    for(let i = 0; i<givenMoves.length; i++){
      if(badMovesIndexes[i] !== bestMove){
        badMoves.push(givenMoves[i]);
      }
    }
  }else{
    for(let i = 0; i < givenMoves.length; i++){
      if(badMovesIndexes[i] !== 1000){
        badMoves.push(givenMoves[i]);
      }
    }
  }

  return badMoves;
}
