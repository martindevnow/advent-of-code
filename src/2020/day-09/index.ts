import * as utils from "../utils";
const data = utils.readFile("day-09/data.txt");
const inputNumbers = data.split(/\r?\n/).map((inputNum) => +inputNum);

const getAllSums = (numArr: number[]) => {
  return numArr.reduce((acc: number[], num, index) => {
    const sums = numArr.slice(index + 1).map((secondNum) => secondNum + num);
    return [...acc, ...sums];
  }, []);
};

const error = inputNumbers.find((num, index) => {
  if (index < 25) {
    return false;
  }

  const sums = getAllSums(inputNumbers.slice(index - 25, index));
  return !sums.includes(num);
});

console.log(getAllSums([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(error);

const TARGET = 776203571;

const getClosestSetUpToIndex = (
  numbers: number[],
  target: number
): number[] | undefined => {
  // Reverse because we want the "latest" numbers in the set to reach the target
  const reversed = numbers.reverse();

  // slowly build the set of number, in reverse order
  const theSet: number[] = [];
  for (let i = 0; i < numbers.length; i++) {
    // add the number to the set
    theSet.push(reversed[i]);

    // check sum
    const theSum = sum(theSet);

    // if the sum is exact, return the set
    if (theSum === target) {
      return theSet;
    }

    if (theSum > target) {
      return undefined;
    }
  }
  return undefined;
};

const sum = (nums: number[]) => nums.reduce((acc, curr) => acc + curr, 0);

const { theSet: theFoundSet } = inputNumbers.reduce(
  (carry: { found: boolean; theSet: number[] }, _num, index) => {
    // Return if done
    if (carry.found) {
      return carry;
    }

    // get sum of previous numbers
    const newSet = inputNumbers.slice(0, index + 1);
    const foundSet = getClosestSetUpToIndex(newSet, TARGET);

    return !foundSet ? carry : { found: true, theSet: foundSet };
  },
  { found: false, theSet: [] }
);

console.log(theFoundSet.sort());
console.log(theFoundSet[0] + theFoundSet[theFoundSet.length - 1]);
