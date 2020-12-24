import * as utils from "../utils";
const initialDimensionRows = utils.readFile("day-17/mock.txt").split(/\r?\n/);

const CYCLES_TO_RUN = 6;

const NUM_ACTIVE_REQ_TO_ACTIVATE = 3;
const MIN_NUM_ACTIVE_REQ_TO_REMAIN_ACTIVE = 2;
const MAX_NUM_ACTIVE_REQ_TO_REMAIN_ACTIVE = 3;

interface Coordinate {
  x: number;
  y: number;
  z: number;
  state: CubeState;
}

interface Cube {
  position: Coordinate;
  state: CubeState;
}

enum CubeState {
  ACTIVE = "#",
  INACTIVE = ".",
}

const getNumActiveNeighbors = (
  { x, y, z }: Coordinate,
  pocketDimensionState: { [key: string]: CubeState }
) => {
  const options = Array.from([-1, 0, 1])
    .map((xOffset) => x + xOffset)
    .map((xCoord) =>
      Array.from([-1, 0, 1])
        .map((yOffset) => [xCoord, y + yOffset])
        .map(([_, yCoord]) =>
          Array.from([-1, 0, 1]).map((zOffset) => [xCoord, yCoord, z + zOffset])
        )
        .reduce((acc, curr) => [...acc, ...curr], [])
    )
    .reduce((acc, curr) => [...acc, ...curr], [])
    .filter(
      ([xCoord, yCoord, zCoord]) => xCoord !== x || yCoord !== y || zCoord !== z
    )
    .map(([x, y, z]) => positionKey({ x, y, z }))
    .filter((coord) => pocketDimensionState[coord] === CubeState.ACTIVE);
  console.log(options);
  console.log(options.length);
  return options.length;
};

const positionKey = ({ x, y, z }) => `x=${x};y=${y};z=${z}`;

const readCubeState = (char: string): CubeState =>
  char === CubeState.ACTIVE ? CubeState.ACTIVE : CubeState.INACTIVE;

const pocketDimension = initialDimensionRows
  .map((row, rowIndex) =>
    row
      .split("")
      .map((char, colIndex) => ({
        x: rowIndex,
        y: colIndex,
        z: 0,
        state: readCubeState(char),
      }))
      .reduce((acc, cube) => {
        return { ...acc, [positionKey(cube)]: cube };
      }, {})
  )
  .reduce((acc, curr) => ({ ...acc, ...curr }), {});

const firstIteration = console.log(pocketDimension);
