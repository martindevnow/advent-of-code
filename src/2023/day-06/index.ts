import * as utils from "../utils";

const [timeStr, distanceStr] = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n/);

const times = timeStr
  .split(" ")
  .map((s) => +s.trim())
  .filter(Boolean);

const dists = distanceStr
  .split(" ")
  .map((s) => +s.trim())
  .filter(Boolean);

console.log(times, dists);

const races = [
  { time: times[0], dist: dists[0] },
  { time: times[1], dist: dists[1] },
  { time: times[2], dist: dists[2] },
  { time: times[3], dist: dists[3] },
];

const distancesForRace = (time) => {
  const it = new Array(time).fill(time).map((maxTime, speed) => {
    return speed * (maxTime - speed);
  });
  return it;
};

const waysToWin = races.map(({ time, dist }) => {
  const distances = distancesForRace(time);
  return distances.filter((val) => val > dist).length;
});

console.log(waysToWin.reduce((acc, curr) => acc * curr, 1));

console.log("Part 2: ");

const racetime = +times.map((t) => t.toString()).join("");
const raceDistance = +dists.map((t) => t.toString()).join("");

console.log({ racetime, raceDistance });

const findMinMaxSpeeds = (totalTime, minDistance) => {
  // Calculate the discriminant
  const discriminant = totalTime * totalTime - 4 * minDistance;

  // Check if the discriminant is non-negative
  if (discriminant < 0) {
    throw new Error("No real solutions exist for the given parameters.");
  }

  // Calculate the two roots using the quadratic formula
  const root1 = (totalTime + Math.sqrt(discriminant)) / 2;
  const root2 = (totalTime - Math.sqrt(discriminant)) / 2;

  // The valid speeds are between the two roots
  const minSpeed = Math.min(root1, root2);
  const maxSpeed = Math.max(root1, root2);

  // Ensure speeds are in the valid range (0 < speed < totalTime)
  if (minSpeed <= 0 || maxSpeed >= totalTime) {
    throw new Error("The speed solutions are out of the valid range.");
  }

  return { minSpeed: Math.ceil(minSpeed), maxSpeed: Math.floor(maxSpeed) };
};

const p2 = findMinMaxSpeeds(racetime, raceDistance);
console.log(p2);
console.log(p2.maxSpeed - p2.minSpeed + 1);

// distance traveled = speed * (raceTime - speed)
//                   = speed * raceTime - speed^2
// so, I want to find where the above is greater than minDistance
//       minDistance < speed * raceTime - speed^2
