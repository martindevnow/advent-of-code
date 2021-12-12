import * as utils from "../utils";

const actionToX = (action: string) => {
  switch (action) {
    case "forward":
      return 1;
    case "backward":
      return -1;
    default:
      return 0;
  }
};

const actionToY = (action: string) => {
  switch (action) {
    case "down":
      return 1;
    case "up":
      return -1;
    default:
      return 0;
  }
};

const data = utils
  .readFile("day-02/data.txt") // read input data
  .split(/\r?\n/) // break up by line
  .map((item) => item.split(" ")) // ex: 'forward 5'
  .map(([action, amount]) => ({ action, amount: +amount })); // convert to numbers (not strings)

console.log("Confirm Data Format :: ", { rows: data.slice(0, 2) });
// console.log(data);

interface Acc {
  x: number;
  y: number;
}

const changes = data.reduce<Acc>(
  ({ x, y }, { action, amount }) => ({
    x: x + actionToX(action) * amount,
    y: y + actionToY(action) * amount,
  }),
  {
    x: 0,
    y: 0,
  }
);
console.log({ changes });

console.log("Question 1: " + changes.x * changes.y);

const actionToAim = (action: string) => {
  switch (action) {
    case "up":
      return -1;
    case "down":
      return 1;
    case "forward":
    default:
      return 0;
  }
};

const actionToYPart2 = (action: string, aim: number) => {
  switch (action) {
    case "forward":
      return aim;
    default:
      return 0;
  }
};

interface Acc2 {
  x: number;
  y: number;
  aim: number;
}

const changes2 = data.reduce<Acc2>(
  ({ x, y, aim }, { action, amount }) => ({
    x: x + actionToX(action) * amount,
    y: y + actionToYPart2(action, aim) * amount,
    aim: aim + actionToAim(action) * amount,
  }),
  {
    x: 0,
    y: 0,
    aim: 0,
  }
);

console.log("Question 2: " + changes2.x * changes2.y);
