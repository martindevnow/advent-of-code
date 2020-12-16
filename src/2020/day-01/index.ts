import * as utils from "../utils";

const data = utils
  .readFile("day-01/data.txt") // read input data
  .split(/\r?\n/) // break up by line
  .map((item) => +item) // convert to numbers (not strings)
  .sort(); // sort in ascending oder

const products = data
  .map(
    (item) => (data.find((candidate) => item + candidate === 2020) || 0) * item
  )
  .filter((item) => item !== 0);

console.log("Results :: Part 1");
console.log(products);

const tripleProducts = data
  .filter((item, index) => {
    return data.find((candidate) => {
      return data.find((candidate2) => {
        return item + candidate + candidate2 === 2020;
      });
    });
  })
  .reduce((acc, curr) => acc * curr, 1);
console.log("Results :: Part 2");
console.log(tripleProducts);
