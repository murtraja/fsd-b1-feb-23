const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";
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

function changePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function isRowEqual(mark, row) {
  return (
    board[row][0] === board[row][1] &&
    board[row][1] === board[row][2] &&
    board[row][0] === mark
  );

  /* the following code has coupling with UI - BAD design*/
  // if (row === 0) {
  //   return (
  //     document.getElementById("1").innerHTML ===
  //       document.getElementById("2").innerHTML &&
  //     document.getElementById("2").innerHTML ===
  //       document.getElementById("3").innerHTML &&
  //     document.getElementById("2").innerHTML === mark
  //   );
  // } else {
  //   return false;
  // }
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
function updateUI() {
  // based on the current state of the board / game,
  // update the UI elements
  board.forEach((rowValue, row) => {
    rowValue.forEach((colValue, col) => {
      /*
        Row   Col   Id    Formula               Final Formula
        0     0     1
        0     1     2     Id = 3*0 + Col + 1    Id = 3*Row + Col + 1
        0     2     3 
        1     0     4     
        1     1     5     Id = 3*1 + Col + 1    Id = 3*Row + Col + 1
        1     2     6
        2     0     7
        2     1     8     Id = 3*2 + Col + 1    Id = 3*Row + Col + 1
        2     2     9
      */
      const id = 3 * row + col + 1;
      // console.log(`${row},${col} => ${id}`);
      document.getElementById(id).innerHTML = board[row][col];
    });
  });

  // x = a + b
  // b = x - a
}

document.querySelectorAll("div.grid button").forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(`clicked on ${btn.id}`);
    if (btn.innerHTML === "") {
      // place a mark here
      console.log("do something here");
      /*
        Id    Row   Col   Formula               Final Formula
        1     0     0
        2     0     1     Row = (Id-1)/3        Col = Id - 1 - 3*Row
        3     0     2
        4     1     0
        5     1     1     Row = (Id-1)/3        Col = Id - 1 - 3*Row
        6     1     2
        7     2     0
        8     2     1     Row = (Id-1)/3        Col = Id - 1 - 3*Row
        9     2     2
      */
      const id = btn.id;
      const row = Math.floor((id - 1) / 3);
      // const col = id - 1 - 3 * row;
      const col = (id - 1) % 3;
      // console.log(`${id} => (${row}, ${col})`);
      placeMark(currentPlayer, row, col);
      if (isPlayerWinner(currentPlayer)) {
        alert(`${currentPlayer} has won the game`);
        document.querySelectorAll("div.grid button").forEach((btn) => {
          btn.disabled = true;
        });
      } else {
        changePlayer();
      }
      updateUI();
    } else {
      console.log("already placed the mark here.");
    }
  });
});
