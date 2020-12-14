import * as utils from "../utils";
const data = utils.readFile("day-10/data.txt");
const inputNumbers = data
  .split(/\r?\n/)
  .map((inputNum) => +inputNum)
  .sort((a, b) => a - b);

const differences = inputNumbers.map((num, index) =>
  index === 0 ? num : num - inputNumbers[index - 1]
);
// Device is 3 jolts higher that higest adapter (so, 3 jolt diff)
differences.push(3);

// console.log(inputNumbers.slice(0, 10));
// console.log(differences.slice(0, 10));

const threes = differences.filter((diff) => diff === 3).length;
const twos = differences.filter((diff) => diff === 2).length;
const ones = differences.filter((diff) => diff === 1).length;

// console.log({ ones, twos, threes });
console.log("Result :: Part 1");
console.log(ones * threes);

// part 2

const differencesObjs = [
  { num: 0, ways: 0 },
  ...inputNumbers.map((num) => ({
    num,
    ways: 0,
  })),
];

differencesObjs.forEach(({ num }, index) => {
  if (index === 0) {
    differencesObjs[index].ways = 1;
    return;
  }

  const prev = differencesObjs[index - 1];
  const isCloseToPrev = num - prev.num <= 3 ? prev.ways : 0;
  if (index === 1) {
    differencesObjs[index].ways = isCloseToPrev;
    return;
  }

  const twoPrev = differencesObjs[index - 2];
  const isCloseToTwoPrev = num - twoPrev.num <= 3 ? twoPrev.ways : 0;
  if (index === 2) {
    differencesObjs[index].ways = isCloseToPrev + isCloseToTwoPrev;
    return;
  }

  const threePrev = differencesObjs[index - 3];
  const isCloseToThreePrev = num - threePrev.num <= 3 ? threePrev.ways : 0;
  differencesObjs[index].ways =
    isCloseToPrev + isCloseToTwoPrev + isCloseToThreePrev;
});

// console.log(differencesObjs);
console.log("Result :: Part 2");
console.log(differencesObjs[differencesObjs.length - 1]);
