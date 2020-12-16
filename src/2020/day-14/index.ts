import * as utils from "../utils";
const linesStrArr = utils.readFile("day-14/data.txt").split(/\r?\n/);

const convertToBase2 = (val: any) => Number(val).toString(2);

const mapLineToInstruction = (line: string, index: number) => {
  const [left, value] = line.split(" = ");
  if (left === "mask") {
    return { mask: value };
  }
  const res = /(mem)\[(\d+)\]/.exec(left);
  if (!res) {
    throw new Error(`line ${index} could not be parsed`);
  }
  const [_, type, location] = res;
  return {
    location: Number(location),
    value: convertToBase2(value),
  };
};

const instructions = linesStrArr.map(mapLineToInstruction);

type Mask = "X" | "0" | "1";
const mapBitToMask = (bit: string, mask: Mask) => {
  switch (mask) {
    case "X":
      return bit;
    case "1":
    case "0":
    default:
      return mask;
  }
};

export const mapBitToMaskPart2 = (bit: string, mask: Mask) => {
  switch (mask) {
    case "X":
      return mask;
    case "0":
      return bit;
    case "1":
      return mask;
  }
};

export const applyMaskToMemoryAddress = (
  mask: string,
  memAdd: number
): string => {
  const reverseMask = mask.split("").reverse();
  const reverseBase2Number = convertToBase2(memAdd)
    .padStart(reverseMask.length, "0")
    .split("")
    .reverse();
  const maskedNumber = reverseBase2Number.map((bit, index) =>
    mapBitToMaskPart2(bit, reverseMask[index] as Mask)
  );
  return maskedNumber.reverse().join("");
};

export const maskToFunc = (mask: string) => (base2Number: string): number => {
  const reverseMask = mask.split("").reverse();
  const reverseBase2Number = base2Number
    .padStart(reverseMask.length, "0")
    .split("")
    .reverse();
  const maskedNumber = reverseBase2Number.map((bit, index) =>
    mapBitToMask(bit, reverseMask[index] as Mask)
  );
  return parseInt(maskedNumber.reverse().join(""), 2);
};

const part1 = instructions.reduce((acc: any, curr) => {
  if (curr.mask) {
    return {
      ...acc,
      mask: curr.mask,
    };
  }
  if (curr.location) {
    return {
      ...acc,
      [curr.location]: maskToFunc(acc.mask)(curr.value),
    };
  }
  return acc;
}, {});

const part1Result = Object.entries(part1).reduce(
  (acc, [key, val]: any) => (key !== "mask" ? acc + val : acc),
  0
);

// console.log(result);
// console.log("Result :: part 1");
// console.log(part1Result);

export const getAllPermutations = (mask: string): string[] => {
  const reverseMask = mask.split("").reverse();
  const xIndexes = reverseMask
    .map((char, index) => ({ char, index }))
    .filter((obj) => obj.char === "X")
    .map((obj) => obj.index);

  // console.log(`There are ${xIndexes.length} Xs in the mask`);
  // console.log(mask);
  const permutations = new Array(Math.pow(2, xIndexes.length))
    .fill(null)
    .map((_, index) => index)
    .map((index) =>
      index.toString(2).padStart(xIndexes.length, "0").split("").reverse()
    )
    .map((revBinArr) => {
      const maskedPermutation = reverseMask.map((maskChar, maskIndex) => {
        if (maskChar !== "X") {
          return maskChar;
        }
        const replaceIndex = xIndexes.findIndex((x) => x === maskIndex);
        return revBinArr[replaceIndex];
      });
      return maskedPermutation.reverse().join("");
    });
  return permutations;
};

const part2 = instructions.reduce((acc: any, curr, instructionIndex) => {
  console.log(`Instruction ${instructionIndex} `);
  if (curr.mask) {
    return {
      ...acc,
      mask: curr.mask,
    };
  }
  if (curr.location) {
    // apply mask to mem location
    const memMask = applyMaskToMemoryAddress(acc.mask, curr.location);
    // console.log({ memMask, "acc.mask": acc.mask, curr });
    // get permutations of that mask
    const memAddresses = getAllPermutations(memMask);
    // build an object of all {[mem]: value};
    const memory = memAddresses.reduce(
      (memAcc, memCurr) => ({
        ...memAcc,
        [parseInt(memCurr, 2)]: parseInt(curr.value, 2),
      }),
      {}
    );

    // then merge with acc;
    return {
      ...acc,
      ...memory,
    };
  }
  return acc;
}, {});

console.log(part2);
const part2Result = Object.entries(part2).reduce(
  (acc, [key, val]: any) => (key !== "mask" ? acc + val : acc),
  0
);
console.log("Results :: Part 2");
console.log(part2Result);
