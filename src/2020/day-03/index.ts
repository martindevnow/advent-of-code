import * as utils from "../utils";

const data = utils
  .readFile("day-03/data.txt")
  .split(/\r?\n/)
  .filter((item) => item.trim() !== "");

const MAP_WIDTH = data[0].length;

const DOWN = 1;
const RIGHT = 3;

const treesHit = data
  .map((row, index) => {
    return row[(index * RIGHT) % MAP_WIDTH] === "#";
  })
  .filter((item) => !!item).length;
  
console.log(treesHit);

const runs = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const treesPerRun = runs
  .map(
    (run) =>
      data
        .map(
          (row, index) =>
            index % run.down === 0 &&
            row[((index / run.down) * run.right) % MAP_WIDTH] === "#"
        )
        .filter((item) => !!item).length
  )
  .reduce((acc, curr) => curr * acc, 1);

console.log(treesPerRun);
