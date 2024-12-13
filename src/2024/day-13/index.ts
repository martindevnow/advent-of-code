import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

console.log(`::: Part 1 :::`);

const COST = { A: 3, B: 1 };
const MAX_PRESSES = 100;
let fewest_tokens_for_all_prizes;

interface Game {
  aX: number;
  aY: number;
  bX: number;
  bY: number;
  pX: number;
  pY: number;
}

interface SolvedGame extends Game {
  a: number;
  b: number;
  tokens: number;
}

const gameRegex =
  /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/;

const data = realData;
const games: Array<Game> = data
  .split("\n\n")
  .map((game) => {
    const match = game.match(gameRegex);
    if (!match) return;
    const [, aX, aY, bX, bY, pX, pY] = Array.from(match).map(Number);
    return {
      aX: Number(aX),
      aY: Number(aY),
      bX: Number(bX),
      bY: Number(bY),
      // pX: Number(pX),
      // pY: Number(pY),
      pX: Number(pX) + 10000000000000,
      pY: Number(pY) + 10000000000000,
    };
  })
  .filter(Boolean) as Array<Game>;

const findMinPresses = (game: Game) => {
  const { aX, aY, bX, bY, pX, pY } = game;
  // a * aX + b * bX = pX;
  // a * aY + b * bY = pY;
  // pX is known and pY is known
  // solve for a
  // a = (pX - b* bX)/aX
  // a = (pY - b* bY)/aY
  // ((pX - b* bX)/aX) = ((pY - b* bY)/aY)
  //
  const b: number = (aX * pY - aY * pX) / (aX * bY - aY * bX);
  const remainderB: number = (aX * pY - aY * pX) % (aX * bY - aY * bX);
  if (remainderB !== 0) return null;

  const a: number = (pX - b * bX) / aX;
  const remainderA: number = (pX - b * bX) % aX;
  if (remainderA !== 0) return null;

  const tokens = a * Number(COST.A) + b * Number(COST.B);
  return { ...game, a, b, tokens };
};

const solvedGames = games.map((game) => findMinPresses(game)).filter(Boolean);
const total = solvedGames.reduce((acc, curr) => {
  // console.log({ tokens: curr!.tokens });
  if (curr!.tokens <= 0) return acc;
  return acc + curr!.tokens;
}, 0);

console.log(`Part 1: ${total}`); // 35997

console.log(`::: Part 2 :::`);

// 1104244113263775200 is incorrect
// 1117793158913201800 is incorrect
// 431730461811288737 is incorrect
// 702692423639118984 is incorrect
// 399270663556802675 ... waiting to see...
// 359970000000000000 is incorrect
// 82510994362072 is ...
// 9007199254740991  is max safe integer
console.log(`Part 2: ${{}}`);

// console.log(10n / 3n);
// console.log(10n % 3n);
