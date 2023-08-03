// Hard coded player characters for testing
let player1 = "X";
let player2 = "O";
let isPlayer1Turn = true;
let winnerAnnounce = document.querySelector(".winnerAnnounce");

const gameboard = (() => {
  // initial empty gameboard
  let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // stores if the game is over or not
  let gameOver = false;
  // getter for gameOver
  const isGameOver = () => {
    return gameOver;
  };

  // setter for gameOver
  const setGameOver = (bool) => {
    gameOver = bool;
  };

  // getter for the gameboard
  // will be used to update the UI
  const getGameboard = () => {
    return grid;
  };

  // setter for the gameboard
  // will be used for resetting gameboard
  const setGameboard = (newBoard) => {
    grid = newBoard;
  };

  const resetGameboard = () => {
    setGameboard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  // check if gameboard is full
  // will be used by function to check for tie
  const isBoardFull = () => {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (!grid[i][j]) return false;
      }
    }
    return true;
  };

  // will add "x" or "o" to the grid, given the row and column
  // grid[row][column] to access any given square
  const addToBoard = (row, column, player) => {
    // check if square is already filled
    if (grid[row][column]) return;
    // code here will execute if the row and column is valid
    grid[row][column] = player; // will be "x" or "o"
  };

  const isSquareFilled = (row, column) => {
    return grid[row][column];
  };

  return {
    getGameboard,
    resetGameboard,
    addToBoard,
    isSquareFilled,
    isBoardFull,
    isGameOver,
    setGameOver,
  };
})();

// called when a square on the board is clicked, will interact with gameboard.addToBoard();
const addToBoard = (coordinate) => {
  if (!gameboard.isGameOver()) {
    let coordinates = coordinate.split("-");
    let row = parseInt(coordinates[0]);
    let column = parseInt(coordinates[1]);
    if (!gameboard.isSquareFilled(row, column)) {
      gameboard.addToBoard(row, column, isPlayer1Turn ? player1 : player2);
      isPlayer1Turn = !isPlayer1Turn;
      updateDisplay();
      let winResult = checkWinner();
      if (!winResult && gameboard.isBoardFull()) {
        console.log("Tie");
        winnerAnnounce.innerText = "Tie!";
        gameboard.setGameOver(true);
      } else if (winResult) {
        winnerAnnounce.innerText = `${winResult} is the winner!`;
        gameboard.setGameOver(true);
      }
    }
  }
  console.log(gameboard.getGameboard());
};

const checkWinner = () => {
  let gb = gameboard.getGameboard(); // for conciseness
  let winnerRow = checkWinnerRow(gb);
  if (winnerRow) {
    return winnerRow;
  }

  let winnerColumn = checkWinnerColumn(gb);
  if (winnerColumn) {
    return winnerColumn;
  }

  let winnerDiag = checkWinnerDiagonal(gb);
  if (winnerDiag) {
    return winnerDiag;
  }
  return false;
};

const checkWinnerRow = (gb) => {
  // Check if any rows are completed
  for (let i = 0; i < 3; ++i) {
    // to store the 3 charactes from the current row
    let curRowStr = "";
    let isWinPossible = true;
    for (let j = 0; j < 3; ++j) {
      if (!gb[i][j]) {
        isWinPossible = false;
        break; // if there is an empty space, there cannot be a winner
      }
      curRowStr += gb[i][j];
    }
    // check if current row is a winner
    if (!isWinPossible) {
      // console.log(`Win not possible for row ${i}`);
    } else {
      let isUniqueSet = new Set(curRowStr);
      // console.log(isUniqueSet.size);
      if (isUniqueSet.size === 1) {
        console.log(`${curRowStr[0]} is the winner`);
        return curRowStr[0]; // return the winning character
      }
      curRowStr = ""; // reset the row string
    }
  }
  return false;
};

const checkWinnerColumn = (gb) => {
  // Check if any columns are completed
  // Check if any rows are completed
  for (let i = 0; i < 3; ++i) {
    // to store the 3 charactes from the current row
    let curRowStr = "";
    let isWinPossible = true;
    for (let j = 0; j < 3; ++j) {
      if (!gb[j][i]) {
        isWinPossible = false;
        break; // if there is an empty space, there cannot be a winner
      }
      curRowStr += gb[j][i];
    }
    // check if current row is a winner
    if (!isWinPossible) {
      // console.log(`Win not possible for row ${i}`);
    } else {
      let isUniqueSet = new Set(curRowStr);
      // console.log(isUniqueSet.size);
      if (isUniqueSet.size === 1) {
        console.log(`${curRowStr[0]} is the winner`);
        return curRowStr[0]; // return the winning character
      }
      curRowStr = ""; // reset the row string
    }
  }
};

const checkWinnerDiagonal = (gb) => {
  const checkDiag1 = (gb) => {
    if (!gb[0][0] || !gb[1][1] || !gb[2][2]) {
      return false;
    }
    let str = "";
    str += gb[0][0];
    str += gb[1][1];
    str += gb[2][2];
    let uniqueDiag1 = new Set(str);
    if (uniqueDiag1.size === 1) {
      return str[0];
    }
    return false;
  };

  const checkDiag2 = (gb) => {
    if (!gb[0][2] || !gb[1][1] || !gb[2][0]) {
      return false;
    }
    let str = "";
    str += gb[0][2];
    str += gb[1][1];
    str += gb[2][0];
    let uniqueDiag2 = new Set(str);
    if (uniqueDiag2.size === 1) {
      return str[0];
    }
    return false;
  };

  let diag1Checked = checkDiag1(gb);
  if (diag1Checked) {
    console.log(`Winner is ${diag1Checked}`);
    return diag1Checked;
  }
  let diag2Checked = checkDiag2(gb);
  if (diag2Checked) {
    console.log(`Winner is ${diag2Checked}`);
    return diag2Checked;
  }
};

// update html grid
const updateDisplay = () => {
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      let curDiv = document.querySelector(`[data-coordinate="${i}-${j}"]`);
      curDiv.innerText = gameboard.getGameboard()[i][j];
    }
  }
};

console.log(gameboard.getGameboard());
