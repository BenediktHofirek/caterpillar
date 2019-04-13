import findPossibleMoves from "./findPossibleMoves";
/*position je vzata z uz vyhledanych possible moves*/
/*pokud je z ceste souper, pocita s tim, ze ten casem uhne*//********************** */
/***********************************************************/
/*vstup je konkretni index, ne array; vraci se maximalni delka cesty nebo 1000, pokud je cesta pruchozi*/
export default function findWay(
  position,
  boardCells,
  boardSize,
  calculationDepht,
  player
) {
  let i = 0;
  let subResults = [position];
  let visitedCells = [position];

  while (
    i < calculationDepht &&
    subResults.length < Math.floor(calculationDepht * 2)/*tady je otazka, jestli a kolik zvolit*/
  ) {
    let temporaryResults = [];
    /*dalsi uroven v tazich; mohou se najit stejne moznoti tahu
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

    subResults.length = 0;

    /*kontrola jestli pole uz jednou nebylo nalezeno, aby se nechodilo v kruhu*/
    for (let temp of temporaryResults) {
      if (visitedCells.find(e => e === temp)) continue;
      else {
        /*zapise nova pole do tabulky projitych polia zapise nove subvysledky do subResults*/

        visitedCells.push(temp);
        subResults.push(temp);
      }
    }

    /*pokud se nelze dostat dale, zkonci a zapise 1 000 000 jako indikaci, ze cesta je nepruchozi*/
    if (subResults.length === 0) {
      return i;
    }
    /*posun o jedno na dalsi hloubku v prohledavani*/
    i++;
  }

  return 1000;  /*1000 znamena, ze cesta je pruchozi*/
}
