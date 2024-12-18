import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = ``;

const data = realData;

console.log(`::: Part 1 :::`);

const up = data.split("").filter((char) => char === "(").length;
const down = data.split("").filter((char) => char === ")").length;

console.log(`Part 1: Floor: ${up - down}`);

console.log(`::: Part 2 :::`);

let floor = 0;
let i = 0;
for (i = 0; i < data.length; i++) {
  switch (data.charAt(i)) {
    case "(":
      floor++;
      break;
    case ")":
      floor--;
      break;
    default:
      throw Error(`odd character: ${data.charAt(i)}`);
  }
  if (floor === -1) break;
}

console.log(`Part 2: Character position ${i + 1} enters basement}`);
