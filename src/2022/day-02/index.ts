import * as utils from "../utils";

const enemy = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
};

const charPoints = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const roundPoints = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0,
};

const evaluateGameOutcome = ([opponent, me]) => {
  if (enemy[opponent] === charPoints[me]) return roundPoints.DRAW;
  if (opponent === "A" && me === "Y") return roundPoints.WIN;
  if (opponent === "B" && me === "Z") return roundPoints.WIN;
  if (opponent === "C" && me === "X") return roundPoints.WIN;
  return roundPoints.LOSS;
};

const data = utils
  .readFile("day-02/data.txt") // read input data
  .split(/\n/)
  .map((day) => day.split(" "));
console.log(data);

// part 1
// const scores = data.map(
//   ([opponent, me]) => evaluateGameOutcome([opponent, me]) + charPoints[me]
// );
// console.log(scores);

// const max = scores.reduce((acc, curr) => acc + curr, 0);
// console.log({ max });

// part 2
const outcomes = {
  X: "LOSS",
  Y: "DRAW",
  Z: "WIN",
};

const getShapeForOutcome = ([opponent, outcome]) => {
  if (outcomes[outcome] === "DRAW") return opponent;
  if (outcomes[outcome] === "WIN") {
    if (opponent === "A") return "B";
    if (opponent === "B") return "C";
    if (opponent === "C") return "A";
  }
  if (outcomes[outcome] === "LOSS") {
    if (opponent === "A") return "C";
    if (opponent === "B") return "A";
    if (opponent === "C") return "B";
  }
};

const scoresP2 = data.map(([opponent, outcome]) => {
  console.log(`outcome: ${outcomes[outcome]}`);
  console.log(`outcome points: ${roundPoints[outcomes[outcome]]}`);
  console.log(`my shape: ${getShapeForOutcome([opponent, outcome])}`);
  console.log(
    `my shape points: ${enemy[getShapeForOutcome([opponent, outcome])]}`
  );

  const outcomePoints =
    roundPoints[outcomes[outcome]] +
    enemy[getShapeForOutcome([opponent, outcome])];
  return outcomePoints;
});

const maxP2 = scoresP2.reduce((acc, curr) => acc + curr, 0);
console.log({ maxP2 });
