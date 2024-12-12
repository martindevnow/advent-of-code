import * as utils from "../utils";

//////// DATA ////////

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt"); // read input data

const testData = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

// 7-F7-
// .FJ|7
// SJLL7
// |F--J
// LJ.LJ

const grid = testData.split("\n").map((line) => line.split(""));

//////// Helpers ////////

const NEXT: { [sym: string]: utils.Coords2D } = {
  "|": { y: 1, x: 0 }, // must be below (or above)
  "-": { y: 0, x: 1 }, // must be right (or left)
  F: { y: -1, x: 1 }, // must be above (or left [1,-1])
  L: { y: 1, x: 1 }, // must be below (or left [-1,-1])
  J: { y: 1, x: -1 }, // must be below (or right   [-1, 1])
  "7": { y: -1, x: -1 }, // must be above (or right [1,1])
};

const DIRECTIONS = {
  "-1,0": "N",
  "1,0": "S",
  "0,1": "E",
  "0,-1": "W",
};

const FLIP_WHEN_BESIDE = ["-", "F", "L", "J", "7"];
const FLIP_WHEN_ABOVE = ["|"];
const CONNECTS = {
  N: ["F", "7", "|"],
  S: ["J", "L", "|"],
  E: ["-", "J", "7"],
  W: ["-", "F", "L"],
};

const getNSEWAsYX = () => {
  return {
    N: { y: -1, x: 0 },
    S: { y: 1, x: 0 },
    E: { y: 0, x: 1 },
    W: { y: 0, x: -1 },
  };
};

const getNSEWRelativeToPositionInGrid = (
  coords: utils.Coords2D,
  grid: Array<Array<unknown>>
) => {
  const diff = getNSEWAsYX();
  return {
    N:
      coords.y > 0
        ? { y: coords.y + diff.N.y, x: coords.x + diff.N.x }
        : undefined,
    S:
      coords.y < grid.length - 1
        ? { y: coords.y + diff.S.y, x: coords.x + diff.S.x }
        : undefined,
    E:
      coords.x < grid[0].length - 1
        ? { y: coords.y + diff.E.y, x: coords.x + diff.E.x }
        : undefined,
    W:
      coords.x > 0
        ? { y: coords.y + diff.W.y, x: coords.x + diff.W.x }
        : undefined,
  };
};

console.log("getNSEWRelativeToPositionInGrid");
console.log(getNSEWRelativeToPositionInGrid({ y: 0, x: 0 }, grid));
console.log(getNSEWRelativeToPositionInGrid({ y: 1, x: 1 }, grid));

const getNSEWContents = <T>(
  coord: utils.Coords2D,
  grid: Array<Array<T>>
): {
  NStr: T | undefined;
  SStr: T | undefined;
  EStr: T | undefined;
  WStr: T | undefined;
} => {
  const { N, S, E, W } = getNSEWRelativeToPositionInGrid(coord, grid);
  const NStr = N?.y !== undefined ? grid[N.y][N.x] : undefined;
  const SStr = S?.y !== undefined ? grid[S.y][S.x] : undefined;
  const EStr = E?.x !== undefined ? grid[E.y][E.x] : undefined;
  const WStr = W?.x !== undefined ? grid[W.y][W.x] : undefined;
  return { NStr, SStr, EStr, WStr };
};

console.log("getNSEWContents");
console.log(getNSEWContents({ y: 0, x: 0 }, grid));
console.log(getNSEWContents({ y: 1, x: 1 }, grid));

const getMovementDirection = (
  prevYX: utils.Coords2D,
  currYX: utils.Coords2D
) => {
  const dir = `${currYX.y - prevYX.y},${currYX.x - prevYX.x}`;
  return DIRECTIONS[dir];
};

console.log("getMovementDirection");
console.log(getMovementDirection({ y: 1, x: 1 }, { y: 0, x: 1 }));
console.log(getMovementDirection({ y: 1, x: 1 }, { y: 2, x: 1 }));
console.log(getMovementDirection({ y: 1, x: 1 }, { y: 1, x: 2 }));
console.log(getMovementDirection({ y: 1, x: 1 }, { y: 1, x: 0 }));

