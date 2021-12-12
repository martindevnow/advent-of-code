import * as utils from "../utils";

const data = utils
  .readFile("day-03/data.txt") // read input data
  .split(/\r?\n/) // break up by line
  .map((item) => item.split("")) // ex: 'forward 5'
  .map((numArr) => numArr.map((num) => +num)); // convert to numbers (not strings)

console.log("Confirm Data Format :: ", { rows: data.slice(0, 2) });
const placeholder: Array<number | null> = new Array(data[0].length).fill(null);

const gamma = placeholder.map<number>((_, i) => {
  return data.reduce((acc, numArr) => acc + numArr[i], 0) > data.length / 2
    ? 1
    : 0;
});
const epsi = gamma.map((num) => (num === 1 ? 0 : 1));

const gammaStr = gamma.join("");
const epsiStr = epsi.join("");

const gammaB10 = parseInt(gammaStr, 2);
const epsiB10 = parseInt(epsiStr, 2);

console.log(gammaStr + ": " + gammaB10);
console.log(epsiStr + ": " + epsiB10);

console.log("Question 1: " + epsiB10 * gammaB10);

const findMostCommonBit = (matrix: number[][], index: number) =>
  matrix.reduce((acc, numArr) => acc + numArr[index], 0) >= matrix.length / 2
    ? 1
    : 0;

const getOxygen = (seed: number[][]) => {
  let clone = [...seed];

  const placeholder: Array<number | null> = new Array(clone[0].length).fill(
    null
  );

  const oxygen = placeholder.map<number>((_, i) => {
    if (clone.length === 1) {
      return clone[0][i];
    }
    const currentBit = findMostCommonBit(clone, i); // find MOST common bit
    clone = clone.filter((numArr) => numArr[i] === currentBit); // remove non-matching arrays
    return currentBit;
  });

  return oxygen;
};

const getCO2 = (seed: number[][]) => {
  let clone = [...seed];

  const placeholder: Array<number | null> = new Array(clone[0].length).fill(
    null
  );

  const co2 = placeholder.map<number>((_, i) => {
    if (clone.length === 1) {
      return clone[0][i];
    }
    const currentBit = 1 - findMostCommonBit(clone, i); // find LEAST common bit
    clone = clone.filter((numArr) => numArr[i] === currentBit); // remove non-matching arrays
    return currentBit;
  });

  return co2;
};

const oxygen = getOxygen(data);

const co2 = getCO2(data);

console.log({ oxygen, co2 });

const oxygenStr = oxygen.join("");
const co2Str = co2.join("");

const oxygenB10 = parseInt(oxygenStr, 2);
const co2B10 = parseInt(co2Str, 2);

console.log(oxygenStr + ": " + oxygenB10);
console.log(co2Str + ": " + co2B10);

console.log("Question 1: " + co2B10 * oxygenB10);
