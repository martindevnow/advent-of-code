import * as utils from "../utils";

const realData: string = utils.readFile("day-06/data.txt"); // read

const testData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

// x = 0 y = -1 => up
// x = 1 y = 0  => right
// x = 0 y = 1 => "down"
// x = -1 y = 0 => left

console.log(`Part 1: `);

const grid = realData.split("\n").map((line) => line.split(""));
const guardLocation = realData.indexOf("^");

let y = Math.floor(guardLocation / grid[0].length) - 1; // line
// let y = 59; //Math.floor(guardLocation / grid[0].length) - 1; // line
let x = guardLocation % (grid[0].length + 1); // col
// let x = 70; // guardLocation % (grid[0].length + 1); // col

console.log({ guardLocation, x, y });

const turnRight = (dirX, dirY): [number, number] => {
  if (dirY === -1) return [1, 0]; // up to right
  if (dirX === 1) return [0, 1]; // right to down
  if (dirY === 1) return [-1, 0]; // down to left
  return [0, -1]; // back to up
};

const turnLeft = (dirX, dirY): [number, number] => {
  if (dirY === -1) return [-1, 0]; // up to left
  if (dirX === -1) return [0, 1]; // left to down
  if (dirY === 1) return [1, 0]; // down to right
  return [0, -1]; // back to up
};

let dirX = 0,
  dirY = -1;

let dirOnCell = new Map<string, Array<string>>(); // "35,23": ["0,1", "-1,0", ...];

let cellCoords = `${x},${y}`;
let dirStr = `${dirX},${dirY}`;
dirOnCell.set(cellCoords, [...(dirOnCell.get(cellCoords) ?? []), dirStr]);

let obstacleLocations = new Set<string>();

while (true) {
  // look at position infront of guard
  const newX = x + dirX;
  const newY = y + dirY;

  // exit if off the map
  if (newX < 0 || newY < 0 || newX >= grid[0].length || newY >= grid.length)
    break;

  // if obstacle, turn right
  if (grid[newY][newX] === "#") {
    [dirX, dirY] = turnRight(dirX, dirY);
    continue;
  }

  // mark new square with X before moving onto it
  grid[newY][newX] = "X";

  cellCoords = `${x},${y}`;
  dirStr = `${dirX},${dirY}`;

  // check if I have traveled to this square before
  const pastDirectionsTraveledHere = dirOnCell.get(cellCoords) ?? [];
  if (pastDirectionsTraveledHere.includes(turnRight(dirX, dirY).join(","))) {
    obstacleLocations.add(`${newX},${newY}`);
  }
  dirOnCell.set(cellCoords, [...pastDirectionsTraveledHere, dirStr]);

  x = newX;
  y = newY;
}

// console.log(finalGrid);
const markedSquares = grid.reduce((acc, row) => {
  return acc + row.filter((cell) => cell === "X").length;
}, 0);

console.log(grid.map((line) => line.join("")).join("\n"));

console.log({ markedSquares });

console.log(`Part 2: `);

// in order to find loops, I want to track directions traveled in each cell.
// if I cross a cell going a direction 90 Counter clockwise, that would mean an obstacle in front of the guard would cause a loop

