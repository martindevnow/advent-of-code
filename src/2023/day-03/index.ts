import * as utils from "../utils";

const data: Array<Array<string>> = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n/)
  .map((line) => line.split(""));
// .slice(0, 2);

const surroundingCells = (
  startPos: [number, number],
  length: number,
  maxLineLength: number,
  maxLines: number
) => {
  const aboveCells = new Array(length + 2)
    .fill(0)
    .map((_, i) => [startPos[0] - 1, startPos[1] - 1 + i]);
  const adjacentCells = [
    [startPos[0], startPos[1] - 1],
    [startPos[0], startPos[1] + length],
  ];
  const belowCells = new Array(length + 2)
    .fill(0)
    .map((_, i) => [startPos[0] + 1, startPos[1] - 1 + i]);

  return [...aboveCells, ...adjacentCells, ...belowCells].filter(
    ([rowId, colId]) => {
      return (
        rowId < maxLineLength && colId < maxLines && rowId >= 0 && colId >= 0
      );
    }
  );
};

// utils.logIt(surroundingCells([0, 0], 1, 3, 3));

const isSymbol = (str: string): boolean => {
  return !/[0-9\.]/.test(str);
};

// utils.logIt(isSymbol("."));
// utils.logIt(isSymbol("2"));
// utils.logIt(isSymbol("$"));
// utils.logIt(isSymbol("\\"));

const hasSymbolAdjacent = (
  grid: Array<Array<string>>,
  startPos: [number, number],
  length: number
): boolean => {
  const cellsToCheck = surroundingCells(
    startPos,
    length,
    grid[0].length,
    grid.length
  );

  const hasSymbol = cellsToCheck.some(([lineId, colId]) =>
    isSymbol(grid[lineId][colId])
  );

  return hasSymbol;
};

// find all the numbers and their positions and length
const numbers = data.flatMap((line, lineIndex) => {
  let inNum = false;
  let strNum = "";
  let startPos;

  const foundNumbers: Array<{ strNum: string; startPos: [number, number] }> =
    [];

  for (let i = 0; i < line.length; i++) {
    if (utils.isNumeric(line[i])) {
      // if cell is num digit, add to number and proceed
      if (inNum == false) {
        inNum = true;
        startPos = [lineIndex, i];
      }
      strNum = `${strNum}${line[i]}`;
    } else {
      if (inNum == true) {
        inNum = false;
        foundNumbers.push({
          strNum,
          startPos,
        });
        startPos = [];
        strNum = "";
      }
    }

    if (i == line.length - 1 && inNum == true) {
      foundNumbers.push({
        strNum,
        startPos,
      });
    }
  }
  return foundNumbers;
});
// utils.logIt(numbers);

const parts = numbers.filter(({ strNum, startPos }) => {
  return hasSymbolAdjacent(data, startPos, strNum.length);
});

const finalPartNum = parts.reduce((acc, curr) => {
  return acc + +curr.strNum;
}, 0);

console.log(`Day 3, Part 1: ${finalPartNum}`);
// 529673 is too low
// 530495 was correct

// part 2

// iterate through the gears and track the
/**
 * Gear {
 *   parts: [<id1>, <id2>]
 * }
 */

// search the grid for symbols around

// if there is a symbol next to it, then it is a part number

// sum all part numbers
const gearMap = new Map<string, Array<number>>();
data.forEach((line, lineId) => {
  line.forEach((cell, colId) => {
    if (cell === "*") {
      gearMap.set(`line${lineId}col${colId}`, []);
    }
  });
});

utils.logIt(gearMap.size);

parts.forEach(({ strNum, startPos }) => {
  const cellsToCheck = surroundingCells(
    startPos,
    strNum.length,
    data[0].length,
    data.length
  );
  cellsToCheck.forEach(([lineId, colId]) => {
    if (data[lineId][colId] !== "*") {
      return;
    }

    const currentGearId = `line${lineId}col${colId}`;
    const currentGear = gearMap.get(currentGearId);
    if (!currentGear?.length) {
      gearMap.set(currentGearId, [+strNum]);
    } else {
      gearMap.set(currentGearId, [...currentGear, +strNum]);
    }
  });
});

utils.logIt(gearMap.size);

// iterate through gears, filter out any with array length != 2, then multiply gears and sum them
let totalGearRatio = 0;

gearMap.forEach((parts) => {
  if (parts.length !== 2) {
    return;
  }

  totalGearRatio += parts[0] * parts[1];
});

console.log(`Day 3, Part 2: ${totalGearRatio}`);

// Ans: 80253814
