import * as utils from "../utils";

const data = utils
  .readFile("day-03/mock.txt") // read input data
  .split(/\n/);

const lazyWay = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

console.log(data);

const findShared = (str1, str2) => {
  return [...str1].find((letter) => str2.includes(letter));
};

// slice in half
const lines = data
  .map((line) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2, line.length),
  ])
  .map(([str1, str2]) => {
    return findShared(str1, str2);
  })
  .map((char) => lazyWay[char])
  .reduce((acc, curr) => acc + curr, 0);

console.log(lines);

const findCommon = (str1, str2) => {
  return [...str1].filter((chr1) => str2.includes(chr1)).join("");
};

// part 2

let runningTotal = 0;
for (let i = 0; i < data.length; i += 3) {
  const l1 = data[i];
  const l2 = data[i + 1];
  const l3 = data[i + 2];
  const condensed1and2 = findCommon(l1, l2);
  const condensed12and3 = findCommon(condensed1and2, l3);
  if (!lazyWay[condensed12and3.charAt(0)]) {
    console.warn(`Warn : ${condensed12and3.charAt(0)} from lines ${i} and +2`);
  }
  runningTotal += lazyWay[condensed12and3.charAt(0)] ?? 9999999;
}

console.log({ runningTotal });
