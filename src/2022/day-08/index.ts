import * as utils from "../utils";

const data = utils
  .readFile("day-08/data.txt") // read input data
  .split("\n")
  .map((line) => line.split("").map((n) => +n)); // Array<Array<number>>

let visible = 0;
let maxInRow = 0;
let maxInCol = new Array<number>();

const isVisible = (
  r: number,
  c: number,
  arr: Array<Array<number>>,
  maxRow: number,
  maxCol: Array<number>
) => {
  // console.log(`... [${r}][${c}] ...`);
  const height = arr[r][c];
  if (height > maxRow) {
    // console.log("visible from left");
    return true;
  }
  // console.log("BLOCKED from left");

  if (height > maxCol[c]) {
    // console.log("visible from above");
    return true;
  }
  // console.log("BLOCKED from above");
  let isVisible = true;

  for (let i = r + 1; i < arr.length; i++) {
    // console.log(`  [${i}][${c}] ...`);
    if (height <= arr[i][c]) {
      // console.log("BLOCKED from right");
      isVisible = false;
      break;
    }
  }
  if (isVisible === true) {
    // console.log("visible from right");
    return true;
  }

  isVisible = true;
  for (let j = c + 1; j < arr[r].length; j++) {
    if (height <= arr[r][j]) {
      // console.log("BLOCKED from below");
      isVisible = false;
      break;
    }
  }
  if (isVisible === true) {
    // console.log("visible from below");
    return true;
  }
  // console.log("BLOCKED EVERYWHERE");
  return false;
};
/**
 * T
 * T
 * F
 *
 * T
 * F
 * T
 *
 * F
 * T
 * F
 */
for (let r = 0; r < data.length; r++) {
  for (let c = 0; c < data[r].length; c++) {
    let height = data[r][c];

    if (r === 0 || c === 0 || r === data.length - 1 || c === data.length - 1) {
      visible++;
      if (c === 0) maxInRow = height;
      if (r === 0) maxInCol[c] = height;

      continue;
    }

    const isTall = isVisible(r, c, data, maxInRow, maxInCol);
    maxInRow = Math.max(maxInRow, height);
    maxInCol[c] = Math.max(maxInCol[c], height);

    // console.log(`[${r}][${c}] = ${isTall}`);
    if (isTall) visible++;

    // console.log(`[${r}][${c}] = ${visible}`);
  }
  // console.log("\n");
}

console.log({ visible });

// Part 2

const getScenicScore = (
  r: number,
  c: number,
  arr: Array<Array<number>>
): number => {
  if (r === 0 || c === 0 || r === arr.length - 1 || c === arr[r].length - 1)
    return 0;

  const height = arr[r][c];
  let leftScore =
    c === 0
      ? 0
      : arr[r]
          .slice(0, c)
          .reverse()
          .findIndex((val) => val >= height);
  if (leftScore === -1) leftScore = c;
  else leftScore++;

  let upScore =
    r === 0
      ? 0
      : arr
          .slice(0, r)
          .reverse()
          .map((r) => r[c])
          .findIndex((val) => val >= height);
  if (upScore === -1) upScore = r;
  else upScore++;

  let rightScore = arr[r].slice(c + 1).findIndex((val) => val >= height);
  // console.log(arr[r].slice(c + 1));
  // console.log({ rightScore });
  if (rightScore === -1) rightScore = arr[r].length - c - 1;
  else rightScore++;
  // console.log({ rightScore });

  let bottomScore = arr
    .slice(r + 1)
    .map((r) => r[c])
    .findIndex((val) => val >= height);
  if (bottomScore === -1) bottomScore = arr.length - r - 1;
  else bottomScore++;

  const total = upScore * leftScore * rightScore * bottomScore;
  // console.log({ r, c, total, upScore, leftScore, rightScore, bottomScore });
  return total;
};

let maxScore = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    maxScore = Math.max(maxScore, getScenicScore(i, j, data));
  }
}

console.log({ maxScore });

// console.log(getScenicScore(1, 2, data));
// first answer: 45360 // too low