const getNextCoordBasedOnPipe = (
  prevYX: utils.Coords2D,
  currYX: utils.Coords2D,
  grid: Array<Array<string>>
): [number, number] => {
  // get the pipe
  const pipe = grid[currYX.y][currYX.x];

  // find out how we entered the pipe
  const directionTraveled = getMovementDirection(prevYX, currYX);

  return [0, 0];
};

///////  IMPLEMENTATION ////////

// const getNext = (
//   prev: utils.Coords2D,
//   curr: utils.Coords2D,
//   grid: Array<Array<string>>
// ): [number, number] => {
//   const { NStr, SStr, EStr, WStr } = getNSEWContents(curr);

//   console.log({ NStr, SStr, EStr, WStr });

//   const N = NEXT[NStr];
//   const S = NEXT[SStr];
//   const E = NEXT[EStr];
//   const W = NEXT[WStr];

//   let checkNext: Array<[number, number]> = [];

//   if (NStr && CONNECTS.N.includes(NStr))
//     checkNext.push(FLIP_WHEN_ABOVE.includes(NStr) ? [N[0] * -1, N[1] * -1] : N);
//   if (SStr && CONNECTS.S.includes(SStr)) checkNext.push(S);
//   if (EStr && CONNECTS.E.includes(EStr))
//     checkNext.push(
//       FLIP_WHEN_BESIDE.includes(EStr) ? [E[0] * -1, E[1] * -1] : E
//     );
//   if (WStr && CONNECTS.E.includes(WStr))
//     checkNext.push(
//       FLIP_WHEN_BESIDE.includes(WStr) ? [W[0] * -1, W[1] * -1] : W
//     );

//   checkNext = checkNext.map(([y, x]) => [curr[0] + y, curr[1] + x]);
//   console.log("getNext 2", { checkNext });
//   // remove previous
//   checkNext = checkNext.filter(([y, x]) => y !== prev[0] || x !== prev[1]);
//   console.log("getNext 3", { checkNext });

//   return checkNext[0];
// };

// // find S
// const coords = utils.getYXOfStringInString(testData, "S");
// // console.log({ coords });

// // Find initial pipes connected to Start
// // check NSEW for connecting pipes
// // normalize direction based on it's location and the location it points to

// const lastDirectionMoved = prevXY;

// const { NStr, SStr, EStr, WStr } = getNSEWContents(coords);

// const N = NEXT[NStr];
// const S = NEXT[SStr];
// const E = NEXT[EStr];
// const W = NEXT[WStr];

// console.log({ N, S, E, W });

// let checkNext: Array<[number, number]> = [];

// if (N && CONNECTS.N.includes(NStr))
//   checkNext.push(FLIP_WHEN_ABOVE.includes(NStr) ? [N[0] * -1, N[1] * -1] : N);
// if (S && CONNECTS.S.includes(SStr)) checkNext.push(S);
// if (E && CONNECTS.E.includes(EStr))
//   checkNext.push(FLIP_WHEN_BESIDE.includes(EStr) ? [E[0] * -1, E[1] * -1] : E);
// if (W && CONNECTS.E.includes(WStr))
//   checkNext.push(FLIP_WHEN_BESIDE.includes(WStr) ? [W[0] * -1, W[1] * -1] : W);

// checkNext = checkNext.map(([y, x]) => [coords[0] + y, coords[1] + x]);
// console.log("checkNext", checkNext);
// // check if next coords are identical for both directions/

// let prev = [coords, coords];
// let next: [[number, number], [number, number]] = checkNext as [
//   [number, number],
//   [number, number]
// ];
// console.log(":: Initial", {
//   prev,
//   //  next
// });

// let steps = 1;
// while (next[0][0] !== next[1][0] || next[0][1] !== next[1][1]) {
//   console.log(`:: Step #${steps}`);

//   const nextSteps = [
//     getNext(prev[0], next[0], grid),
//     // getNext(prev[1], next[1], grid),
//   ];

//   prev = [
//     next[0],
//     // next[1]
//   ];
//   next[0] = nextSteps[0];
//   // next[1] = nextSteps[1];

//   console.log("while", {
//     prev,
//     //  next
//   });
//   steps++;

//   if (steps > 10) break;
// }

// console.log(`Part 1: ${steps}`);
