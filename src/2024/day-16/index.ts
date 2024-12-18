import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");
const testData = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const data = realData;

let grid = utils.getGrid(data);
let [startY, startX] = utils.getXYFromArray(grid, "S");
let [endY, endX] = utils.getXYFromArray(grid, "E");

type Step = [number, number, string];

const nextStep = ([sr, sc, dir]: Step): Array<Step> => {
  let backwards = { U: "D", D: "U", L: "R", R: "L" };
  return [
    [sr - 1, sc, "U"] as Step,
    [sr, sc + 1, "R"] as Step,
    [sr + 1, sc, "D"] as Step,
    [sr, sc - 1, "L"] as Step,
  ].filter(([nr, nc, nd]) => grid[nr][nc] !== "#" && nd !== backwards[dir]);
};

let queue: Array<Array<[number, Array<Step>]>> = Array(2000)
  .fill(".")
  .map((x) => []);
queue[0].push([0, [[startY, startX, "R"]]]);

let p1min = 99999999;
let p2: Array<[number, Array<Step>]> = [];

let distObj = Object.fromEntries(
  grid.flatMap((x, ix) =>
    x.flatMap((y, yx) =>
      ["U", "D", "L", "R"].map((z) => [`${ix}|${yx}|${z}`, 999999])
    )
  )
);

while (queue.some((x) => x.length > 0)) {
  let [score, path] = queue[queue.findIndex((x) => x.length > 0)].shift() as [
    number,
    Array<Step>
  ];
  let last = path.at(-1) as Step;
  let [lr, lc, ld] = last;

  if (score > distObj[[lr, lc, ld].join("|")]) {
    continue;
  }

  distObj[[lr, lc, ld].join("|")] = score;

  let steps: Array<Step> = nextStep(last).filter(
    (x) =>
      !path.some((y) => y.slice(0, 2).join("|") === x.slice(0, 2).join("|"))
  );

  steps.forEach(([nr, nc, nd]) => {
    let newPath = path.slice();
    newPath.push([nr, nc, nd]);
    let newScore = nd === ld ? score + 1 : score + 1001;

    if (newScore <= p1min) {
      if (nr === endY && nc === endX) {
        p1min = newScore;
        p2.push([newScore, newPath]);
      } else {
        queue[Math.floor(newScore / 100)].push([newScore, newPath]);
      }
    }
  });
}

let allP2MinPaths = new Set(
  p2
    .filter((x) => x[0] === p1min)
    .flatMap((x) => x[1])
    .map((x) => x.slice(0, 2).join("|"))
);

console.log("P1 answer is ", p1min, " P2 answer is ", allP2MinPaths.size);
