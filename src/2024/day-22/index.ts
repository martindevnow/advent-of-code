import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `1
2
3
2024`;

const testData2 = `123`;

const data = realData;

console.log(`::: Part 1 :::`);

const mix = (given: number, secret: number) => {
  return (given ^ secret) >>> 0;
};

const prune = (num: number) => num % 16777216;

const step1 = (secret: number) => prune(mix(secret * 64, secret));
const step2 = (secret: number) => prune(mix(Math.floor(secret / 32), secret));
const step3 = (secret: number) => prune(mix(secret * 2048, secret));

const getNext = (secret: number) => step3(step2(step1(secret)));

const agents = data
  .split("\n")
  .map(Number)
  .map((num) => {
    let secret = num;
    for (let i = 0; i < 2000; i++) {
      // console.log(`Secret: ${secret}`);
      secret = getNext(secret);
    }
    return secret;
  });

const sums = agents.reduce((acc, curr) => acc + curr, 0);
// console.log(agents);

console.log(`Part 1: ${sums}`);

console.log(`::: Part 2 :::`);

console.log(`Part 2: ${{}}`);

// moving pointer to track 4 step sequence
// build hashmap for each buyer with value as key and sequences as a set
// after building all hash maps, ...

const agentsPrices = data
  .split("\n")
  .map(Number)
  .map((num) => {
    let secret = num;
    let prices = [secret];

    for (let i = 0; i < 2000; i++) {
      // console.log(`Secret: ${secret}`);
      secret = getNext(secret);
      prices.push(secret);
    }
    return prices;
  });

const negotiate = agentsPrices.map((agent) => {
  return agent.reduce(
    (acc, sellPrice, i) => {
      const onesDigit = sellPrice % 10;
      if (i === 0) return { ...acc, prev: onesDigit };

      let delta = onesDigit - acc.prev!;
      acc.past4.push(delta);

      if (acc.past4.length === 4) {
        // add to hashmap
        const key = acc.past4.join(",");
        if (!acc.hash.has(key)) {
          acc.hash.set(key, onesDigit);
        }
        acc.past4.shift();
      }

      // console.log(
      //   `i: ${i}, prev: ${acc.prev}, curr: ${sellPrice} (${onesDigit}), delta: ${delta}`
      // );
      return { ...acc, prev: onesDigit };
    },
    { prev: null, past4: [], hash: new Map() } as {
      prev: number | null;
      past4: Array<number>;
      hash: Map<string, number>;
    }
  );
});

// console.log(negotiate[0]);

// try to optimize for value across all buyers and each value
// not sure how to maximize value
// total number of sequences is -9 to 9 for each digit (19^4) (130,000)
// check each possible to maximize return
// max max is 9 each..
let max = 0;
let magicSequence = "";
let vals = [] as number[];

for (let a = -9; a < 10; a++) {
  for (let b = -9; b < 10; b++) {
    for (let c = -9; c < 10; c++) {
      for (let d = -9; d < 10; d++) {
        const key = [a, b, c, d].join(",");
        // console.log(`searching for ${key}`);

        // check each agent to see if they have this sequence
        const value = negotiate.reduce(
          (acc, agent) => {
            const valueOfSequence = agent.hash.get(key) ?? 0;
            acc.agentVal.push(valueOfSequence);
            return {
              total: acc.total + valueOfSequence,
              agentVal: acc.agentVal,
            };
          },
          { total: 0, agentVal: [] } as {
            total: number;
            agentVal: Array<number>;
          }
        );

        if (value.total > max) {
          max = value.total;
          magicSequence = key;
          vals = value.agentVal;
        }
      }
    }
  }
}

console.log({ max, magicSequence, vals });

// const key = [-2, 1, -1, 3].join(",");
// // console.log(`searching for ${key}`);

// // check each agent to see if they have this sequence
// const value = negotiate.reduce(
//   (acc, agent) => {
//     const valueOfSequence = agent.hash.get(key) ?? 0;
//     acc.agentVal.push(valueOfSequence);
//     return {
//       total: acc.total + valueOfSequence,
//       agentVal: acc.agentVal,
//     };
//   },
//   { total: 0, agentVal: [] } as {
//     total: number;
//     agentVal: Array<number>;
//   }
// );

// console.log({ value });
