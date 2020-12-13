import * as utils from "../../utils";
// const data = utils.readFile('../day-01/data.txt').split(/\r?\n/);

const convertstrToInt = (str) => {
  if (str.toString().charAt(0) === "-") {
    return parseInt(str.substring(1)) * -1;
  }
  return parseInt(str.substring(1));
};

const findFinalFrequency = (acc, curr) => {
  const num = convertstrToInt(curr);
  return acc + num;
};

const findFirstRepeatingFrequency = (acc, curr) => {
  // acc = { done: false, freq: #, prev: [123, 40, -4, 10 ...] }
  // If done, exit
  if (acc.done === true) {
    return acc;
  }

  // Get the adjustment
  const num = convertstrToInt(curr);

  // Get the current frequency
  acc.freq = acc.freq + num;

  // Check if this has been hit before
  if (acc.prev.includes(acc.freq)) {
    // Set to done
    acc.done = true;
    return acc;
  }
  // Log it
  acc.prev.push(acc.freq);
  return acc;
};

const data = utils.readFile("../day-01/data.txt").split(/\r?\n/);

const answerPart1 = data.reduce(findFinalFrequency, 0);
console.log(answerPart1); // 400

let answerPart2 = data.reduce(findFirstRepeatingFrequency, {
  done: false,
  freq: 0,
  prev: [],
});

while (answerPart2.done === false) {
  answerPart2 = data.reduce(findFirstRepeatingFrequency, answerPart2);
}
console.log(answerPart2.freq, answerPart2.done); // 232 - true
