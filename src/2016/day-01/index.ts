import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `R5, L5, R5, R3`;

const data = realData;

console.log(`::: Part 1 :::`);

let direction: [number, number] = [-1, 0];
let position = [0, 0];

const facing = {
  "-1,0": "N", // N to E
  "0,1": "E", // E to S
  "1,0": "S", // S to W
  "0,-1": "W", // W to N
};

const rightTurn = {
  "-1,0": [0, 1], // N to E
  "0,1": [1, 0], // E to S
  "1,0": [0, -1], // S to W
  "0,-1": [-1, 0], // W to N
};

const leftTurn = {
  "-1,0": [0, -1], // N to W
  "0,-1": [1, 0], // W to S
  "1,0": [0, 1], // S to E
  "0,1": [-1, 0], // E to N
};

const turn = (lOrR: "L" | "R", dir: [number, number]) => {
  console.log(`Turning ${lOrR}, currently facing ${facing[dir.join(",")]}`);

  const curDir = dir.join(",");
  console.log({ curDir });
  switch (lOrR) {
    case "L":
      return leftTurn[curDir];
    case "R":
      return rightTurn[curDir];
  }
  throw Error(`unknown turn`);
};

const instructions = data
  .split(", ")
  .map((instruction) => instruction.split("") as ["L" | "R", number]);

for (let i = 0; i < instructions.length; i++) {
  const [lOrR, dist] = instructions[i];

  direction = turn(lOrR, direction);
  position[0] += direction[0] * dist;
  position[1] += direction[1] * dist;
}

console.log(`Final position: ${position}`);
const totalDistance = Math.abs(position[0]) + Math.abs(position[1]);

// 23 incorrect [-10,-13]

console.log(`Part 1: total distance ${totalDistance}`);

console.log(`::: Part 2 :::`);

console.log(`Part 2: ${{}}`);
