import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const DATA = realData;
const grid = DATA.split("\n").map((line) => line.split(""));

console.log(`::: Part 1 :::`);

interface Coordinate {
  x: number;
  y: number;
}

function calculateTotalFencingPrice(gardenMap: string[]): number {
  const numRows = gardenMap.length;
  const numCols = gardenMap[0].length;

  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  const directions = [
    { x: 0, y: 1 }, // right
    { x: 1, y: 0 }, // down
    { x: 0, y: -1 }, // left
    { x: -1, y: 0 }, // up
  ];

  function isValid(x: number, y: number): boolean {
    return x >= 0 && x < numRows && y >= 0 && y < numCols;
  }

  function bfs(
    start: Coordinate,
    plantType: string
  ): { area: number; perimeter: number } {
    const queue: Coordinate[] = [start];
    visited[start.x][start.y] = true;

    let area = 0;
    let perimeter = 0;

    while (queue.length > 0) {
      const { x, y } = queue.shift()!;
      area++;

      for (const { x: dx, y: dy } of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (isValid(nx, ny) && gardenMap[nx][ny] === plantType) {
          if (!visited[nx][ny]) {
            visited[nx][ny] = true;
            queue.push({ x: nx, y: ny });
          }
        } else {
          perimeter++; // Either out of bounds or different plant type
        }
      }
    }

    return { area, perimeter };
  }

  let totalPrice = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (!visited[i][j]) {
        const plantType = gardenMap[i][j];
        const { area, perimeter } = bfs({ x: i, y: j }, plantType);
        totalPrice += area * perimeter;
      }
    }
  }

  return totalPrice;
}

const part1 = calculateTotalFencingPrice(realData.split("\n"));

console.log(`Part 1: ${part1}`);

console.log(`::: Part 2 :::`);

let totalCost = 0;

const bfs = (coord: [number, number], grid: Array<Array<string>>) => {
  const [x, y] = coord;
  let plotArea = 0;

  let edges = new Set();
  let edgeCount = 0;

  const val = grid[x][y];
  const queue = [coord];

  while (queue.length > 0) {
    const current = queue.shift();
    const key = current!.join(",");

    if (visited.has(key)) {
      continue;
    } else {
      visited.add(key);
    }

    plotArea += 1;

    let neighbors = utils.getNeighbors(current!);

    for (let polarity = 0; polarity < neighbors.length; polarity++) {
      let neighbor = neighbors[polarity];
      if (
        !utils.isInBounds(neighbor, grid) ||
        grid[neighbor[0]][neighbor[1]] !== val
      ) {
        // edge
        edgeCount += 1;

        edges.add(`${polarity},${neighbor[0]},${neighbor[1]}`);

        for (const n2 of utils.getNeighbors(neighbor)) {
          if (edges.has(`${polarity},${n2[0]},${n2[1]}`)) {
            edgeCount -= 1;
          }
        }
      } else {
        queue.push(neighbor);
      }
    }
  }

  const price = plotArea * edgeCount;
  totalCost += price;
};

const visited = new Set();

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (!visited.has(`${row},${col}`)) {
      bfs([row, col], grid);
    }
  }
}

console.log(`Part 2: ${totalCost}`);
