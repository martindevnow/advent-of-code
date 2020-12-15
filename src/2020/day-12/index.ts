import * as utils from "../utils";

const mod4 = utils.mod(4);

const data = utils.readFile("day-12/data.txt");

enum IType {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
  RIGHT = "R",
  LEFT = "L",
  FORWARD = "F",
}

interface Instruction {
  type: IType;
  value: number;
}

const mapToInstruction = (cell: string) => {
  const [type, ...rest] = cell.split("");
  const value = Number(rest.join(""));
  return {
    type: type as IType,
    value,
  };
};

const instructions: Array<Instruction> = data
  .split(/\r?\n/)
  .map(mapToInstruction);

const STARTING = { ns: 0, ew: 0, facing: IType.EAST };

const getDirection = (
  currentFacing: IType,
  value: number,
  clockwise: boolean
): IType => {
  const dirMap = {
    [IType.NORTH]: 0,
    [IType.EAST]: 1,
    [IType.SOUTH]: 2,
    [IType.WEST]: 3,
  };

  const dirs = [IType.NORTH, IType.EAST, IType.SOUTH, IType.WEST];
  const currentDirIndex = dirMap[currentFacing];
  const turn90DegTimes = value / 90;
  const finalDirIndex = mod4(
    currentDirIndex + turn90DegTimes * (clockwise ? 1 : -1)
  );
  return dirs[finalDirIndex];
};

const round1 = (navigationInstructions: Array<Instruction>) =>
  navigationInstructions.reduce(
    (acc, curr) => {
      const { type: action, value } = curr;
      // if Forward, then just use the currently facing direction
      const type = action === IType.FORWARD ? acc.facing : action;

      switch (type) {
        case IType.EAST:
        case IType.WEST:
          acc.ew += (type === IType.EAST ? 1 : -1) * value;
          break;
        case IType.NORTH:
        case IType.SOUTH:
          acc.ns += (type === IType.NORTH ? 1 : -1) * value;
          break;
        case IType.RIGHT:
        case IType.LEFT:
          acc.facing = getDirection(acc.facing, value, type === IType.RIGHT);
          break;
      }

      return acc;
    },
    { ...STARTING }
  );
// const round1Result = round1(instructions);
// console.log("Result :: Part 1");
// console.log(round1Result);
// console.log(Math.abs(round1Result.ew) + Math.abs(round1Result.ns));

export const rotate = (
  num90DegTurnsToRotate: number,
  curr: { ns: number; ew: number }
): { ns: number; ew: number } => {
  if (num90DegTurnsToRotate === 1 || num90DegTurnsToRotate === -1) {
    return {
      ns: curr.ew * -1 * num90DegTurnsToRotate,
      ew: curr.ns * num90DegTurnsToRotate,
    };
  }
  if (num90DegTurnsToRotate === 2 || num90DegTurnsToRotate === -2) {
    return { ns: curr.ns * -1, ew: curr.ew * -1 };
  }
  if (num90DegTurnsToRotate === 3 || num90DegTurnsToRotate === -3) {
    return {
      ns: curr.ew * (num90DegTurnsToRotate / 3),
      ew: curr.ns * -1 * (num90DegTurnsToRotate / 3),
    };
  }

  return curr;
};

const round2 = (navInstructions: Array<Instruction>) => {
  return navInstructions.reduce(
    (acc, curr) => {
      const { type, value } = curr;

      switch (type) {
        case IType.NORTH:
          acc.waypoint.ns += value;
          return acc;

        case IType.SOUTH:
          acc.waypoint.ns -= value;
          return acc;

        case IType.EAST:
          acc.waypoint.ew += value;
          return acc;

        case IType.WEST:
          acc.waypoint.ew -= value;
          return acc;

        case IType.LEFT:
        case IType.RIGHT:
          const rotation = (value / 90) * (type === IType.LEFT ? -1 : 1);
          acc.waypoint = rotate(rotation, acc.waypoint);
          return acc;

        case IType.FORWARD:
          acc.ship.ns += acc.waypoint.ns * value;
          acc.ship.ew += acc.waypoint.ew * value;
          return acc;
      }
    },
    {
      waypoint: { ns: 1, ew: 10 },
      ship: { ...STARTING },
    }
  );
};

const round2Results = round2(instructions);
console.log(round2Results);
console.log("Results :: Part 2");
console.log(Math.abs(round2Results.ship.ns) + Math.abs(round2Results.ship.ew));
