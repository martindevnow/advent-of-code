import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `2x3x4
1x1x10`;

const data = realData;

console.log(`::: Part 1 :::`);

const gifts = data.split("\n").map((line) =>
  line
    .split("x")
    .map(Number)
    .sort((a, b) => a - b)
);

console.log(gifts.slice(0, 10));
const sum = gifts.reduce((acc, arr) => {
  arr.sort((a, b) => a - b);
  const [l, w, h] = arr;
  return acc + l * w * 3 + w * h * 2 + l * h * 2;
}, 0);

// 1692704 is too high
// 1586300 correct
console.log(`Part 1: Area of Wrapping paper ${sum} sqft`);

console.log(`::: Part 2 :::`);

const ribbon = gifts.reduce((acc, curr) => {
  return acc + curr[0] * 2 + curr[1] * 2 + curr[0] * curr[1] * curr[2];
}, 0);

console.log(`Part 2: Length of Ribbon: ${ribbon} ft`);
