import fs from "fs";
import path from "path";

export const readFileAbsolute = (file) => {
  return fs.readFileSync(file, "utf8");
};

export const readFile = (file) => {
  const relPath = path.join(__dirname, file);
  return fs.readFileSync(relPath, "utf8");
};

export const mod = (modulo: number) => (num: number) =>
  ((num % modulo) + modulo) % modulo;

export const logIt = (...args: any[]) =>
  console.log(JSON.stringify(args, null, 2));

export const chunk = <T>(arr: T[], size: number): Array<Array<T>> => {
  const result = arr.reduce((acc: Array<Array<T>>, _, i) => {
    if (i % size > 0) {
      return acc;
    }
    return [...acc, arr.slice(i, i + size)];
  }, [] as Array<Array<T>>);
  return result;
};

export const chunkStr = (size: number) => (input: string) => {
  let output: Array<string> = [];

  while (input.length) {
    output.push(input.slice(0, size));
    input = input.slice(size, input.length);
  }
  return output;
};

export const isNumeric = (str: string) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

export const getNeighbors = (
  point: [number, number]
): Array<[number, number]> => {
  const [x, y] = point;
  const ns: Array<[number, number]> = [];
  for (const coords of [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ]) {
    let x1 = x + coords[0];
    let y1 = y + coords[1];
    ns.push([x1, y1]);
  }
  return ns;
};

export const isInBounds = (
  coord: [number, number],
  grid: Array<Array<unknown>>
) => {
  const [x, y] = coord;
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) {
    return false;
  }
  return true;
};

export const isInt = (value: number) => {
  return (
    !isNaN(value) &&
    parseInt(`${value}`, 10) == value &&
    !isNaN(parseInt(`${value}`, 10))
  );
};

export const getXYFromArray = (
  grid: Array<Array<string>>,
  searchChar: string
) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === searchChar) return [y, x];
    }
  }
  return [-1, -1];
};
export const getXYFromStrGrid = (gridStr: string, searchChar: string) => {
  const grid = gridStr.split("\n").map((line) => line.split(""));

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === searchChar) return [y, x];
    }
  }
  return [-1, -1];

  // const loc = gridStr.indexOf(searchChar);
  // let x = Math.floor(loc / grid[0].length); // line
  // let y = loc % (grid[0].length + 1); // col
  // return [y, x];
};

export const drawGrid = (grid: Array<Array<string | number>>) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      process.stdout.write(`${grid[y][x]}`);
    }
    console.log("");
  }
};

export const getGrid = (str: string) =>
  str.split("\n").map((line) => line.split(""));

export const trueMod = (n, m) => {
  return ((n % m) + m) % m;
};
