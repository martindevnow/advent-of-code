import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

const data = realData;
// strategy
// find the path through the maze
// log each cell location in order ("x,y" => step number)
// then walk the solution, at each step, look at the walls and take two steps through
// if it lands on a hallway, check the difference in step indexes. the delta is how much time is saved
type Cell = "." | "#" | "S" | "E";

function parseGrid(grid: string[]): {
  maze: Cell[][];
  start: [number, number];
  end: [number, number];
} {
  const maze: Cell[][] = grid.map((row) => row.split("") as Cell[]);
  let start: [number, number] | null = null;
  let end: [number, number] | null = null;

  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[r].length; c++) {
      if (maze[r][c] === "S") start = [r, c];
      if (maze[r][c] === "E") end = [r, c];
    }
  }

  if (!start || !end)
    throw new Error("Maze must have one start (S) and one end (E).");

  return { maze, start, end };
}

function solveMaze(grid: string[]): [number, number][] {
  const { maze, start, end } = parseGrid(grid);
  const [rows, cols] = [maze.length, maze[0].length];
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0], // Right, Down, Left, Up
  ];

  const queue: [[number, number], [number, number][]][] = [[start, [start]]]; // [[current position], [path so far]]
  const visited = new Set<string>();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [[r, c], path] = queue.shift()!;

    if (r === end[0] && c === end[1]) {
      return path;
    }

    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        maze[nr][nc] !== "#" &&
        !visited.has([nr, nc].toString())
      ) {
        visited.add([nr, nc].toString());
        queue.push([
          [nr, nc],
          [...path, [nr, nc]],
        ]);
      }
    }
  }

  throw new Error("No path found from start to end.");
}

const solution = solveMaze(data.split("\n"));

// console.log(solution.length - 1);

function findAllShortcuts(
  grid: string[],
  solution: [number, number][]
): number[] {
  const shortcuts: number[] = [];

  // Create a hashmap of solution steps
  const stepMap = new Map<string, number>();
  solution.forEach(([r, c], index) => {
    stepMap.set(`${r},${c}`, index);
  });

  // Iterate through the solution
  const directions = [
    [0, 2],
    [2, 0],
    [0, -2],
    [-2, 0], // Right, Down, Left, Up (2 steps away)
  ];

  for (let i = 0; i < solution.length; i++) {
    const [r, c] = solution[i];

    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];

      // Check if destination is within bounds and not a wall
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < grid.length &&
        nc < grid[0].length &&
        grid[nr][nc] !== "#" &&
        stepMap.has(`${nr},${nc}`)
      ) {
        const destinationStep = stepMap.get(`${nr},${nc}`)!;
        const shortcut = destinationStep - i;
        if (shortcut > 2) {
          shortcuts.push(shortcut - 2);
        }
      }
    }
  }

  return shortcuts;
}

function countShortcutsBySteps(shortcuts: number[]): Record<number, number> {
  const shortcutCounts: Record<number, number> = {};

  shortcuts.forEach((stepsSaved) => {
    shortcutCounts[stepsSaved] = (shortcutCounts[stepsSaved] || 0) + 1;
  });

  return shortcutCounts;
}

function countShortcutsByMinimumSteps(
  shortcutCounts: Record<number, number>,
  minStepsSaved: number
): number {
  return Object.entries(shortcutCounts)
    .filter(([stepsSaved]) => Number(stepsSaved) >= minStepsSaved)
    .reduce((total, [, count]) => total + count, 0);
}

const shortcuts = findAllShortcuts(data.split("\n"), solution);

// console.log(shortcuts);

const sc = countShortcutsBySteps(shortcuts);

console.log(
  `At least 100 steps saved: ${countShortcutsByMinimumSteps(sc, 100)}`
);

console.log("part2");

function findAllLongerShortcuts(
  grid: string[],
  solution: [number, number][]
): number[] {
  const shortcuts: number[] = [];

  // Create a hashmap of solution steps
  const stepMap = new Map<string, number>();
  solution.forEach(([r, c], index) => {
    stepMap.set(`${r},${c}`, index);
  });

  // BFS to find all cells within 20 steps
  function getReachableCells(start: [number, number]): [number, number][] {
    const queue: [[number, number], number][] = [[start, 0]]; // [position, steps]
    const visited = new Set<string>([start.toString()]);
    const reachable: [number, number][] = [];

    while (queue.length > 0) {
      const [[r, c], steps] = queue.shift()!;

      if (steps > 0 && steps <= 20 && grid[r][c] !== "#") {
        reachable.push([r, c]);
      }

      if (steps === 20) continue;

      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0], // Right, Down, Left, Up
      ]) {
        const [nr, nc] = [r + dr, c + dc];
        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < grid.length &&
          nc < grid[0].length &&
          !visited.has(`${nr},${nc}`)
        ) {
          visited.add(`${nr},${nc}`);
          queue.push([[nr, nc], steps + 1]);
        }
      }
    }

    return reachable;
  }

  // Iterate through the solution
  for (let i = 0; i < solution.length; i++) {
    const currentCell = solution[i];
    const reachableCells = getReachableCells(currentCell);

    for (const [nr, nc] of reachableCells) {
      if (stepMap.has(`${nr},${nc}`)) {
        const destinationStep = stepMap.get(`${nr},${nc}`)!;
        const distanceTraveled =
          Math.abs(currentCell[0] - nr) + Math.abs(currentCell[1] - nc);
        const shortcut = destinationStep - i - distanceTraveled;
        if (shortcut > 0) {
          shortcuts.push(shortcut);
        }
      }
    }
  }

  return shortcuts;
}

const longShortcuts = findAllLongerShortcuts(data.split("\n"), solution);
console.log("longShortcuts");
console.log(longShortcuts);

const lsc = countShortcutsBySteps(longShortcuts);
console.log("lsc");
console.log(lsc);

console.log(
  `At least 100 steps saved: ${countShortcutsByMinimumSteps(lsc, 100)}`
);
