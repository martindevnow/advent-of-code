import * as utils from "../utils";

const realData: string = utils.readFile("day-10/data.txt"); // read
const testData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

console.log(`::: Part 1 :::`);

const grid = realData.split("\n").map((line) => line.split("").map(Number));

const trailHeads = realData
  .split("\n")
  .map((line, rowId) =>
    line
      .split("")
      .map((height, colId) => {
        return { height: +height, rowId, colId };
      })
      .filter((cell) => cell.height === 0)
  )
  .reduce((acc, row) => acc.concat(row), []);

const getNextTile = (
  rowId: number,
  colId: number,
  height: number,
  grid: Array<Array<number>>
) => {
  if (height === 9) return [{ rowId, colId }];

  const left: [number, number] = [rowId, colId - 1];
  const right: [number, number] = [rowId, colId + 1];
  const up: [number, number] = [rowId - 1, colId];
  const down: [number, number] = [rowId + 1, colId];

  let toCheck: Array<[number, number]> = [];
  if (rowId > 0) toCheck.push(up);
  if (colId > 0) toCheck.push(left);
  if (rowId < grid.length - 1) toCheck.push(down);
  if (colId < grid[rowId].length - 1) toCheck.push(right);

  return toCheck
    .filter(([row, col]) => {
      return grid[row][col] === height + 1;
    })
    .flatMap(([row, col]) => getNextTile(row, col, height + 1, grid));
};

const scores = trailHeads.map((start) => {
  // check every direction, follow every path to find summit, return summit coords, ensure no repeats, get score
  const summits = getNextTile(start.rowId, start.colId, 0, grid).map(
    ({ rowId, colId }) => `${rowId},${colId}`
  );
  const uniqueSummits = new Set(summits);
  return { score: uniqueSummits.size };
});

const total = scores.reduce((acc, curr) => {
  return acc + curr.score;
}, 0);
console.log(`Part 1: ${total}`);

console.log(`::: Part 2 :::`);

const scoresPart2 = trailHeads.map((start) => {
  // check every direction, follow every path to find summit, return summit coords, ensure no repeats, get score
  const summits = getNextTile(start.rowId, start.colId, 0, grid).map(
    ({ rowId, colId }) => `${rowId},${colId}`
  );
  return { score: summits.length };
});
const totalPart2 = scoresPart2.reduce((acc, curr) => {
  return acc + curr.score;
}, 0);
console.log(`Part 2: ${totalPart2}`);