// TODO: Fix this one....
// check https://topaz.github.io/paste/#XQAAAQBzDwAAAAAAAAAnmIlGabaHKuwY5Qf5x/YOpRQfAuysgQ2BWTwoC//j7AiCgexbaAjZdP26Q6pbpmrgDdQ+NM+SfDqJXKeIJaOUfIKeOP2LeudJnmcLwALWO7QDo70m5cwnp68K/zMdrHapk3h5+Fd3DZVj2AH7M6Xl/nzKwBKCgl5nKOxhYQpscEVKC2Df1XGgqClYIe3qHkt9uBqDwGdQEEjspklJovLW00Vzvp+6hV7YEvRQMQHtutCUfGLBs81H1GCWgnO2bIcXd/hFFXhVcaqz8xM6wqDGhpoixfcOkv+WmogI0mzimtoyk9CW2cSwKl2+0cRJsereUBRgO9JKl2Es0e+1Lw1zMuO8uHHHit15PIDa9dWyhNJPOj2/SSQMZ6dMY6U2xjhc3sLn0+jtb+gdPQnCa/uiFFvq8HgzFzJlYr2tSDgNg+Xd9uJtt5sbIYB9hx7N7tMzvcgqt1F6o7Yzd8A2ksO8pyFTU6tk4QUWBOA355qOU5lhRV1r36xyVe9adeNJnpQUF+UJEoSg+8f1Kwii6nM2yO06+70yoaUhsEXweJkfdEe8SsMgHQ4BM0t4lIm49JJoI6N91JBsnjcEgkqeOHhVZ4WP7Ov7Y7yNPEEJqzGIb9oMg1129RJM2Rame2t9jfE0GZ7VkQ4KNLkSXZ15lZ1p2WGlVkOuXXPKcOgz/bOobwdKrVDqk4naToUbJUOGugWIqK3WXQ3tBZ1UwNYRZQwOJ5bI1z6mz/9t2bMhRk/QiuT8qv1fr/JbAWrKVYsuBOWajvc6OZPgiM0N2i8C8n1lZ6LtD5SKx0Iy5ZhQ5Z2caj+i1aaJI/gZo75EO0O0xeTFJjb/sGGPi7AIhP9CM8n4k3jz5zQfkeOlO51YqQBcKkoy6C6yUjNJj1SWO3cetP1hpPvD/ATaYf8DwDZ6swQdskVMl1ImX3HY6ybeD5cezTfZdGEY75It6DOhe1icT3o6SD3epwVJkpmAubpgu73HpjvFwlbpTjWdZTjUArm2Z0cu/oGHxrBDnn+vVZYNwiH7dvHW36cBGpEtlr8WzNC1WprK1u1NKReZ+5VUqdZGsnNt+uaka+2sMJBCcTjj9gucxiDTk/UGl+7NreKstculOHdQDjSpolIVF9ilmoIe23tqXavDBo503bp77KSNvHVCbTw91RBYJujV7HXrWY/2na0ssmQqjBBcQoCPrcbxcU/g+X/fT47aDLQPEH0CissYBzKOHtTwfSkEK+8nz9LpV1LONSVy+spS8hhfPh3fe2OP9PGPWKOZVOABKq9+h3TDeL7fRgo4a/ymqM9KT7YQalTRHQEB6fE/mZFZ6tnERMgbc43ObEICRPa9fTJqfgebg2GoWalHrq6vNR35DiO2U/W7S5Gkdy0L9aYAmt/Z/X4XIk1Xo1x8rTkVIMo6OTSzWOVVFEXs17tGSiOzxoK++TnzPm6PLjdUupqi9ahmT523S+L69bbnr7NJqzptO1k9Q+tcvilq92yO0YY0cy6Ywfq4GwbYGQIzaXpWD5T/21E6RKxTBXJW+8D0yafu+eVrjGHIF0l9PDhPyIMGtPu/I4/zXiY93aItfAhJ4jIAFlF1eL8My8cEMfxbuzHpZOt06RSmzf6BVUYntKbrWD4Pzb+2LTfwWObrdbo4BqgMzTH88WNCeK0Sjqtk72RA2q8mK2gI/DXs2JmgfMK4CI917nSINu/NoWmFMD/cUDFKICVTrQfFx/n+gtzrAApytOPryniznIyNWIFS3sj88NgH0DpqXpWqb0cD7rqmfbSucGpzIvYmZAuG5w0jlYHoAnZ/RUWwvQqXfgGrqiBFnN7lZj3sH9RFElZMPGOxZq9pV+tjsbxCcj6Te2P/Xe2oAA==

console.log(obstacleLocations.size);
// 1933 (correct)
