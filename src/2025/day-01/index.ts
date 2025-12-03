import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const data = realData;

console.log(`::: Part 1 :::`);

const part1 = data.split("\n").reduce(
  (acc, str) => {
    console.log(acc.zeros, acc.lastNum);
    const dir = str.slice(0, 1);
    const num = parseInt(str.slice(1));

    let newNum;

    if (dir === "L") {
      // Subtract, account for wrapping
      newNum = utils.trueMod(acc.lastNum - num, 100);
      acc.lastNum = newNum;
      acc.zeros += newNum === 0 ? 1 : 0;
    } else if (dir === "R") {
      // Add, account for wrapping
      newNum = utils.trueMod(acc.lastNum + num, 100);
      acc.lastNum = newNum;
      acc.zeros += newNum === 0 ? 1 : 0;
    }

    return acc;
  },
  { zeros: 0, lastNum: 50 }
);

console.log(`Part 1: ${part1.zeros}`);

console.log(`::: Part 2 :::`);

// Account for any rotation past 0

const part2 = data.split("\n").reduce(
  (acc, str) => {
    const dir = str.slice(0, 1);
    const { lastNum } = acc;
    const num = parseInt(str.slice(1));

    let unwrapped;
    let newNum;

    if (dir === "L") {
      // Subtract, account for wrapping
      unwrapped = lastNum - num;
      newNum = utils.trueMod(unwrapped, 100);
      acc.lastNum = newNum;
      // acc.zeros += newNum === 0 ? 1 : 0;
      // add any number of times that the dial spun past 0 but didn't end on 0
      const absNum = lastNum - num;
      const passingZero = Math.floor(Math.abs(absNum / 100));
      acc.zeros += passingZero;
    } else if (dir === "R") {
      // Add, account for wrapping
      unwrapped = lastNum + num;
      newNum = utils.trueMod(unwrapped, 100);
      acc.lastNum = newNum;
      // acc.zeros += newNum === 0 ? 1 : 0;
      // add any number of times that the dial spun past 0 but didn't end on 0
      const absNum = lastNum + num;
      const passingZero = Math.floor(absNum / 100);
      acc.zeros += passingZero;
    }

    if (lastNum > 0 && unwrapped <= 0) acc.zeros += 1;
    if (lastNum < 0 && unwrapped >= 0) acc.zeros += 1;

    return acc;
  },
  { zeros: 0, lastNum: 50 }
);

console.log(`Part 2: ${part2.zeros}`);
