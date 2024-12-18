import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

const data = realData;
const maxHeight = 103;
const maxWidth = 101;
const iterations = 100;

interface Robot {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
}

console.log(`::: Part 1 :::`);

const quadrants = {
  "0,0": 0,
  "0,1": 0,
  "1,0": 0,
  "1,1": 0,
  none: 0,
};
const robots = data
  .split("\n")
  // .slice(0, 2)
  .map((line) => {
    const [posStr, velStr] = line.split(" ");
    const [posX, posY] = posStr.slice(2).split(",").map(Number);
    const [velX, velY] = velStr.slice(2).split(",").map(Number);
    let destX = (posX + velX * iterations) % maxWidth;
    if (destX < 0) destX = maxWidth + destX;
    let destY = (posY + velY * iterations) % maxHeight;
    if (destY < 0) destY = maxHeight + destY;

    let quadrant;
    if (
      destX === Math.floor(maxWidth / 2) ||
      destY == Math.floor(maxHeight / 2)
    ) {
      quadrant = "none";
    } else {
      const quadrantX = Math.floor(destX / (maxWidth / 2));
      const quadrantY = Math.floor(destY / (maxHeight / 2));
      quadrant = [quadrantX, quadrantY].join(",");
    }
    quadrants[quadrant]++;

    return { posX, posY, velX, velY, destX, destY, quadrant };
  });

// console.log(robots);
// console.log(quadrants);
const part1 = Object.entries(quadrants).reduce((acc, [key, val]) => {
  if (key == "none") return acc;
  return acc * val;
}, 1);

console.log(`Part 1: ${part1}`);

console.log(`::: Part 2 :::`);

// const render = async (robots, iteration: number) => {
//   const hash = new Map<string, boolean>();

//   let renderRobots = robots.map((line) => {
//     const { posX, posY, velX, velY } = line;
//     let destX = (posX + velX) % maxWidth;
//     if (destX < 0) destX = maxWidth + destX;
//     let destY = (posY + velY) % maxHeight;
//     if (destY < 0) destY = maxHeight + destY;
//     const coords = [destY, destX].join(",");
//     hash.set(coords, true);
//     return { posX: destX, posY: destY, velX, velY, coords };
//   });

//   // console.log(renderRobots);

//   console.log(`Iteration ${iterations}`);
//   for (let i = 0; i < maxHeight; i++) {
//     for (let j = 0; j < maxWidth; j++) {
//       if (hash.has(`${j},${i}`) && hash.get(`${j},${i}`))
//         process.stdout.write("#");
//       else process.stdout.write(".");
//     }
//     console.log(" ");
//   }

//   if (iteration === 101) return;

//   await new Promise((resolve, reject) => setTimeout(resolve, 1000));
//   return render(renderRobots, iteration + 1);
// };

let renderRobots = data.split("\n").map((line) => {
  const [posStr, velStr] = line.split(" ");
  const [posX, posY] = posStr.slice(2).split(",").map(Number);
  const [velX, velY] = velStr.slice(2).split(",").map(Number);
  return { posX, posY, velX, velY };
});

// render(renderRobots, 1);

const part2 = (robots: Array<Robot>) => {
  const deviations: Array<number> = [];

  const moveRobots = (robots: Array<Robot>) => {
    return robots.map((robot) => {
      const { posX, posY, velX, velY } = robot;
      let destX = (posX + velX) % maxWidth;
      if (destX < 0) destX = maxWidth + destX;
      let destY = (posY + velY) % maxHeight;
      if (destY < 0) destY = maxHeight + destY;
      return { posX: destX, posY: destY, velX, velY };
    });
  };
  // move the robots 10k times and measure the standard deviation at each step
  for (let n = 0; n < 10000; n++) {
    const deviation = standardDeviation(robots);
    deviations.push(deviation);
    robots = moveRobots(robots);
  }

  // find the minimum standard deviation and the step at which it occurred
  const [, n] = deviations.reduce(
    ([mindev, minn], deviation, n) => {
      return deviation < mindev ? [deviation, n] : [mindev, minn];
    },
    [Infinity, undefined] as [number, unknown] as [number, number]
  );

  return n;
};

const standardDeviation = (robots: Array<Robot>) => {
  // calculate the mean x and y positions
  const [sumx, sumy] = robots.reduce(
    ([sumx, sumy], robot) => [sumx + robot.posX, sumy + robot.posY],
    [0, 0]
  );
  const meanx = sumx / robots.length;
  const meany = sumy / robots.length;

  // calculate the sum of the squares of the deviations
  const [devx, devy] = robots.reduce(
    ([devx, devy], robot) => {
      const dx = meanx - robot.posX;
      const dy = meany - robot.posY;
      return [devx + dx * dx, devy + dy * dy];
    },
    [0, 0]
  );

  // the variance is the mean of the deviations
  const varx = devx / robots.length;
  const vary = devy / robots.length;

  // the standard deviation is the square root of the deviations
  return Math.sqrt(varx + vary);
};

const res = part2(renderRobots);

console.log(`Part 2: ${res}`);
