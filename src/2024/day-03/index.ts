import * as utils from "../utils";

const data: string = utils.readFile("day-03/data.txt"); // read input data
// .split(/\n/);

const testData =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const testData2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const mulRegex = /mul\((\d+),(\d+)\)/g;
const dontRegex = /don't\(\)/g;
const doRegex = /do\(\)/g;

// get all matches
const mul = [...data.matchAll(mulRegex)];

console.log(`mul: ${mul.length}`);

console.log("Part 1: ");
const all = mul
  .map((match) => +match[1] * +match[2])
  .reduce((acc, curr) => acc + curr, 0);

console.log(all);

console.log("Part 2: ");

const disable = [...data.matchAll(dontRegex)];
const enable = [...data.matchAll(doRegex)];

// console.log(disable[0], enable[0]);
const allMatches = [...mul, ...enable, ...disable];

allMatches.sort((a, b) => a.index - b.index);
const sum = allMatches.reduce(
  (acc, curr) => {
    if (curr[0] == "don't()") {
      acc.enabled = false;
      return acc;
    }
    if (curr[0] === "do()") {
      acc.enabled = true;
      return acc;
    }
    if (acc.enabled) {
      acc.sum = acc.sum + +curr[1] * +curr[2];
      return acc;
    }
    // skip if not enabled
    return acc;
  },
  { sum: 0, enabled: true }
);

console.log(sum.sum);
