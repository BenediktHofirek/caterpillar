function makeBoardCells(state) {
  const cellChars = makeCellChars(state);
  const boardCells = makeBoardItems(state, cellChars);
  return boardCells;
}

function makeBoardItems(
  { itemsToCollectCount: count, boardSize: size },
  boardCells
) {
  const sizePower = size ** 2;
  const probability = (count / sizePower) * 100;

  /*will set items*/
  for (let i = 0; i < sizePower; i++) {
    const willSetItem = Math.floor(Math.random() * 100) < probability;
    willSetItem ? (boardCells[i].item = "item") : (boardCells[i].item = null);
  }

  /*will set players*/
  let i = 0;
  while (i < 2) {
    let index = Math.floor(Math.random() * sizePower);
    if (!boardCells[index].player) {
      boardCells[index].player = { number: i, head: true, foot: true };
      i++;
    }
  }

  return boardCells;
}

function makeCellChars({ boardSize: size }) {
  const count = size ** 2;

  /*zadne pole nesmi sousedit se dvema poli se stejnym pismenem*/
  let chars = [];

  for (let i = 0; i < count; i++) {
    chars[i] = {};
    do {
      chars[i].char = String.fromCharCode(
        Math.floor(Math.random() * (123 - 97) + 97)
      ); /*range of lowercase letters from utf-16*/
    } while (
      chars[i].char === (i - 1 >= 0 && chars[i - 1].char) || //1
      chars[i].char === (i - 2 >= 0 && chars[i - 2].char) || //2
      chars[i].char === (i - size >= 0 && chars[i - size].char) || //3
      chars[i].char === (i - size - 1 >= 0 && chars[i - size - 1].char) || //4
      chars[i].char === (i - size * 2 >= 0 && chars[i - size * 2].char) || //5
      chars[i].char ===
        (i - size + 1 >= 0 && (i + 1) % size && chars[i - size + 1].char) //6
    );
  }
  /////////////
  //     5
  //   4 3 6
  // 2 1 X
  return chars;
}

export default { makeBoardCells };
