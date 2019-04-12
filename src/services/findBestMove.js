import findPossibleMoves from "./findPossibleMoves";

export default function findBestMove(boardCells, playerPosition, boardSize) {
  /*najdi mozne pohyby*/
  const possibleMoves = findPossibleMoves(
    playerPosition,
    boardSize,
    boardCells
  );
  /*pokud je jenom jediny mozny tah, udela ho*/
  if (possibleMoves.length === 1) {
    return possibleMoves[0];
  } else if (possibleMoves.length === 0) return null;

  /*pokud je item hned na sousednim poli, presune se tam*/
  for (let pm of possibleMoves) {
    if (boardCells[pm].item === "item") {
      return pm;
    }
  }
  /*v searchResults je stejne poradi elementu jako v possibleMoves,
     proto neni treba cislovani; cislo v searchResults udava pocet tahu k prvnimu "food" elementu*/
  let searchResults = [];

  for (let pm of possibleMoves) {
    let i = 0;
    /*condition hlida jestli se nasel "food"*/
    let condition = true;
    let visitedCells = [];
    let subResults = [pm];

    while (condition) {
      let temporaryResults = [];

      /*dalsi uroven v tazich, tedy o pole dal ve vsech moznostech*/
      for (let sub of subResults) {
        temporaryResults.push(...findPossibleMoves(sub, boardSize, boardCells));
      }
      subResults.length = 0;
      console.log("temporaryResults", temporaryResults);

      /*kontrola jestli pole uz jednou nebylo nalezeno, aby se nechodilo v kruhu*/
      let filteredTemporaryResults = [];
      if (visitedCells.length !== 0) {
        for (let temp of temporaryResults) {
          if (visitedCells.find(e => e === temp)) continue;
          else filteredTemporaryResults.push(temp);
        }
      } else {
        filteredTemporaryResults.push(...temporaryResults);
      }

      /*pokud se nelze dostat dale, zkonci a zapise 1 000 000 jako indikaci, ze item nebyl nalezen*/
      if (filteredTemporaryResults.length === 0) {
        searchResults.push(1000000);
        break;
      }

      /*zapise nova pole do tabulky projitych poli*/
      visitedCells.push(...filteredTemporaryResults);
      console.log("visited", visitedCells);

      /*zapise nove subvysledky do subResults*/
      subResults.push(...filteredTemporaryResults);
      console.log("NEWsub results", subResults);

      /*kontrola jestli byl nalezen "food"; pokud ano, zkonci a zapise pocet tahu potrebnych k jeho dosazeni*/
      for (let sub of subResults) {
        if (boardCells[sub].item) {
          searchResults.push(i);
          condition = false;
          break;
        }
      }
      console.log("result", searchResults);

      /*posun o jedno na dalsi hloubku v prohledavani*/
      i++;
    }
  }

  let targetIndex = "";
  const minLength = Math.min(...searchResults);
  if (minLength === 1000000) return null;
  else {
    targetIndex = searchResults.findIndex(e => e === minLength);
  }

  console.log("posible", possibleMoves);
  console.log("target", targetIndex);

  return possibleMoves[targetIndex];
}
