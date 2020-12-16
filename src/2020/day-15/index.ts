import * as utils from "../utils";
const numbers = utils
  .readFile("day-15/data.txt")
  .trim()
  .split(",")
  .map((num) => Number(num));

console.log(numbers);

const startingNums = numbers.length;
const mem: { [numSpoken: number]: { lastIndex: number; lastGap: number } } = {};
let lastNum = 0;
const LIMIT = 30000000;
for (let i = 1; i <= LIMIT; i++) {
  let thisNum: number;

  if (i <= startingNums) {
    thisNum = numbers[i - 1];
    mem[thisNum] = { lastIndex: i, lastGap: 0 };
    lastNum = thisNum;
    console.log(`Iteration #${i} :: ${thisNum}`);
    continue;
  }

  thisNum = mem[lastNum].lastGap;
  mem[thisNum] = {
    lastIndex: i,
    lastGap: mem[thisNum]?.lastIndex ? i - mem[thisNum]?.lastIndex : 0,
  };
  lastNum = thisNum;
  // console.log(`Iteration #${i} :: ${thisNum}`);
}

console.log(`After iteration ${LIMIT}, the lastNum was ${lastNum}`);
// After iteration 30000000, the lastNum was 3745954
// Done in 404.42s.
