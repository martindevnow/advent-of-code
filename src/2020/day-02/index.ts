import * as utils from "../utils";

const data = utils
  .readFile("day-02/data.txt")
  .split(/\r?\n/)
  .filter((item) => item.trim() !== "")
  .map((line) => {
    const [range, letterWithColon, testCase] = line.split(" ");
    return {
      range: range.split("-").map((rangeNum) => +rangeNum),
      letter: letterWithColon[0],
      testCase,
    };
  });

const validPasswords = data
  // This was assuming the letters had to be consecutive
  // which technically the challenge did not specify
  // .filter((item) => {
  //   const minReqPatt = `(${item.letter}{${item.range[0]}})`;
  //   const minReqRegex = new RegExp(minReqPatt);

  //   const overMaxPatt = `(${item.letter}{${item.range[1] + 1}})`;
  //   const overMaxRegex = new RegExp(overMaxPatt);
  //   return minReqRegex.test(item.testCase) && !overMaxRegex.test(item.testCase);
  // });
  .filter(item => {
    const occurrances = item.testCase.split('').filter(letter => letter === item.letter).length;
    return occurrances >= item.range[0] && occurrances <= item.range[1];
  })
console.log(validPasswords.length);

const trulyValidPasswords = data.filter(item => {
  const matchingOccurrances = (item.testCase[item.range[0] - 1] === item.letter ? 1 : 0) + (item.testCase[item.range[1] - 1] === item.letter ? 1 : 0)
  return matchingOccurrances === 1;
})
console.log(trulyValidPasswords.length);
