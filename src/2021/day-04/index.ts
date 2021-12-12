import * as utils from "../utils";

const data = utils
  .readFile("day-04/data.txt") // read input data
  .split(/\r?\n/); // break up by line

const [callerStr, ...boardsStrRows] = data;

const calls = callerStr.split(",").map((str) => +str);
const boardRows = boardsStrRows
  .map((input) =>
    input
      .split(/\s/)
      .filter(Boolean)
      .map((str) => +str)
  )
  .filter((arr) => arr.length > 1);

const boards = utils.chunk(boardRows, 5);

console.log("Confirm Data Format :: ", boards.slice(0, 2));

// Place work below here

// const placeholder: Array<number | null> = new Array(data[0].length).fill(null);

interface Acc2 {
  found: boolean;
  winner: null | number[][];
  boards: number[][][];
  winningNumber: null | number;
}

const summation = (acc: number, curr: number) => acc + curr;

const checkForWinner = (board: number[][], len = 5) => {
  // check rows
  const rowWins = board.some((row) => row.reduce(summation, 0) === len * -1);
  if (rowWins) {
    return true;
  }
  for (let col = 0; col < len; col++) {
    let colSum = 0;
    for (let row = 0; row < len; row++) {
      colSum += board[row][col];
    }
    if (colSum === len * -1) {
      return true;
    }
  }
  return false;
};

const winningBoard = calls.reduce(
  (acc: Acc2, call: number) => {
    console.log(`\nCall: ${call}`);
    if (acc.found) {
      return acc;
    }

    const newBoards = acc.boards.map((board) => {
      return board.map((row) => {
        return row.map((cell) => (cell === call ? -1 : cell));
      });
    });

    const winner = newBoards.find((board) => checkForWinner(board)) ?? null;
    const found = !!winner;
    const winningNumber = found ? call : null;

    return { boards: newBoards, winner, found, winningNumber };
  },
  { boards, found: false, winner: null, winningNumber: null } as Acc2
);

console.log({ board: winningBoard.boards[0] });
console.log({ winner: winningBoard.winner });

const unmarkedSum = winningBoard.winner?.reduce((acc, currRow) => {
  return (
    acc +
    currRow.reduce((acc2, currCell) => {
      return acc2 + (currCell === -1 ? 0 : currCell);
    }, 0)
  );
}, 0);

console.log({ unmarkedSum });

console.log(
  "Question 1: " + (unmarkedSum ?? 1) * (winningBoard?.winningNumber ?? 1)
);

const lastWinningBoard = calls.reduce(
  (acc: Acc2, call: number) => {
    console.log(`\nCall: ${call}`);
    if (acc.found) {
      return acc;
    }

    const updatedBoards = acc.boards.map((board) => {
      return board.map((row) => {
        return row.map((cell) => (cell === call ? -1 : cell));
      });
    });

    if (updatedBoards.length === 1 && checkForWinner(updatedBoards[0])) {
      const winner = updatedBoards[0];
      const found = !!winner;
      const winningNumber = found ? call : null;
      return { boards: updatedBoards, winner, found, winningNumber };
    }

    const remainingBoards = updatedBoards.filter(
      (board) => !checkForWinner(board)
    );

    return {
      ...acc,
      boards: remainingBoards,
    };
  },
  { boards, found: false, winner: null, winningNumber: null } as Acc2
);

console.log({ board: lastWinningBoard.boards[0] });
console.log({ winner: lastWinningBoard.winner });

const unmarkedLosingSum = lastWinningBoard.winner?.reduce((acc, currRow) => {
  return (
    acc +
    currRow.reduce((acc2, currCell) => {
      return acc2 + (currCell === -1 ? 0 : currCell);
    }, 0)
  );
}, 0);

console.log({ unmarkedLosingSum });

console.log(
  "Question 1: " +
    (unmarkedLosingSum ?? 1) * (lastWinningBoard?.winningNumber ?? 1)
);
