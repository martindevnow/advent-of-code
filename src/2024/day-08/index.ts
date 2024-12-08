import * as utils from "../utils";

const realData: string = utils.readFile("day-08/data.txt"); // read

const testData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const getAntiNodes = (
  coordsA: [number, number],
  coordsB: [number, number]
): [[number, number], [number, number]] => {
  const [rowA, colA] = coordsA; // [3, 7] // row 3, col 7
  const [rowB, colB] = coordsB; // [4, 4] // row 4, col 4
  const deltaRow = rowB - rowA; // anti nodes should be [2, 10] [5, 1]
  const deltaCol = colB - colA;
  const left: [number, number] = [rowA - deltaRow, colA - deltaCol];
  const right: [number, number] = [rowB + deltaRow, colB + deltaCol];
  return [left, right];
};

const isInGrid = (coords: [number, number], grid: Array<Array<unknown>>) => {
  if (coords[0] < 0 || coords[1] < 0) return false;
  if (coords[0] >= grid.length || coords[1] >= grid[coords[0]].length)
    return false;
  return true;
};

const grid = realData.split("\n").map((line) => line.split(""));

const antennas = new Map<string, Array<[number, number]>>();

grid.forEach((line, rowId) => {
  line.forEach((cell, colId) => {
    if (cell === ".") return;
    const curAntenna = antennas.get(cell) ?? [];
    antennas.set(cell, [...curAntenna, [rowId, colId]]);
  });
});

// // iterate through each pair of antenna and find where the antinodes would be
const antinodes = new Set<string>();

antennas.forEach((ant) => {
  for (let i = 0; i < ant.length - 1; i++) {
    for (let j = i + 1; j < ant.length; j++) {
      const [a, b] = getAntiNodes(ant[i], ant[j]);
      if (isInGrid(a, grid)) antinodes.add(`${a[0]},${a[1]}`);
      if (isInGrid(b, grid)) antinodes.add(`${b[0]},${b[1]}`);
    }
  }
});

console.log(`Part 1: ${antinodes.size}`);

// console.log(getAntiNodes([4, 4], [3, 7]));

const getAntiNodesPart2 = (
  coordsA: [number, number],
  coordsB: [number, number],
  grid: Array<Array<unknown>>
): Array<[number, number]> => {
  const [rowA, colA] = coordsA; // [3, 7] // row 3, col 7
  const [rowB, colB] = coordsB; // [4, 4] // row 4, col 4
  const deltaRow = rowB - rowA; // anti nodes should be [2, 10] [5, 1]
  const deltaCol = colB - colA;

  // get ALL to the left and ALL to the right
  let leftAntinodes: Array<[number, number]> = [];
  let left: [number, number] = [rowA - deltaRow, colA - deltaCol];
  while (isInGrid(left, grid)) {
    leftAntinodes = [...leftAntinodes, left];
    left = [left[0] - deltaRow, left[1] - deltaCol];
  }

  let rightAntinodes: Array<[number, number]> = [];
  let right: [number, number] = [rowB + deltaRow, colB + deltaCol];
  while (isInGrid(right, grid)) {
    rightAntinodes = [...rightAntinodes, right];
    right = [right[0] + deltaRow, right[1] + deltaCol];
  }
  return [...leftAntinodes, ...rightAntinodes];
};

const antinodesPart2 = new Set<string>();

antennas.forEach((ant) => {
  for (let i = 0; i < ant.length - 1; i++) {
    for (let j = i + 1; j < ant.length; j++) {
      const antiNodes = getAntiNodesPart2(ant[i], ant[j], grid);
      // add the antennas themselves too
      antinodesPart2.add(`${ant[i][0]},${ant[i][1]}`);
      antinodesPart2.add(`${ant[j][0]},${ant[j][1]}`);
      antiNodes.forEach((node) => {
        if (isInGrid(node, grid)) antinodesPart2.add(`${node[0]},${node[1]}`);
      });
    }
  }
});

console.log(`Part 2: ${antinodesPart2.size}`);

// console.log(getAntiNodesPart2([2, 5], [4, 4], grid));
