import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`;

const data = realData;

console.log(`::: Part 1 :::`);
// rules:
// 1. at least 3 vowels
// 2. at least one letter twice (aa, xx, etc)
// 3. no `ab`, `cd`, `pq`, or `xy`

const BAD = ["ab", "cd", "pq", "xy"];

const isNice = (str: string) => {
  if (BAD.find((bad) => str.includes(bad))) {
    // console.log(`str: ${str} has a bad combo`);
    return false;
  }

  const vowels = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0,
  };
  let duplicate = false;

  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case "a":
      case "e":
      case "i":
      case "o":
      case "u":
        vowels[str[i]]++;
      default:
        // console.log(`Comparing '${str[i - 1]}' to '${str[i]}'`);
        if (i > 0 && str[i - 1] === str[i]) duplicate = true;
    }
  }

  if (!duplicate) {
    // console.log(`Str: ${str} has no duplicates`);
    return false;
  }

  if (Object.values(vowels).reduce((acc, curr) => acc + curr, 0) < 3) {
    // console.log(`str: ${str} has less than 3 vowels`);
    return false;
  }
  return true;
};

const areNice = data
  .split("\n")
  // .slice(0, 10)
  .filter((str) => isNice(str));

// 154 is too low
// 253 too low
console.log(`Part 1: Nice strings: ${areNice.length}`);

console.log(`::: Part 2 :::`);

const isNiceV2 = (str: string) => {
  const hash = new Map<string, Array<number>>();
  let duplicate = false;

  for (let i = 0; i < str.length; i++) {
    // console.log(`Comparing '${str[i - 1]}' to '${str[i]}'`);
    if (i > 0) {
      const substr = `${str[i - 1]}${str[i]}`;

      const existing = hash.get(substr) ?? [];
      existing.push(i - 1);

      hash.set(substr, existing);
    }
    if (i > 1 && str[i - 2] === str[i]) duplicate = true;
  }

  let hasDuplicatePair = false;
  const pairs = Array.from(hash.values());

  for (let i = 0; i < pairs.length; i++) {
    const pairLocations = pairs[i];
    if (pairLocations.length <= 1) continue;

    if (pairLocations[pairLocations.length - 1] > pairLocations[0] + 1) {
      hasDuplicatePair = true;
    }
  }

  if (!duplicate) {
    // console.log(`Str: ${str} has no duplicates`);
    return false;
  }

  if (!hasDuplicatePair) {
    // console.log(`Str ${str} has no duplicate pair that doesn't overlap`);
    return false;
  }

  console.log(`Str ${str} is valid`);
  return true;
};

const areNicePart2 = data
  .split("\n")
  // .slice(0, 10)
  .filter((str) => isNiceV2(str));
// 412 is too high
console.log(`Part 2: ${areNicePart2.length}`);
