import fs from "fs";
import path from "path";

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
