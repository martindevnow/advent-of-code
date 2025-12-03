import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`;

const data = testData;
interface Tile {
  symbol: "\\" | "/" | "-" | "|" | ".";
  visited: boolean;
  enteredDir: Set<string>;
}

const part1Data: Array<Array<Tile>> = data.split("\n").map((row) =>
  row.split("").map((s) => ({
    symbol: s as Tile["symbol"],
    visited: false,
    enteredDir: new Set(),
  }))
);

// console.log({ part1Data });

interface Directions {
  rDir: number;
  cDir: number;
}

const getNewDirection = (
  rDir,
  cDir,
  symbol
): Directions | [Directions, Directions] => {
  if (symbol === "-") {
    if (cDir === 0) {
      return { rDir, cDir };
    }
    return [
      { rDir: 1, cDir: 0 },
      { rDir: -1, cDir: 0 },
    ];
  }
  if (symbol === "|") {
    if (rDir === 0) {
      return { rDir, cDir };
    }
    return [
      { rDir: 0, cDir: 1 },
      { rDir: 0, cDir: -1 },
    ];
  }
  if (symbol === "/") {
    if (rDir === 1) return { rDir: 0, cDir: -1 };
    if (rDir === -1) return { rDir: 0, cDir: 1 };
    if (cDir === 1) return { rDir: -1, cDir: 0 };
    if (cDir === -1) return { rDir: 1, cDir: 0 };
  }
  if (symbol === "\\") {
    if (rDir === 1) return { rDir: 0, cDir: 1 };
    if (rDir === -1) return { rDir: 0, cDir: -1 };
    if (cDir === 1) return { rDir: 1, cDir: 0 };
    if (cDir === -1) return { rDir: -1, cDir: 0 };
  }
  return { rDir, cDir };
};

let energized = 0;
const process = (r: number, c: number, rDir: number, cDir: number) => {
  if (part1Data[r]?.[c] === undefined) {
    console.log(`Laser leaving map --  ${r}, ${c} from dir ${rDir}, ${cDir}`);
    return;
  }
  if (
    part1Data[r][c].visited === true &&
    part1Data[r][c].enteredDir.has(`${rDir},${cDir}`)
  ) {
    console.log(
      `Already entered cell ${r}, ${c} from dir ${rDir}, ${cDir} -- killing laser`
    );
    return;
  }

  // Energize if NOT energized
  if (part1Data[r][c].visited === false) {
    console.log(
      `Entering cell ${r}, ${c} from dir ${rDir}, ${cDir} -- ++ energized!`
    );
    part1Data[r][c].visited = true;
    energized++;
    // return process(r +newRDir, c+newCDir, newRDir, newCDir);
  }

  part1Data[r][c].enteredDir.add(`${rDir},${cDir}`);
  const newDirections = getNewDirection(rDir, cDir, part1Data[r][c].symbol);

  if (Array.isArray(newDirections)) {
    const [{ rDir: rDir1, cDir: cDir1 }, { rDir: rDir2, cDir: cDir2 }] =
      newDirections;

    console.log("Beam SPLIT!");
    process(r + cDir1, c + rDir1, rDir1, cDir1);
    process(r + cDir2, c + rDir2, rDir2, cDir2);
    return;
  }

  const { rDir: rDir1, cDir: cDir1 } = newDirections;
  process(r + cDir1, c + rDir1, rDir1, cDir1);
};
process(0, 0, 1, 0);

console.log(`Part 1: ${energized}`);
