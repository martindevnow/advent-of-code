import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

const data = realData;

const keysAndLocks = data.split("\n\n").map((sq) => sq.split("\n"));

const locksArr = keysAndLocks.filter((box) => box[0][0] === "#");
const keysArr = keysAndLocks.filter((box) => box[0][0] === ".");

if (locksArr.length + keysArr.length !== keysAndLocks.length)
  throw Error(`cannot divide keys and locks`);

// map to
type Key = { teeth: [number, number, number, number, number] };
type Lock = { gaps: [number, number, number, number, number] };

const keys = keysArr.map((keyArr) => {
  let teeth: number[] = [];
  for (let slot = 0; slot < 5; slot++) {
    let tooth: string[] = [];

    for (let height = 0; height < 7; height++) {
      tooth.push(keyArr[height].charAt(slot));
    }

    teeth[slot] = tooth.filter((cell) => cell === "#").length - 1;
  }
  return { teeth } as Key;
});

const locks = locksArr.map((lockArr) => {
  let gaps: number[] = [];
  for (let slot = 0; slot < 5; slot++) {
    let gap: string[] = [];

    for (let height = 0; height < 7; height++) {
      gap.push(lockArr[height].charAt(slot));
    }

    gaps[slot] = gap.filter((cell) => cell === ".").length - 1;
  }
  return { gaps } as Lock;
});

console.log("keys", keys);
console.log("locks", locks);

const keyFits = (lock: Lock, key: Key) => {
  console.log(
    `Compare Lock ${lock.gaps.join(",")} and key: ${key.teeth.join(",")}`
  );
  for (let i = 0; i < 5; i++) {
    if (lock.gaps[i] < key.teeth[i]) return false;
  }
  return true;
};

console.log(keyFits({ gaps: [5, 5, 5, 5, 5] }, { teeth: [2, 2, 2, 2, 2] }));

console.log(`::: Part 1 :::`);

// compare keys and locks
let fit = 0;
for (const lock of locks) {
  for (const key of keys) {
    if (keyFits(lock, key)) {
      fit++;
    }
  }
}

console.log(`Part 1: ${fit}`);

console.log(`::: Part 2 :::`);

console.log(`Part 2: ${{}}`);
