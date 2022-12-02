import * as utils from "../utils";

const map = new Array();

const data = utils
  .readFile("day-05/data.txt") // read input data
  .split(/\r?\n/)
  .map((line) =>
    line.split(" -> ").map((sides) => sides.split(",").map((str) => +str))
  )
  .map(([from, to]) => ({
    from: { x: from[0], y: from[1] },
    to: { x: to[0], y: to[1] },
  })); // break up by line

console.log("Confirm Data Format :: ", data.slice(0, 2));

// Place work below here

// Helpers

interface Line {
  from: Point;
  to: Point;
}
interface Point {
  x: number;
  y: number;
}

const isHorizontal = (line: Line) => line.from.x === line.to.x;
const isVertical = (line: Line) => line.from.y === line.to.y;

const vertLineToPoints = ({ from, to }: Line) =>
  new Array(Math.abs(to.x - from.x) + 1)
    .fill("")
    .map((_, i) => `${Math.min(to.x, from.x) + i}:${from.y}`);

const hozLineToPoints = ({ from, to }: Line) =>
  new Array(Math.abs(to.y - from.y) + 1)
    .fill("")
    .map((_, i) => `${from.x}:${Math.min(to.y, from.y) + i}`);

console.log(`hozLineToPoints(data[1])`);
console.log(hozLineToPoints(data[1]));

// Solution
const hozLines = data.filter((line) => isHorizontal(line));
const vertLines = data.filter((line) => isVertical(line));

const hozPoints = hozLines
  .map((line) => hozLineToPoints(line))
  .reduce((acc, curr) => acc.concat(curr), []);

const vertPoints = vertLines
  .map((line) => vertLineToPoints(line))
  .reduce((acc, curr) => acc.concat(curr), []);

const allPoints = hozPoints.concat(vertPoints);

// console.log({ allPoints });

const combined = allPoints.reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: (acc[curr] ?? 0) + 1,
  }),
  {} as Plot
);

interface Plot {
  [point: string]: number;
}

// console.log(combined);

// get points with more than 1 line on it
const numPoints = Object.values(combined).filter((val) => val > 1).length;

console.log(`Question 1: ${numPoints}`);
