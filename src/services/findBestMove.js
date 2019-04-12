import findPossibleMoves from "./findPossibleMoves";

export default function findBestMove(
  boardCells,
  playerPosition,
  boardSize,
  calcDepthForNextMove,
  badMoves
) {
  /*nastaveni hloubky melkeho propoctu*/
  const calculationDepht = 5;
  /*najdi mozne pohyby*/
  let givenPossibleMoves = findPossibleMoves(
    playerPosition,
    boardSize,
    boardCells
  );

  let possibleMoves = [];

  if (badMoves && badMoves.length !== 0) {
    console.log("BADMOVES", badMoves, playerPosition);
    possibleMoves.push(...givenPossibleMoves.filter(e => !badMoves.find(e)));
  } else {
    possibleMoves.push(...givenPossibleMoves);
  }

  /*pokud se nema prejit rovnou na hluboky vypocet, a tedy je calcDepth > 0*/
  if (!calcDepthForNextMove) {
    /*pokud je jenom jediny mozny tah, udela ho*/
    if (possibleMoves.length === 1) {
      return possibleMoves[0];
    } else if (possibleMoves.length === 0) return null;

    /*obrati s pravdepodobnosti 50% poradi moznych tahu, aby nejezdil jenom smer levy horni roh*/
    const reverse = Math.round(Math.random());
    if (reverse) possibleMoves.reverse();

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
      searchResults.push([pm]);
    }

    let i = 0;
    const failureConstant = 100000;

    while (i < calculationDepht) {
      /*condition hlida jestli se nasel "food"*/
      let visitedCells = [];

      for (let a1c = 0; a1c < searchResults.length; a1c++) {
        if (searchResults[a1c] === failureConstant) continue;
        let subResults = [];
        subResults.push(...searchResults[a1c]);
        let temporaryResults = [];

        /*dalsi uroven v tazich, tedy o pole dal ve vsech moznostech; mohou se najit stejne moznoti tahu
      na ruznych polich (*), proto je nutna filtrace uz zde, napr
        * X *
        X   X  
      */
        for (let sub of subResults) {
          const possible = findPossibleMoves(sub, boardSize, boardCells);
          for (let p of possible) {
            if (temporaryResults.find(e => e === p)) continue;
            else temporaryResults.push(p);
          }
        }

        /*kontrola jestli pole uz jednou nebylo nalezeno, aby se nechodilo v kruhu*/
        for (let temp of temporaryResults) {
          if (visitedCells.find(e => e === temp)) continue;
          /*zapise nova pole do tabulky projitych poli
         a zapise nove subvysledky do subResults*/ else {
            visitedCells.push(temp);
            subResults.push(temp);
          }
        }

        /*pokud se nelze dostat dale, zkonci a zapise 1 000 000 jako indikaci, ze item nebyl nalezen*/
        if (subResults.length === 0) {
          searchResults[a1c] = [];
          searchResults[a1c].push(failureConstant);
          continue;
        }

        /*kontrola jestli byl nalezen "food"; pokud ano, vrati hodnotu daneho tahu. Jinak zapise subResults
      do searchResults*/
        for (let sub of subResults) {
          if (boardCells[sub].item) {
            return possibleMoves[a1c];
          }
        }

        /*Jinak zapise ...*/
        searchResults[a1c] = [];
        searchResults[a1c].push(...subResults);
      }
      /*posun o jedno na dalsi hloubku v prohledavani*/
      i++;
    }
  }

  /*pokud se na dane hloubce nenasel item, prejde se na hloubkove prohledavani*/
  if (possibleMoves.length === 1) {
    return {
      targetIndex: possibleMoves[0],
      calcDepthForNextMove: calcDepthForNextMove ? calcDepthForNextMove - 1 : 0
    };
  } else if (possibleMoves.length === 0) return null;

  let itemsIndexes = []; //indexy itemu v boardCells
  for (let i = 0; i < boardCells.length; i++) {
    if (boardCells[i].item) itemsIndexes.push(i);
  }
  console.log("possibleMoves", possibleMoves);
  console.log("itemsIndexesx", itemsIndexes);

  /*spocita vzdalenost jednotlivych itemu k hraci*/
  //vzdalenosti indexu jednotlivych itemu od playera, array*/
  const itemsDistance = itemsIndexes.map(item => {
    return calculateItemDistace(item, playerPosition, boardSize);
  });
  console.log("itemsDistance", itemsDistance);

  /*hodnota nejmensiho v tabulce indexu indexu na itemy :-)*/
  const smallestDistance = Math.min(...itemsDistance);
  /*dodelat, aby v pripade stejne vzdalenosti dvou itemu bral ten, od ktereho je dale souper*/
  console.log("smallestDistance", smallestDistance);

  /*index nejmensiho v tabulce indexu :-)*/
  const indexOfSmalestDistace = itemsDistance.findIndex(
    e => e === smallestDistance
  );
  console.log("indexOfSmalestDistace", indexOfSmalestDistace);

  /*index nejblizsiho itemu v boardCells*/
  const smallestItemIndexInBoardCells = itemsIndexes[indexOfSmalestDistace];
  console.log("smallestItemIndexInBoardCells", smallestItemIndexInBoardCells);

  /*najde nejblizsi mozny pohyb z possibleMoves k nejblizsimu indexu*/

  const distanceOfPossibleMovesToItem = possibleMoves.map(item =>
    calculateItemDistace(item, smallestItemIndexInBoardCells, boardSize)
  );
  console.log("distanceOfPossibleMovesToItem", distanceOfPossibleMovesToItem);

  /*najde pohyb s nejkratsi vzdalenosti v tabulce possibleMoves*/
  const moveWithShortestDistance = Math.min(...distanceOfPossibleMovesToItem);
  const indexOfMoveWithShortestDistance = distanceOfPossibleMovesToItem.findIndex(
    e => e === moveWithShortestDistance
  );
  console.log("moveWithShortestDistance", moveWithShortestDistance);
  console.log(
    "indexOfMoveWithShortestDistance",
    indexOfMoveWithShortestDistance
  );
  console.log(
    "possibleMoves[indexOfMoveWithShortestDistance]",
    possibleMoves[indexOfMoveWithShortestDistance]
  );
  console.log("playerposiiton", playerPosition);

  /*vrati pocet tahu, po ktere je zbytecne provadet kratkou kalkulaci*/
  return {
    targetIndex: possibleMoves[indexOfMoveWithShortestDistance],
    calcDepthForNextMove: calcDepthForNextMove
      ? calcDepthForNextMove - 1
      : moveWithShortestDistance - calculationDepht - 1
  };
}

function calculateItemDistace(itemPosition, playerPosition, boardSize) {
  const playerRow = Math.floor(playerPosition / boardSize);
  const itemRow = Math.floor(itemPosition / boardSize);

  const rowDistance = Math.abs(playerRow - itemRow);
  const columnDistance = Math.abs(
    (playerPosition % boardSize) - (itemPosition % boardSize)
  );

  const totalDistance = rowDistance + columnDistance;
  return totalDistance;
}
