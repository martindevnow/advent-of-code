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
