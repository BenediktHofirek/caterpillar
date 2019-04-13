export default function findWinner() {
  const { boardCells } = this.state;
  let itemsCount = 0;
  let player0Count = 0;
  let player1Count = 0;

  for (let e of boardCells) {
    if (e.item) itemsCount++;
    else if (e.player) e.player.number === 0 ? player0Count++ : player1Count++;
  }

  if (
    Math.max(player0Count, player1Count) >
    Math.min(player0Count, player1Count) + itemsCount
  ) {
    return player0Count > player1Count ? 0 : 1;
  } else if (itemsCount === 0 && player0Count === player1Count) {
    return "draw";
  } else return null;
}
