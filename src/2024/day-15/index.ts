import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const testData2 = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>
>vv<v>
>v<<`;

const data = testData;

// console.log(`::: Part 1 :::`);

// const [mapStr, movesStr] = data.split("\n\n");
// const map = mapStr.split("\n").map((line) => line.split(""));

// const [robotY, robotX] = utils.getXYFromStrGrid(mapStr, "@");
// console.log({ robotY, robotX });
// const moves: Array<[number, number]> = movesStr
//   .split("")
//   .map((char) => {
//     switch (char) {
//       case "<":
//         return [0, -1] as [number, number];
//       case "^":
//         return [-1, 0] as [number, number];
//       case ">":
//         return [0, 1] as [number, number];
//       case "v":
//         return [1, 0] as [number, number];
//       default:
//         return [-1, -1] as [number, number];
//     }
//   })
//   .filter(([y, x]) => !(y === -1 && x === -1));
// // .slice(0, 4);

// const move = (
//   moves: Array<[number, number]>,
//   map: Array<Array<string>>,
//   robotCoord: [number, number]
// ) => {
//   // move along the map in the direction of the movement
//   // until finding an empty cell
//   // track all items found up to then
//   // if hit a wall before finding an empty cell, abandon
//   // if find empty cell, then unload from heap the items encountered and move the robot to the adjacent cell
//   // clear original robot location

//   console.log(`Moves Remaining: ${moves.length}`);
//   const [ogY, ogX] = robotCoord;
//   const moveToMake = moves.shift();

//   if (!moveToMake) return;

//   const [dY, dX] = moveToMake;
//   let [aY, aX] = [ogY + dY, ogX + dX]; // adjacent

//   let inspect = map[aY][aX];
//   // console.log({ ogY, ogX, dY, dX, aY, aX, inspect });

//   let heap: Array<string> = ["@"];

//   while (inspect !== "#") {
//     // console.log(`Inspecting: [${aY}, ${aX}] = ${inspect}`);
//     if (inspect === ".") {
//       // console.log("Found empty space");
//       // unload heap
//       while (heap.length > 0) {
//         map[aY][aX] = heap.pop() as string;
//         [aY, aX] = [aY - dY, aX - dX];
//       }

//       robotCoord = [ogY + dY, ogX + dX]; // move robot
//       map[ogY][ogX] = "."; // clear old robot spot

//       if (moves.length) {
//         // console.log("Starting next move");
//         return [moves, map, robotCoord];
//       }
//       return [[], map2, robotCoord] as any;
//     }

//     if (inspect === "O") {
//       // console.log("Found Box");
//       heap.push("O");
//       [aY, aX] = [aY + dY, aX + dX]; // keep inspecting
//       inspect = map[aY][aX];
//       continue;
//     }

//     [aY, aX] = [aY + dY, aX + dX];
//     inspect = map[aY][aX];
//   }

//   // console.log("Hit a wall");

//   // run next move from same spot
//   if (moves.length) return [moves, map, robotCoord];
//   return [[], map2, robotCoord] as any;
// };

// let [moves2, map2, robotCoors2] = move(moves, map, [robotY, robotX]);
// while (moves.length) {
//   [moves2, map2, robotCoors2] = move(moves2, map2, robotCoors2);
// }

// // find all coordinates of 'O'
// // y * 100 + x;

// console.log(map2);
// const gpsTotal = map2.reduce((acc, line, rowId) => {
//   console.log("");
//   return (
//     acc +
//     line.reduce((acc2, cell, colId) => {
//       process.stdout.write(cell);
//       if (cell !== "O") return acc2;
//       // return acc2 + colId * 100 + rowId;
//       return acc2 + (rowId * 100 + colId);
//     }, 0)
//   );
// }, 0);

// console.log(`Part 1: ${gpsTotal}`);

console.log(`::: Part 2 :::`);

// need to change moving up and down.
// moving left and right has no change
// need to consider pushing up on the side of a box could collide with just a side of another bot
// pushing up here would cause all 3 boxes to move up.
// as such, my initial heap would need to account for more things...
// IDK if my first approach could be modified to account for this...
//
// i would need to know the delta X from the robot, what the offset was on the Y as well
// when it made a collision
// make sure no walls would be collided with (tech)
// both of these would be OK to move up. each box found needs to have an open space (or a box)
// in both cells above it, and I also need to track my heap differently.
// in this case, track all coords encountered (as we spread horizontally) while travelling vertically
// and once an empty cell is found above every box, then do the movement of each '[' or ']'
//
//          #####
// ###      ..###
// ...      [].##
// .[]      .[].#
// [].      ..[].
// .[]      ...[]
// .@.  or  ...@.
//
// my strategy for moving left/right needs no modification
// calculating GPS coords is also identical

const [mapStr, movesStr] = data.split("\n\n");
const map = mapStr.split("\n").map((line) => line.split(""));

const newMap = map.map((row) =>
  row.flatMap((cell) => {
    switch (cell) {
      case "#":
        return ["#", "#"];
      case "@":
        return ["@", "."];
      case ".":
        return [".", "."];
      case "O":
        return ["[", "]"];
    }
    throw Error("found odd character");
  })
);

utils.drawGrid(newMap);

const moveWide = (
  moves: Array<[number, number]>,
  map: Array<Array<string>>,
  robotCoord: [number, number]
) => {
  // move along the map in the direction of the movement
  // until finding an empty cell
  // track all items found up to then
  // if hit a wall before finding an empty cell, abandon
  // if find empty cell, then unload from heap the items encountered and move the robot to the adjacent cell
  // clear original robot location

  console.log(`Moves Remaining: ${moves.length}`);
  const [ogY, ogX] = robotCoord;
  const moveToMake = moves.shift();

  if (!moveToMake) return;

  const [dY, dX] = moveToMake;
  let [aY, aX] = [ogY + dY, ogX + dX]; // adjacent

  let inspect = map[aY][aX];
  // console.log({ ogY, ogX, dY, dX, aY, aX, inspect });

  let heap: Array<string> = ["@"];

  while (inspect !== "#") {
    // console.log(`Inspecting: [${aY}, ${aX}] = ${inspect}`);
    if (inspect === ".") {
      // console.log("Found empty space");
      // unload heap
      while (heap.length > 0) {
        map[aY][aX] = heap.pop() as string;
        [aY, aX] = [aY - dY, aX - dX];
      }

      robotCoord = [ogY + dY, ogX + dX]; // move robot
      map[ogY][ogX] = "."; // clear old robot spot

      if (moves.length) {
        // console.log("Starting next move");
        return [moves, map, robotCoord];
      }
      return [[], map, robotCoord] as any;
    }

    if (inspect === "O") {
      // console.log("Found Box");
      heap.push("O");
      [aY, aX] = [aY + dY, aX + dX]; // keep inspecting
      inspect = map[aY][aX];
      continue;
    }

    [aY, aX] = [aY + dY, aX + dX];
    inspect = map[aY][aX];
  }

  // console.log("Hit a wall");

  // run next move from same spot
  if (moves.length) return [moves, map, robotCoord];
  return [[], map, robotCoord] as any;
};

console.log(`Part 2: ${{}}`);
