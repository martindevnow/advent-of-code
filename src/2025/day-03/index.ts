import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`;

const data = realData;

console.log(`::: Part 1 :::`);

const findLargest = (str: string, startIndex = 0, toEnd = false) => {
  let max = 0;
  let index = 0;
  let end = toEnd ? str.length : str.length - 1;

  for (let i = startIndex; i < end; i++) {
    const num = Number(str[i]);
    if (num > max) {
      max = num;
      index = i;
    }
  }
  return [max, index];
};

const part1 = data.split("\n").map((line) => {
  const [tens, index] = findLargest(line);
  const [ones] = findLargest(line, index + 1, true);
  // console.log(`${tens}${ones}`);
  return Number(`${tens}${ones}`);
});

console.log(`Part 1: ${utils.sum(part1)}`);

console.log(`::: Part 2 :::`);

// find 12 largest

const findLargestNDigitsRemaining = (
  str: string,
  digitsRemaining: number,
  startIndex = 0
) => {
  let max = 0;
  let index = 0;
  let end = str.length - digitsRemaining - 1;

  for (let i = startIndex; i <= end; i++) {
    const num = Number(str[i]);
    if (num > max) {
      max = num;
      index = i;
    }
  }
  return [max, index];
};

const part2 = data.split("\n").map((line) => {
  let theNum = "";
  let lastIndex = -1;

  for (let i = 11; i >= 0; i--) {
    const [currNum, thisIndex] = findLargestNDigitsRemaining(
      line,
      i,
      lastIndex + 1
    );
    theNum = `${theNum}${currNum}`;
    lastIndex = thisIndex;
  }

  return Number(`${theNum}`);
});

console.log(`Part 2: ${utils.sum(part2)}`);
