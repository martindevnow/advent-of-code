import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `029A
980A
179A
456A
379A`;

const data = realData;

console.log(`::: Part 1 :::`);

const keyLocations: Record<string, [number, number]> = {
  "7": [0, 0],
  "8": [0, 1],
  "9": [0, 2],
  "4": [1, 0],
  "5": [1, 1],
  "6": [1, 2],
  "1": [2, 0],
  "2": [2, 1],
  "3": [2, 2],
  "0": [3, 1],
  A: [3, 2],
};

const moveLocations: Record<string, [number, number]> = {
  "^": [0, 1],
  A: [0, 2],
  "<": [1, 0],
  v: [1, 1],
  ">": [1, 2],
};

// Memoize costs of movements between keys
const dp: Record<string, number> = {};

const getDistance = (
  pos1: [number, number],
  pos2: [number, number]
): number => {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
};

const calculateMinCost = (
  sequence: string,
  currentPos: [number, number]
): number => {
  if (sequence.length === 0) return 0; // No cost if no keys left

  const key = `${currentPos}-${sequence}`;
  if (dp[key] !== undefined) return dp[key];

  const nextKey = sequence[0];
  const nextPos = keyLocations[nextKey];

  // Movement cost + button press cost (always +1 for pressing)
  const moveCost = getDistance(currentPos, nextPos) + 1;

  // Recursively calculate for the rest of the sequence
  const remainingCost = calculateMinCost(sequence.slice(1), nextPos);

  dp[key] = moveCost + remainingCost;
  return dp[key];
};

const results = data.split("\n").map((line) => {
  const cleanedLine = line.trim();
  const initialPos: [number, number] = [3, 2]; // Starting at "A"
  const cost = calculateMinCost(cleanedLine, initialPos);

  const num = +cleanedLine.replaceAll("A", ""); // Numeric value of the sequence
  console.log(`Cost: ${cost}, Multiplier: ${num}`);
  return cost * num;
});

const sum = results.reduce((acc, curr) => acc + curr, 0);

console.log(`Part 1: ${sum}`);

// Placeholder for Part 2
console.log(`::: Part 2 :::`);
console.log(`Part 2: TBD`);
