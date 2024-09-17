import * as utils from "../utils";
const data = utils.readFile("day-05/data.txt");

const getPair = (num, invert = false) => {
  const pair =
    String.fromCharCode(num + 64) + String.fromCharCode(num + 64 + 32);
  return !invert ? pair : pair.split("").reverse().join("");
};

// console.log(getPair(1), getPair(26))

const pairList = new Array(26 * 2).fill(null).map((_, index) => {
  return index <= 25 ? getPair(index + 1) : getPair(index - 25, true);
});
// console.log(pairList);

const removeCharacters = (str, charsToRemove, caseSensitive = true) => {
  console.log(`starting at ${str.length}`);
  const flags = caseSensitive ? "g" : "gi";

  const shortenedStr = charsToRemove.reduce((acc, pair) => {
    return acc.replace(new RegExp(pair, flags), "");
  }, str);
  console.log(`new length is ${shortenedStr.length}`);
  if (str.length > shortenedStr.length) {
    return removeCharacters(shortenedStr, charsToRemove);
  }
  return shortenedStr;
};
// removeCharacters(data, pairList)
const collapsedBasePoly = removeCharacters(data, pairList);
console.log("Part 1 answer", collapsedBasePoly.length);

const charList = new Array(26)
  .fill(null)
  .map((_, index) => String.fromCharCode(index + 1 + 64));

// const perLetter = charList.reduce((acc, lett) => {
//   const prunedStr = removeCharacters(collapsedBasePoly, [lett], false);
//   return { ...acc, [lett]: removeCharacters(prunedStr, pairList).length };
// }, {});

const perLetter = charList.map((lett) => {
  const prunedStr = removeCharacters(collapsedBasePoly, [lett], false);
  return removeCharacters(prunedStr, pairList).length;
});
console.log(perLetter);

const shortest = Math.min(...perLetter);

console.log(shortest); // 6890
