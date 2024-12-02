import * as utils from "../utils";

interface SeedData {
  seed: number;
  soil: number;
  fert: number;
  water: number;
  light: number;
  temp: number;
  humid: number;
  loc: number;
}

interface SourceMap {
  sourceStart: number;
  destStart: number;
  range: number;
}

const findDestinationId = (sourceId: number, maps: SourceMap[], i: any) => {
  const source = maps.find((map) => {
    return (
      sourceId >= map.sourceStart && sourceId < map.sourceStart + map.range
    );
  });
  if (!source) return sourceId;

  return source.destStart + sourceId - source.sourceStart;
};

// console.log(
//   findDestinationId(100, [
//     {
//       sourceStart: 99,
//       destStart: 2,
//       range: 100,
//     },
//   ])
// );

const data = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n\n/);
// .slice(0, 10);

const [, ...seedsStr] = data.slice(0, 1)[0].split(" ");
const mapsStrs = data.slice(1).map((str) => {
  const [, ...mapData] = str.split("\n");
  const cleanData = mapData.map((row) => {
    const [destStart, sourceStart, range] = row.split(" ");
    return { sourceStart: +sourceStart, destStart: +destStart, range: +range };
  });
  return cleanData;
});

const seeds = seedsStr.map((seed) => +seed);

const [
  seedToSoil,
  soilToFert,
  fertToWater,
  waterToLight,
  lightToTemp,
  tempToHumid,
  humidToLoc,
] = mapsStrs;

// utils.logIt(seedsStr);
// utils.logIt(seedToSoil);

// for each seed, find the map with the current stage within range
// then get the destination for that seed with the next step

const res = seeds.reduce((acc, seedId, seedIndex) => {
  const locationId = mapsStrs.reduce((latestId, mappers, mapIndex) => {
    return findDestinationId(
      latestId,
      mappers,
      `seedIndex: ${seedIndex}, mapIndex: ${mapIndex}`
    );
  }, seedId);
  return [...acc, locationId];
}, [] as number[]);

utils.logIt(res);

const lowest = res.reduce((last, curr) => {
  return Math.min(curr, last);
}, 999999999999999999999);

console.log(`Day 5, part 1: ${lowest}`);

// 173706076 is correct
