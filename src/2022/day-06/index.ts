import * as utils from "../utils";

const data = utils
  .readFile("day-06/data.txt") // read input data
  .split("");

// find first instance of 4 sequential characters with no repeats
// part 1

let finalIndex1: number | null = null;
for (let i = 0; i < data.length; i++) {
  if (i < 3) continue;
  const set = new Set([...data.slice(i - 4, i)]);
  if (set.size === 4) {
    finalIndex1 = i;
    break;
  }
}
console.log({ finalIndex1 });

// part 2
let finalIndex2: number | null = null;
for (let i = 0; i < data.length; i++) {
  if (i < 13) continue;
  const set = new Set([...data.slice(i - 14, i)]);
  if (set.size === 14) {
    finalIndex2 = i;
    break;
  }
}
console.log({ finalIndex2 });
