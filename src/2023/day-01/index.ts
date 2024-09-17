import * as utils from "../utils";

const data: Array<string> = utils
  .readFile("day-01/data.txt") // read input data
  .split(/\n/);

const nums = data.map((line) => {
  const first = line.split("").find((str) => utils.isNumeric(str));
  const last = line
    .split("")
    .reverse()
    .find((str) => utils.isNumeric(str));

  // console.log(`${first}${last}`);
  return `${first}${last}`;
});

const answer = nums.reduce((acc, curr) => {
  return acc + +curr;
}, 0);

console.log(`Day 1, Part 1: ${answer}`);

const convert = (str: string): string => {
  const validNumbers = {
    eight: "e8t",
    four: "f4r",
    five: "f5e",
    nine: "n9e",
    one: "o1e",
    six: "s6x",
    seven: "s7n",
    two: "t2o",
    three: "t3e",
  };
  const converted = Object.entries(validNumbers).reduce((acc, [key, val]) => {
    return acc.replace(new RegExp(key, "g"), val);
  }, str);
  return converted;
};

const nums2 = data.map((line) => convert(line));
console.log(nums2);

const nums2b = nums2.map((line) => {
  const first = line.split("").find((str) => utils.isNumeric(str));
  const last = line
    .split("")
    .reverse()
    .find((str) => utils.isNumeric(str));

  // console.log(`${first}${last}`);
  return `${first}${last}`;
});

console.log(nums2b);
const answer2 = nums2b.reduce((acc, curr) => {
  return acc + +curr;
}, 0);

console.log(`Day 1, Part 2: ${answer2}`);

// 54403 is too low
// 55393 is too high
// 55093 was on the money
