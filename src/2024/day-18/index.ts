import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;
const gridSize = 71;

const data = realData;

console.log(`::: Part 1 :::`);

const initGrid = (rows: number, cols: number) => {
  const grid: Array<Array<string>> = new Array(cols).fill(".").map(() => {
    return new Array(rows).fill(".");
  });
  return grid;
};

const grid = initGrid(gridSize, gridSize);

// console.log(grid[0]);
// console.log(grid[0][0]);
// utils.drawGrid(grid);

const corrupt = data
  .split("\n")
  .slice(0, 1024)
  .map((str) => str.split(",").map(Number));
console.log(corrupt);

corrupt.forEach(([x, y]) => {
  grid[x][y] = "#";
});

utils.drawGrid(grid);

type Cell = { x: number; y: number; distance: number };

// NOTE: Breadth First Search
function findShortestPath(grid: string[][]): number | null {
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Directions: Up, Down, Left, Right
  const directions = [
    { dx: -1, dy: 0 }, // Up
    { dx: 1, dy: 0 }, // Down
    { dx: 0, dy: -1 }, // Left
    { dx: 0, dy: 1 }, // Right
  ];

  // Check if a cell is valid and safe
  const isValid = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < numRows && y < numCols && grid[x][y] === ".";

  // Initialize the queue for BFS and mark the starting cell
  const queue: Cell[] = [{ x: numRows - 1, y: numCols - 1, distance: 0 }];
  const visited: boolean[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );
  visited[numRows - 1][numCols - 1] = true;

  // Perform BFS
  while (queue.length > 0) {
    const { x, y, distance } = queue.shift()!;

    // If we reach the target cell, return the distance
    if (x === 0 && y === 0) {
      return distance;
    }

    // Explore all valid neighbors
    for (const { dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (isValid(newX, newY) && !visited[newX][newY]) {
        visited[newX][newY] = true;
        queue.push({ x: newX, y: newY, distance: distance + 1 });
      }
    }
  }

  // If no path is found, return null
  return null;
}

const dist = findShortestPath(grid);
console.log(`Part 1: ${dist}`);

console.log(`::: Part 2 :::`);

// NOTE: Binary Search
// Rather than trying all of the spaces, I will binary search to see which one cuts me off
const findInvalidBit = () => {
  let allCorrupt = data.split("\n").map((str) => str.split(",").map(Number));
  let left = 1024; // known valid
  let right = allCorrupt.length - 1;
  let result: any = null;

  while (left <= right) {
    let grid2 = initGrid(gridSize, gridSize);
    const mid = Math.floor((left + right) / 2);

    // add walls invalid
    // mid + 1 because slice is not inclusive
    allCorrupt.slice(0, mid + 1).forEach(([x, y]) => {
      grid2[x][y] = "#";
    });

    if (!!findShortestPath(grid2)) {
      // path still exists
      console.log(`Index ${mid} passed`);
      left = mid + 1; // Search in the right half
    } else {
      // path is blocked
      console.log(`Index ${mid} FAILED`);
      result = mid;
      right = mid - 1; // Search in the left half
    }
  }
  console.log({ left, right, result });
  return allCorrupt[result];
};

// 54,16 incorrect!
const part2 = findInvalidBit();

console.log(`Part 2: ${part2}`);
