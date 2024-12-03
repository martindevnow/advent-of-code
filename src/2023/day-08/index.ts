import * as utils from "../utils";

const [instructionsStr, dataStr]: Array<string> = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n\n/);

const reg = /(\w{3}) = \((\w{3}), (\w{3})\)/g;

const data = Array.from(dataStr.matchAll(reg))
  .map((line) => ({
    loc: line[1],
    left: line[2],
    right: line[3],
  }))
  .reduce((acc, curr) => {
    const { left: L, right: R } = curr;
    return {
      ...acc,
      [curr.loc]: { L, R },
    };
  }, {} as { [k: string]: { L: string; R: string } });

let i = 0;

let curr = "AAA";

while (true) {
  if (curr === "ZZZ") break;
  const instructionIndex = i % instructionsStr.length;
  curr = data[curr][instructionsStr[instructionIndex]];
  i++;
}

console.log(`Part 1: ${i}`);

// Part 2

let startNodes = Object.keys(data).filter((key) => key[2] === "A");
const loopLength = new Array(startNodes.length).fill(0);

let j = 0;
while (true) {
  // console.log(startNodes);

  startNodes.forEach((node, index) => {
    const end = node[2] === "Z";
    if (end) {
      loopLength[index] = j;
    }
  });

  if (loopLength.every((val) => val !== 0)) {
    break;
  }

  const instructionIndex = j % instructionsStr.length;

  startNodes = startNodes.map(
    (node) => data[node][instructionsStr[instructionIndex]]
  );
  j++;
}

const gcd = (a, b) => {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Function to compute the LCM of two numbers
const lcm = (a, b) => {
  return Math.abs(a * b) / gcd(a, b);
};

// Function to compute the LCM of an array of numbers
const lcmOfArray = (arr) => {
  return arr.reduce((acc, num) => lcm(acc, num), 1);
};

console.log(loopLength);
console.log(`Part 2: ${lcmOfArray(loopLength)}`);
