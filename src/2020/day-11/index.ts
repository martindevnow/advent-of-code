import * as utils from "../utils";

const mapToTile = (str: string) => {
  switch (str) {
    case ".":
    case "L":
    case "#":
    default:
      return str as Tile;
  }
};

const data = utils.readFile("day-11/data.txt");

const floor: Array<Array<Tile>> = data
  .split(/\r?\n/)
  .map((row) => row.split("").map(mapToTile));

enum TILE {
  OCCUPIED = "#",
  EMPTY_SEAT = "L",
  FLOOR = ".",
}

type Tile = "L" | "#" | ".";

type Floor = Array<Array<Tile>>;

const isOccupied = (symb: Tile) => symb === TILE.OCCUPIED;
const isEmptySeat = (symb: Tile) => symb === TILE.EMPTY_SEAT;
const isFloor = (symb: Tile) => symb === TILE.FLOOR;
const isSeat = (symb: Tile) =>
  symb === TILE.OCCUPIED || symb === TILE.EMPTY_SEAT;

const getSurroundingIndicies = (
  x: number,
  y: number,
  maxX: number,
  maxY: number
) => {
  const list: Array<[number, number]> = [];
  if (x > 0 && y > 0) {
    // 0, 0
    list.push([x - 1, y - 1]);
  }
  if (x > 0) {
    // 0, 1
    list.push([x - 1, y]);
  }
  if (x > 0 && y < maxY) {
    // 0, 2
    list.push([x - 1, y + 1]);
  }
  if (y > 0) {
    // 1, 0
    list.push([x, y - 1]);
  }
  if (y < maxY) {
    // 1, 2
    list.push([x, y + 1]);
  }
  if (x < maxX && y > 0) {
    // 2, 0
    list.push([x + 1, y - 1]);
  }
  if (x < maxX) {
    // 2, 1
    list.push([x + 1, y]);
  }
  if (x < maxX && y < maxX) {
    // 2, 2
    list.push([x + 1, y + 1]);
  }

  return list;
};

const countAdjacentOccupied = (x: number, y: number, currentFloor: Floor) => {
  const adjacent = getSurroundingIndicies(
    x,
    y,
    currentFloor.length - 1,
    currentFloor[x].length - 1
  );
  const result = adjacent.reduce((acc, [x2, y2]) => {
    const neighborTile = currentFloor[x2][y2];
    return acc + (isOccupied(neighborTile) ? 1 : 0);
  }, 0);
  return result;
};

const part1 = (floorPlan: Array<Array<Tile>>) => {
  let status = { stillChanging: true };
  while (status.stillChanging) {
    status.stillChanging = false;
    floorPlan = floorPlan.map((row, rowIndex) =>
      row.map((tile, colIndex) => {
        if (isFloor(tile)) {
          return tile;
        }
        const occupiedAdjacent = countAdjacentOccupied(
          rowIndex,
          colIndex,
          floorPlan
        );
        if (isEmptySeat(tile) && occupiedAdjacent === 0) {
          status.stillChanging = true;
          return TILE.OCCUPIED;
        }

        if (isOccupied(tile) && occupiedAdjacent >= 4) {
          status.stillChanging = true;
          return TILE.EMPTY_SEAT;
        }

        // No Change
        return tile;
      })
    );
  }
  return floorPlan;
};

const occupiedCount = part1(floor)
  .map((row) => row.filter(isOccupied).length)
  .reduce((acc, curr) => acc + curr, 0);

// console.log(floorPlan.map((row) => row.join("")).join("\n"));
// console.log("Result :: part 1");
// console.log(occupiedCount);

const getSurroundingSeats = (
  x: number,
  y: number,
  floor: Array<Array<Tile>>
) => {
  const topLeftOffset = new Array(Math.min(x, y))
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x - offset][y - offset]);
    });

  const leftOffset = new Array(y)
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x][y - offset]);
    });

  const bottomLeftOffset = new Array(Math.min(floor.length - x - 1, y))
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x + offset][y - offset]);
    });

  const topOffset = new Array(x)
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x - offset][y]);
    });

  const bottomOffset = new Array(floor.length - x - 1) // ?
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x + offset][y]);
    });

  const topRightOffset = new Array(Math.min(x, floor[x].length - y))
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x - offset][y + offset]);
    });

  const rightOffset = new Array(floor[x].length - y)
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x][y + offset]);
    });

  const bottomRightOffset = new Array(
    Math.min(floor.length - x - 1, floor[x].length - 1 - y)
  )
    .fill(null)
    .map((_, i) => i + 1)
    .find((offset) => {
      return isSeat(floor[x + offset][y + offset]);
    });

  return [
    ...(topLeftOffset ? [[x - topLeftOffset, y - topLeftOffset]] : []),
    ...(leftOffset ? [[x, y - leftOffset]] : []),
    ...(bottomLeftOffset ? [[x + bottomLeftOffset, y - bottomLeftOffset]] : []),

    ...(topOffset ? [[x - topOffset, y]] : []),
    ...(bottomOffset ? [[x + bottomOffset, y]] : []),

    ...(topRightOffset ? [[x - topRightOffset, y + topRightOffset]] : []),
    ...(rightOffset ? [[x, y + rightOffset]] : []),
    ...(bottomRightOffset
      ? [[x + bottomRightOffset, y + bottomRightOffset]]
      : []),
  ];
};

const countSemiAdjacentOccupied = (
  x: number,
  y: number,
  currentFloor: Floor
) => {
  const adjacent = getSurroundingSeats(x, y, currentFloor);
  const result = adjacent.reduce((acc, [x2, y2]) => {
    const neighborTile = currentFloor[x2][y2];
    return acc + (isOccupied(neighborTile) ? 1 : 0);
  }, 0);
  return result;
};

const part2 = (floorPlan: Array<Array<Tile>>) => {
  let status = { stillChanging: true };
  while (status.stillChanging) {
    status.stillChanging = false;
    floorPlan = floorPlan.map((row, rowIndex) =>
      row.map((tile, colIndex) => {
        if (isFloor(tile)) {
          return tile;
        }
        const occupiedAdjacent = countSemiAdjacentOccupied(
          rowIndex,
          colIndex,
          floorPlan
        );
        if (isEmptySeat(tile) && occupiedAdjacent === 0) {
          status.stillChanging = true;
          return TILE.OCCUPIED;
        }

        if (isOccupied(tile) && occupiedAdjacent >= 5) {
          status.stillChanging = true;
          return TILE.EMPTY_SEAT;
        }

        // No Change
        return tile;
      })
    );
  }
  return floorPlan;
};

const newFloor = part2(floor);
const part2OccupiedCount = newFloor
  .map((row) => row.filter(isOccupied).length)
  .reduce((acc, curr) => acc + curr, 0);

console.log(newFloor.map((row) => row.join("")).join("\n"));
console.log("Result :: part 2");
console.log(part2OccupiedCount);
