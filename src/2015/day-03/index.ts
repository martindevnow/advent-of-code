import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = ``;
const data = realData;

console.log(`::: Part 1 :::`);

let visited = new Set();
let x = 0,
  y = 0;

visited.add(`${y},${x}`);

for (let i = 0; i < data.length; i++) {
  const move = data.charAt(i);
  switch (move) {
    case "^":
      y--;
      break;
    case "v":
      y++;
      break;
    case "<":
      x--;
      break;
    case ">":
      x++;
      break;
  }
  visited.add(`${y},${x}`);
}

// 2080 too low
console.log(`Part 1: Unique houses: ${visited.size}`);

console.log(`::: Part 2 :::`);

let x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 0;
let visited2 = new Set();
visited2.add(`${y1},${x1}`);

for (let i = 0; i < data.length; i++) {
  const move = data.charAt(i);
  switch (move) {
    case "^":
      if (i % 2 === 0) y1--;
      else y2--;
      break;
    case "v":
      if (i % 2 === 0) y1++;
      else y2++;
      break;
    case "<":
      if (i % 2 === 0) x1--;
      else x2--;
      break;
    case ">":
      if (i % 2 === 0) x1++;
      else x2++;
      break;
  }
  visited2.add(`${y1},${x1}`);
  visited2.add(`${y2},${x2}`);
}
console.log(`Part 2: ${visited2.size}`);
