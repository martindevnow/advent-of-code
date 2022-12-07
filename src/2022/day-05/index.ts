import * as utils from "../utils";

const [stackData, movementData] = utils
  .readFile("day-05/data.txt") // read input data
  .split(/\n\n/)
  .map((line) => line.split("\n"));

console.log(JSON.stringify(stackData.length, null, 2));

const rows = stackData.map((line) => utils.chunkStr(4)(line));

const numberOfStacks = rows[rows.length - 1].length;

const getColumn =
  (x: number) =>
  <T>(arr: Array<Array<T>>): Array<T> => {
    return arr.map((row) => row[x]);
  };

const stacks = new Array(numberOfStacks)
  .fill([])
  .map((_, i) => getColumn(i)(rows))
  .map((stack) => stack.map((contents) => contents.trim()).filter(Boolean));

// console.log(JSON.stringify(stacks, null, 2));

const extract = (line: string) => {
  const regex = /move (\d+) from (\d+) to (\d+)/;
  const result = line.match(regex);
  if (result) {
    const [_, iterations, start, end] = result;
    return {
      iterations: +iterations,
      startIndex: +start - 1,
      endIndex: +end - 1,
    };
  }
  throw new Error("failed");
};
const movement = movementData.map((line) => extract(line));
// console.log(JSON.stringify(movement, null, 2));

// for (let i = 0; i < movement.length; i++) {
//   const currentMovement = movement[i];
//   for (let j = 0; j < movement[i].iterations; j++) {
//     const startStack = stacks[currentMovement.startIndex];
//     const endStack = stacks[currentMovement.endIndex];

//     const crate = startStack.shift();
//     endStack.unshift(crate ?? "");
//   }
// }
// console.log(JSON.stringify(stacks, null, 2));

const tops = stacks.map((stack) => stack[0]);
console.log(JSON.stringify(tops, null, 2));

// part 2

for (let i = 0; i < movement.length; i++) {
  const currentMovement = movement[i];
  const startStack = stacks[currentMovement.startIndex];
  const endStack = stacks[currentMovement.endIndex];

  const buffer: Array<string> = [];
  for (let j = 0; j < movement[i].iterations; j++) {
    const crate = startStack.shift();
    buffer.unshift(crate ?? "");
  }
  for (let j = 0; j < movement[i].iterations; j++) {
    const crate = buffer.shift();
    endStack.unshift(crate ?? "");
  }
}

const top2 = stacks.map((stack) => stack[0]);
console.log(JSON.stringify(top2, null, 2));
