const fs = require("fs");
const path = require("path");

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

export const getYXOfStringInString = (
  str: string,
  search: string
): [number, number] => {
  const sLocation = str.indexOf(search);
  const grid = str.split("\n").map((line) => line.split(""));

  let y = Math.floor(sLocation / grid[0].length); // line
  let x = sLocation % (grid[0].length + 1); // col
  const coords: [number, number] = [y, x];
  return coords;
};
