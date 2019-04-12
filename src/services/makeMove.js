export default function makeMove(newBoardCells, targetIndex, playerPosition) {
  const targetChar = newBoardCells[targetIndex].char;
  const playerToMove = newBoardCells[playerPosition].player.number;

  /*pojistka proti prepsani hrace jinym hracem*/
  if(newBoardCells[targetIndex].player) return newBoardCells;

  //player position je player head position
  /*nize a nahore jsou newBoardCells pouzity jeste jako stare, jsou z nich
        precteny udaje o cilovem poli*/

  /*jestlize ji housenka jidlo na cilovem poli*/
  if (newBoardCells[targetIndex].item === "item") {
    /*upravi starou hlavu*/
    newBoardCells[playerPosition].player.head = false;
    newBoardCells[playerPosition].player.nextElement = targetIndex;

    /*upravi novou hlavu*/
    newBoardCells[targetIndex] = {
      char: targetChar,
      item: null,
      player: { number: playerToMove, head: true, foot: false }
    };

    return newBoardCells;
  } else {
    /*najde foot*/
    const playerFoot = newBoardCells.findIndex(
      item =>
        item.player &&
        item.player.number === playerToMove &&
        item.player.foot === true
    );

    /*zrusi starou hlavu a napise nextElement*/
    newBoardCells[playerPosition].player.head = false;
    newBoardCells[playerPosition].player.nextElement = targetIndex;

    /*udela novou hlavu*/
    newBoardCells[targetIndex] = {
      char: targetChar,
      item: null,
      player: {
        number: playerToMove,
        head: true,
        foot: false /*i v pripade, ze je hlava zaroven foot, prida se foot nize*/
      }
    };

    /*preda foot novemu poslednimu elementu*/
    const nextElement = newBoardCells[playerFoot].player.nextElement;
    newBoardCells[nextElement].player.foot = true;

    /*vymaze posledni clanek housenky*/
    newBoardCells[playerFoot].item = null;
    newBoardCells[playerFoot].player = null;

    return newBoardCells;
  }
}
