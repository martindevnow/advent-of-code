import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `029A
980A
179A
456A
379A`;

const data = realData;

const lines = data.split("\n");

// Keypad definitions
const numericKeypad: Record<string, [number, number]> = {
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

const directionKeypad: Record<string, [number, number]> = {
  "^": [0, 1],
  A: [0, 2],
  "<": [1, 0],
  v: [1, 1],
  ">": [1, 2],
};

const dd: Record<string, [number, number]> = {
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
  "^": [-1, 0],
};

// Function to get combinations of moves
function* getCombos(
  ca: string,
  a: number,
  cb: string,
  b: number
): Generator<string> {
  const total = a + b;
  const indices = Array.from({ length: total }, (_, i) => i);

  const combinations = (arr: number[], r: number): number[][] => {
    if (r === 0) return [[]];
    if (arr.length === 0) return [];
    const [head, ...tail] = arr;
    return [
      ...combinations(tail, r - 1).map((combo) => [head, ...combo]),
      ...combinations(tail, r),
    ];
  };

  for (const idxs of combinations(indices, a)) {
    const res = Array(total).fill(cb);
    for (const i of idxs) {
      res[i] = ca;
    }
    yield res.join("");
  }
}

// console.log(Array.from(getCombos("v", 2, ">", 2)));
// console.log(Array.from(getCombos("v", 2, ">", 0)));

// Cache utility
const cache = new Map<string, any>();

function cached(fn: (...args: any[]) => any): (...args: any[]) => any {
  return (...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Function to generate possible ways
const generateWays = cached(
  (a: string, b: string, isDirectionKeypad: boolean): string[] => {
    const keypad = isDirectionKeypad ? directionKeypad : numericKeypad;

    const curLoc = keypad[a];
    const nextLoc = keypad[b];
    const di = nextLoc[0] - curLoc[0];
    const dj = nextLoc[1] - curLoc[1];

    const moves: [string, number][] = [];
    if (di > 0) moves.push(["v", di]);
    else moves.push(["^", -di]);
    if (dj > 0) moves.push([">", dj]);
    else moves.push(["<", -dj]);

    const rawCombos = Array.from(
      new Set(
        [...getCombos(moves[0][0], moves[0][1], moves[1][0], moves[1][1])].map(
          (x) => x + "A"
        )
      )
    );

    const combos: string[] = [];
    for (const combo of rawCombos) {
      let [ci, cj] = curLoc;
      let valid = true;

      for (const step of combo.slice(0, -1)) {
        const [di, dj] = dd[step];
        ci += di;
        cj += dj;
        if (!Object.values(keypad).some(([ki, kj]) => ki === ci && kj === cj)) {
          valid = false;
          break;
        }
      }

      if (valid) combos.push(combo);
    }

    return combos;
  }
);

// Function to calculate the cost of moving between keys
const getCost = cached(
  (
    a: string,
    b: string,
    isDirectionKeypad: boolean,
    depth: number = 0
  ): number => {
    if (depth === 0) {
      return Math.min(
        ...generateWays(a, b, isDirectionKeypad).map((x) => x.length)
      );
    }

    const ways = generateWays(a, b, isDirectionKeypad);
    let bestCost = Number.MAX_SAFE_INTEGER;

    for (const seq of ways) {
      const extendedSeq = "A" + seq;
      let cost = 0;

      for (let i = 0; i < extendedSeq.length - 1; i++) {
        const from = extendedSeq[i];
        const to = extendedSeq[i + 1];
        cost += getCost(from, to, true, depth - 1);
      }

      bestCost = Math.min(bestCost, cost);
    }

    return bestCost;
  }
);

// Function to calculate the cost of a code
function getCodeCost(code: string, depth: number): number {
  const extendedCode = "A" + code;
  let cost = 0;

  for (let i = 0; i < extendedCode.length - 1; i++) {
    const from = extendedCode[i];
    const to = extendedCode[i + 1];
    cost += getCost(from, to, false, depth);
  }

  return cost;
}

console.log(`::: Part 1 :::`);

// Main computation
let part1 = 0;
for (const line of lines) {
  part1 += getCodeCost(line, 2) * parseInt(line.slice(0, -1), 10);
}

console.log(`Part 1: ${part1}`);

console.log(`::: Part 2 :::`);

// Main computation
let part2 = 0;
for (const line of lines) {
  part2 += getCodeCost(line, 25) * parseInt(line.slice(0, -1), 10);
}

console.log(`Part 2: ${part2}`);
