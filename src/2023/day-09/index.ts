import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt"); // read input data

const testData = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const getNext = (nums: Array<number>) => {
  const deltas = nums.reduce(
    (acc, curr) => {
      if (acc.prev === null) return { prev: curr, deltas: [] };
      return { prev: curr, deltas: [...acc.deltas, curr - acc.prev] };
    },
    { prev: null, deltas: [] } as { prev: null | number; deltas: Array<number> }
  );
  if (deltas.deltas.filter((v) => v === 0).length === deltas.deltas.length) {
    return deltas.prev;
  }
  return deltas.prev + getNext(deltas.deltas);
};

// console.log(getNext([10, 13, 16, 21, 30, 45]));

const lines = realData
  .split("\n")
  .map((l) => l.split(" ").map(Number))
  .map((line) => getNext(line))
  .reduce((acc, curr) => acc + curr, 0);

console.log(`Part 1: ${lines}`);
// console.log(realData);

const linesPart2 = realData
  .split("\n")
  .map((l) => l.split(" ").map(Number).reverse())
  .map((line) => getNext(line))
  .reduce((acc, curr) => acc + curr, 0);
console.log(`Part 2: ${linesPart2}`);
