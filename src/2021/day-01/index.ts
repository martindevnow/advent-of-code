import * as utils from "../utils";

const data = utils
  .readFile("day-01/data.txt") // read input data
  .split(/\r?\n/) // break up by line
  .map((item) => +item); // convert to numbers (not strings)

const isDeeper = (
  currentDepth: number | null,
  lastDepth: number | null
): boolean => {
  if (lastDepth === null || currentDepth === null) {
    return false;
  }
  return currentDepth > lastDepth;
};

interface Acc {
  lastDepth: null | number;
  increases: number;
}

const changes = data.reduce<Acc>(
  ({ lastDepth, increases }, currentDepth) => ({
    increases: increases + (isDeeper(currentDepth, lastDepth) ? 1 : 0),
    lastDepth: currentDepth,
  }),
  {
    lastDepth: null,
    increases: 0,
  }
);

const rollingAverageChanges = data
  .map((curr, index) =>
    index + 2 >= data.length ? null : curr + data[index + 1] + data[index + 2]
  )
  .filter((num) => num !== null)
  .reduce<Acc>(
    ({ lastDepth, increases }, currentDepth) => ({
      increases: increases + (isDeeper(currentDepth, lastDepth) ? 1 : 0),
      lastDepth: currentDepth,
    }),
    {
      lastDepth: null,
      increases: 0,
    }
  );

console.log("Question 1: " + changes.increases);
console.log("Question 2: " + rollingAverageChanges.increases);
