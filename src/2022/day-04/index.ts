import * as utils from "../utils";

const data = utils
  .readFile("day-04/data.txt") // read input data
  .split(/\n/);

// console.log(JSON.stringify(data, null, 2));

const formatted = data.map((line) =>
  line
    .split(",")
    .map((leftOrRight) => leftOrRight.split("-").map((str) => +str))
);

const parts = formatted.filter(([left, right]) => {
  return (
    (left[0] <= right[0] && left[1] >= right[1]) ||
    (right[0] <= left[0] && right[1] >= left[1])
  );
});
console.log(parts.length);

// part2

const part2 = formatted.filter(
  ([[leftStart, leftEnd], [rightStart, rightEnd]]) => {
    if (leftStart < rightStart && leftEnd < rightStart) {
      return false;
    }

    if (rightStart < leftStart && rightEnd < leftStart) {
      return false;
    }
    return true;
  }
);
console.log(part2.length);
