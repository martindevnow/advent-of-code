import * as utils from "../utils";

console.log(`__dirname, ${__dirname}`);

const data: Array<string> = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n/);
// .slice(0, 2);

const max = {
  red: 12,
  green: 13,
  blue: 14,
};

const regex = {
  red: new RegExp(/(\d+) red/),
  green: new RegExp(/(\d+) green/),
  blue: new RegExp(/(\d+) blue/),
};

const games = data.map((line) => {
  const [game, _sets] = line.split(":");
  const id = +game.substring(5);

  const sets = _sets
    .split(";")
    .map((str) => str.trim())
    .map((set) => {
      const clean = set.trim();
      return {
        red: +(set.match(regex.red)?.[1] ?? 0),
        green: +(set.match(regex.green)?.[1] ?? 0),
        blue: +(set.match(regex.blue)?.[1] ?? 0),
      };
    });

  const max = sets.reduce(
    (acc, curr) => {
      return {
        red: Math.max(acc.red, curr.red),
        green: Math.max(acc.green, curr.green),
        blue: Math.max(acc.blue, curr.blue),
      };
    },
    { red: 0, blue: 0, green: 0 }
  );

  const power = max.red * max.green * max.blue;

  const impossible = !!sets.find((set) => {
    return set.blue > max.blue || set.red > max.red || set.green > max.green;
  });

  return { id, sets, impossible, power, max };
});

const possibleGames = games.filter((game) => game.impossible == false);
const sum = possibleGames.reduce((acc, curr) => {
  return acc + curr.id;
}, 0);

utils.logIt(games);

console.log(`Day 02, part 1: ${sum}`);
// 2265

const day2 = games.reduce((acc, curr) => {
  return acc + curr.power;
}, 0);
console.log(`Day 02, part 2: ${day2}`);
// 64097
