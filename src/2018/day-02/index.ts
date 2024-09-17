import * as utils from "../utils";
const data = utils.readFile("day-02/data.txt").split(/\r?\n/);
// .slice(0, 10);

const getCountOfLetters = (str) => {
  const expl = str.split("");
  return expl.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
      return acc;
    }
    acc[curr] = 1;
    return acc;
  }, {});
};

console.log("abacac", getCountOfLetters("abacac")); // { a: 3, b: 1, c: 2 }
// console.log('fzostwblnqkhpuzxirnevmaycq', getCountOfLetters('fzostwblnqkhpuzxirnevmaycq')); // { a: 3, b: 1, c: 2 }

const answerPart1 = data.reduce(
  (acc, curr) => {
    const expl = getCountOfLetters(curr);
    const hasTwos = Object.keys(expl).some((key) => expl[key] === 2);
    const hasThrees = Object.keys(expl).some((key) => expl[key] === 3);

    acc.twos += hasTwos ? 1 : 0;
    acc.threes += hasThrees ? 1 : 0;
    return acc;
  },
  { twos: 0, threes: 0 }
);

console.log(
  "The Answer to Part 1",
  answerPart1["twos"] * answerPart1["threes"]
);

// Part 2
const sum = (acc, curr) => acc + curr;

const isOffByOne = (str1, str2) => {
  const numDiff = [...str1]
    .map((lett, index) => {
      if (str2.charAt(index) === lett) {
        return 0;
      }
      return 1;
    })
    .reduce(sum, 0);
  if (numDiff === 1) {
    return true;
  }
  return false;
};

const findDiffCharacterIndex = (str1, str2) => {
  return [...str1].findIndex((lett, index) => lett !== str2.charAt(index));
};

console.log(isOffByOne("abcdef", "abcdef")); // false
console.log(isOffByOne("abczzf", "abcdef")); // false
console.log(findDiffCharacterIndex("abczef", "abcdef")); // true
console.log(isOffByOne("zbcdez", "abcdef")); // false

const answerPart2 = data.filter((str, index) => {
  const hasCloseMatch = data.some((comp) => isOffByOne(str, comp));
  return hasCloseMatch;
});

const indexToRemove = findDiffCharacterIndex(answerPart2[0], answerPart2[1]);

let final = answerPart2[0].split("");
final.splice(indexToRemove, 1);
let answer = final.join("");
console.log("The Answer to Part 2", answer);
