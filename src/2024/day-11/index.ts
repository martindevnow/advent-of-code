import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt"); // read input data

const testData = `125 17`;

console.log(`::: Part 1 :::`);

const blink = (input: number): Array<number> => {
  if (input === 0) return [1];
  if (`${input}`.length % 2 === 0)
    return [
      +`${input}`.slice(0, `${input}`.length / 2),
      +`${input}`.slice(`${input}`.length / 2),
    ];
  return [input * 2024];
};

// console.log(blink(0));
// console.log(blink(1));
// console.log(blink(10));
// console.log(blink(125));

const data = realData.split(" ").map(Number);

let res: Array<number> = data;

for (let i = 0; i < 25; i++) {
  res = res.flatMap((num) => blink(num));
}
console.log(`Part 1: ${res.length}`);

console.log(`::: Part 2 :::`);

const countStones = (initial: Array<number>, blinks: number) => {
  let frequency: { [stoneVal: string]: number } = {};
  for (let stone of initial) {
    frequency[stone] = (frequency[stone] || 0) + 1;
  }

  for (let i = 0; i < blinks; i++) {
    let blinkResult: { [stoneVal: string]: number } = {};

    for (let stoneStr in frequency) {
      const quantity = frequency[stoneStr];
      const stoneVal = Number(stoneStr);

      if (stoneVal === 0) {
        blinkResult[1] = (blinkResult[1] || 0) + quantity;
      } else if (stoneStr.length % 2 === 0) {
        const mid = Math.floor(stoneStr.length / 2);
        const left = parseInt(stoneStr.slice(0, mid), 10);
        const right = parseInt(stoneStr.slice(mid), 10);

        blinkResult[left] = (blinkResult[left] || 0) + quantity;
        blinkResult[right] = (blinkResult[right] || 0) + quantity;
      } else {
        // Rule 3: Multiply by 2024
        let multiplied = stoneVal * 2024;
        blinkResult[multiplied] = (blinkResult[multiplied] || 0) + quantity;
      }
    }

    frequency = blinkResult;
  }
  return Object.values(frequency).reduce((acc, curr) => acc + curr, 0);
};

const part2StoneCount = countStones(data, 75);

console.log(`Part 2: ${part2StoneCount}`);
