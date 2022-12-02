import * as utils from "../utils";

const map = new Array();

const data = utils
  .readFile("day-01/data.txt") // read input data
  .split(/\n\n/)
  .map((group) => group.split("\n").map((val) => +val))
  .map((group) => group.reduce((acc, curr) => (acc += curr), 0));

console.log(data);
const max = data.reduce((acc, curr) => (acc > curr ? acc : curr), 0);
console.log(max);

// part 2

const secondMax = data.reduce(
  (acc, curr) => (curr > acc && curr < max ? curr : acc),
  0
);
console.log({ secondMax });

const thirdMax = data.reduce(
  (acc, curr) => (curr > acc && curr < max && curr < secondMax ? curr : acc),
  0
);
console.log({ thirdMax });

console.log(max + secondMax + thirdMax);
