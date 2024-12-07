import * as utils from "../utils";

const realData: string = utils.readFile("day-07/data.txt"); // read

console.log(`Part 1: `);

const testData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const equations = realData.split("\n").map((line) => {
  const [resultStr, argsStr] = line.split(": ");
  const result = +resultStr;
  const args = argsStr.split(" ").map(Number);

  return { result, args };
});

// is there a way to do this with binary? start at 0000 where each bit is an operator
// 0 == + and 1 == *
// start with all + and count up in binary until you find the solution

const isKthBitSet = (num: number, k: number) => {
  if ((num & (1 << k)) > 0) return true;
  return false;
};

const findResult = (result: number, args: Array<number>) => {
  let i = 0;
  const numOperators = args.length - 1;
  while (i < Math.pow(2, numOperators)) {
    const sum = args.reduce((acc, curr, index) => {
      if (index === 0) return curr;
      if (isKthBitSet(i, index - 1)) return acc * curr;
      return acc + curr;
    }, 0);
    if (sum === result) return true;
    i++;
  }
  return false;
};

console.log(isKthBitSet(0, 0)); // false (0000)
console.log(isKthBitSet(0, 1)); // false
console.log(isKthBitSet(1, 0)); // true  (0001)
console.log(isKthBitSet(1, 1)); // false
console.log(isKthBitSet(2, 0)); // false
console.log(isKthBitSet(2, 1)); // true  (0010)
console.log(isKthBitSet(2, 2)); // false

console.log(findResult(10, [1, 5, 2, 1])); // true

const validEquations = equations.filter(({ result, args }) =>
  findResult(result, args)
);

const sum = validEquations.reduce((acc, curr) => {
  return acc + curr.result;
}, 0);

console.log(`Part 1: ${sum}`);

const getBase3Digit = (num: number, digit: number) => {
  const base3Digit = Math.floor(num / Math.pow(3, digit)) % 3;
  return base3Digit;
};

console.log(getBase3Digit(11, 0));
console.log(getBase3Digit(11, 1));
console.log(getBase3Digit(11, 2));

const findResultPart2 = (result: number, args: Array<number>) => {
  let i = 0;
  const numOperators = args.length - 1;
  while (i < Math.pow(3, numOperators)) {
    const sum = args.reduce((acc, curr, index) => {
      if (index === 0) return curr;
      if (getBase3Digit(i, index - 1) === 0) return acc + curr;
      if (getBase3Digit(i, index - 1) === 1) return acc * curr;
      return Number(`${acc}${curr}`);
    }, 0);
    if (sum === result) return true;
    i++;
  }
  return false;
};

const validEquations2 = equations.filter(({ result, args }) =>
  findResultPart2(result, args)
);

const sum2 = validEquations2.reduce((acc, curr) => {
  return acc + curr.result;
}, 0);

console.log(`Part 2: ${sum2}`);
