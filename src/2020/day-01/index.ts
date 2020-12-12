import * as utils from "../utils";

const data = utils
  .readFile("day-01/data.txt")
  .split(/\r?\n/)
  .filter((item) => item.trim() !== "")
  .map((item) => +item)
  .sort();
const products = data
  .map(
    (item) => (data.find((candidate) => item + candidate === 2020) || 0) * item
  )
  .filter((item) => item !== 0);

console.log(products);

const tripleProducts = data.filter((item, index) => {
  return data.find((candidate) => {
    return data.find((candidate2) => {
      return item + candidate + candidate2 === 2020;
    });
  });
}).reduce((acc, curr) => acc * curr, 1);
console.log(tripleProducts);
