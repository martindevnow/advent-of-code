import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const data = realData;

console.log(`::: Part 1 :::`);

function canBeMadeFromSubstrings(str: string, substrings: string[]): boolean {
  // This function will recursively try to match the substrings from the start of the string
  function backtrack(remainingStr: string): boolean {
    // If the remaining string is empty, we've successfully matched the entire string
    if (remainingStr.length === 0) {
      return true;
    }

    // Try each substring to see if it can match the beginning of the remaining string
    for (let sub of substrings) {
      if (remainingStr.startsWith(sub)) {
        // If the substring matches, remove it and check the remaining string
        const nextRemainingStr = remainingStr.substring(sub.length);
        if (backtrack(nextRemainingStr)) {
          return true; // If we can match the remaining string, return true
        }
      }
    }

    // If no valid match was found, return false
    return false;
  }

  // Start the backtracking process from the full string
  return backtrack(str);
}

const [substrStr, inputStr] = data.split("\n\n");
const substrings = substrStr.split(", ");
const inputs = inputStr.split("\n");

const areValid = inputs.filter((str) => {
  const isValid = canBeMadeFromSubstrings(str, substrings);
  if (isValid) console.log(`${str} is valid`);
  if (!isValid) console.log(`${str} is NOT valid`);
  return isValid;
});

console.log(`Part 1: ${areValid.length}`);

console.log(`::: Part 2 :::`);

function countVariations(
  str: string,
  substrings: string[],
  memo: Record<string, number>
): number {
  // If the string is empty, there's exactly one way to construct it (by doing nothing)
  if (str.length === 0) {
    return 1;
  }

  // Check if we've already computed the number of ways for this substring
  if (memo[str] !== undefined) {
    return memo[str];
  }

  // Initialize the count of variations to 0
  let totalVariations = 0;

  // Try matching each substring at the beginning of the string
  for (let sub of substrings) {
    if (str.startsWith(sub)) {
      // If a match is found, recursively count the variations for the remaining string
      const remainingStr = str.substring(sub.length);
      totalVariations += countVariations(remainingStr, substrings, memo);
    }
  }

  // Memoize the result for the current substring
  memo[str] = totalVariations;

  return totalVariations;
}

// const [substrStr, inputStr] = data.split("\n\n");
// const substrings = substrStr.split(", ");
// const inputs = inputStr.split("\n");

const countValid = inputs.map((str) => {
  const num = countVariations(str, substrings, {} as Record<string, number>);
  return num;
});
const total = countValid.reduce((acc, curr) => curr + acc, 0);

console.log(`Part 2: ${total}`);
