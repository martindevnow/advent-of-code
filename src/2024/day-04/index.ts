import * as utils from "../utils";

const realData: string = utils.readFile("day-04/data.txt"); // read

const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const dataGrid = realData.split("\n").map((line) => line.split(""));

const WORD = "XMAS";
const DIRECTIONS = [
  [-1, -1],
  [-1, 0], // up
  [-1, 1],
  [0, -1], // left
  [0, 1], // right
  [1, -1],
  [1, 0], // down
  [1, 1],
];

const findOccurrencesFromLocation = (
  x: number,
  y: number,
  grid: Array<Array<string>>
) => {
  return DIRECTIONS.filter(([dirX, dirY]) => {
    return checkDirectionFromLocation(WORD, x, y, dirX, dirY, grid);
  }).length;
};

const checkDirectionFromLocation = (
  word: string,
  x: number,
  y: number,
  dirX: number,
  dirY: number,
  grid: Array<Array<string>>
) => {
  try {
    if (grid[x][y] !== word[0]) return false;
  } catch (e) {
    console.error(`x: ${x}, y: ${y}, word: ${word}`);
    throw e;
  }
  if (word.length === 1) return true;
  if (x + dirX < 0 || x + dirX >= grid.length) return false; // edge of grid
  if (y + dirY < 0 || y + dirY >= grid[0].length) return false; //edge of grid
  return checkDirectionFromLocation(
    word.slice(1, word.length),
    x + dirX,
    y + dirY,
    dirX,
    dirY,
    grid
  );
};

let occurrences = 0;
for (let x = 0; x < dataGrid.length; x++) {
  for (let y = 0; y < dataGrid[x].length; y++) {
    occurrences += findOccurrencesFromLocation(x, y, dataGrid);
  }
}

console.log(`Part 1: ${occurrences}`);

const checkLocation = (x: number, y: number, grid: Array<Array<string>>) => {
  if (grid[x][y] !== "A") return 0;
  if (x - 1 < 0 || x + 1 >= grid.length) return 0; // edge of grid
  if (y - 1 < 0 || y + 1 >= grid[0].length) return 0; //edge of grid
  // if A is at 1,1 then 0,0 and 1,1 must be MS and 1,0 and 0,1 must be MS as well
  const backslash = `${grid[x - 1][y - 1]}${grid[x + 1][y + 1]}`;
  const forwardslash = `${grid[x + 1][y - 1]}${grid[x - 1][y + 1]}`;
  if (backslash !== "MS" && backslash !== "SM") return 0;
  if (forwardslash !== "MS" && forwardslash !== "SM") return 0;
  return 1;
};

let Xoccurrences = 0;
for (let x = 0; x < dataGrid.length; x++) {
  for (let y = 0; y < dataGrid[x].length; y++) {
    Xoccurrences += checkLocation(x, y, dataGrid);
  }
}

console.log(`Part 2: ${Xoccurrences}`);
