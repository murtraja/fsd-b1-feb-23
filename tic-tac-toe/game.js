const board = [
  ["O", "O", "X"],
  ["", "X", "X"],
  ["X", "", "O"],
];
// "" -> empty
// X -> player 1
// O -> player 2

function displayBoard() {
  let boardString = "";
  board.forEach((row) => {
    let rowString = "";
    row.forEach((ele) => {
      if (ele === "") {
        rowString += "-";
      } else {
        rowString += ele;
      }
    });
    boardString += rowString + "\n";
  });
  console.log(boardString);
}

function placeMark(mark, row, col) {
  board[row][col] = mark;
}

function isRowEqual(mark, row) {
  return (
    board[row][0] === board[row][1] &&
    board[row][1] === board[row][2] &&
    board[row][0] === mark
  );
}

function isColEqual(mark, col) {
  return (
    board[0][col] === board[1][col] &&
    board[1][col] === board[2][col] &&
    board[0][col] === mark
  );
}

function isPrimaryDiagEqual(mark) {
  return (
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2] &&
    board[0][0] === mark
  );
}

function isSecondaryDiagEqual(mark) {
  return (
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0] &&
    board[0][2] === mark
  );
}

function isPlayerWinner(mark) {
  for (let i = 0; i < 3; i++) {
    if (isRowEqual(mark, i)) {
      return true;
    }
    if (isColEqual(mark, i)) {
      return true;
    }
  }
  if (isPrimaryDiagEqual(mark)) {
    return true;
  }
  if (isSecondaryDiagEqual(mark)) {
    return true;
  }
  return false;
}
