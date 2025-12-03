import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

const data = realData;

const sum = (nums: Array<number>): number =>
  nums.reduce((acc, curr) => acc + curr, 0);

console.log(`::: Part 1 :::`);

const isInvalid = (num: number) => {
  const str = String(num);
  const left = str.slice(0, str.length / 2);
  const right = str.slice(str.length / 2);
  return left === right;
};

const findInvalidNumbers = (start: number, end: number): Array<number> => {
  const violations: Array<number> = [];
  for (let i = start; i <= end; i++) {
    if (isInvalid(i)) {
      violations.push(i);
    }
  }
  return violations;
};

const part1 = data
  .split(",")
  .map((range) => range.split("-"))
  .reduce((acc, curr) => {
    const [start, end] = curr;

    const violations = findInvalidNumbers(Number(start), Number(end));

    acc += sum(violations);

    return acc;
  }, 0);

console.log(`Part 1: ${part1}`);

console.log(`::: Part 2 :::`);
const isInvalidPart2 = (num: number) => {
  // check if the number has any repeated sequence
  const str = String(num);
  // crawl head and tail
  // max length is half the string
  // keep a set of occurrences and a set of violations
  // if the occurrences has exists, then add to violations

  let occurrences = new Set<string>();
  for (let head = 0; head <= str.length; head++) {
    for (let tail = 0; tail <= head; tail++) {
      const substr = str.slice(tail, head);
      // console.log(`Checking ${substr}`);
      if (substr.trim().length < 1) {
        continue;
      }
      if (occurrences.has(substr)) {
        // get the number of repetitions and see if that accounts for the entire string;
        const numOfRepetitions = Math.floor(str.length / substr.length);
        if (substr.repeat(numOfRepetitions) === str) {
          // console.log(
          //   `${str} is invalid because ${substr} is repeated ${numOfRepetitions} times`
          // );
          return true;
        }
      }
      occurrences.add(substr);
    }
  }

  return false;
};

const findInvalidNumbersPart2 = (start: number, end: number): Array<number> => {
  const violations: Array<number> = [];
  for (let i = start; i <= end; i++) {
    if (isInvalidPart2(i)) {
      violations.push(i);
    }
  }
  return violations;
};

const part2 = data
  .split(",")
  .map((range) => range.split("-"))
  .reduce((acc, curr) => {
    const [start, end] = curr;

    const violations = findInvalidNumbersPart2(Number(start), Number(end));

    acc += sum(violations);

    return acc;
  }, 0);

// 1846555651037129 is too high

console.log(`Part 2: ${part2}`);

// const test = (str: number) => {
//   console.log(`test :: Validating string ${str} :::`);
//   isInvalidPart2(str);
// };

// test(11);
// test(99);
// test(111);
// test(1010);
