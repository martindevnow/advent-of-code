/**
 * You are running a classroom and suspect that some of your students are passing around the answer to a multiple-choice question in 2D grids of letters. The word may start anywhere in the grid, and consecutive letters can be either immediately below or immediately to the right of the previous letter.

Given a grid and a word, write a function that returns the location of the word in the grid as a list of coordinates. If there are multiple matches, return any one.

grid1 = [
    ['b', 'b', 'b', 'a', 'l', 'l', 'o', 'o'],
    ['b', 'a', 'c', 'c', 'e', 's', 'c', 'n'],
    ['a', 'l', 't', 'e', 'w', 'c', 'e', 'w'],
    ['a', 'l', 'o', 's', 's', 'e', 'c', 'c'],
    ['w', 'o', 'o', 'w', 'a', 'c', 'a', 'w'],
    ['i', 'b', 'w', 'o', 'w', 'w', 'o', 'w']
]
word1_1 = "access"      # [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]
word1_2 = "balloon"     # [(0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (1, 7)]

word1_3 = "wow"         # [(4, 3), (5, 3), (5, 4)] OR 
                        # [(5, 2), (5, 3), (5, 4)] OR 
                        # [(5, 5), (5, 6), (5, 7)]
                          
word1_4 = "sec"         # [(3, 4), (3, 5), (3, 6)] OR 
                        # [(3, 4), (3, 5), (4, 5)]    

word1_5 = "bbaal"       # [(0, 0), (1, 0), (2, 0), (3, 0), (3, 1)]


grid2 = [
  ['a'],
]
word2_1 = "a"

grid3 = [
    ['c', 'a'],
    ['t', 't'],
    ['h', 'a'],
    ['a', 'c'],
    ['t', 'g']
]
word3_1 = "cat"
word3_2 = "hat"

grid4 = [
    ['c', 'c', 'x', 't', 'i', 'b'],
    ['c', 'a', 't', 'n', 'i', 'i'],
    ['a', 'x', 'n', 'x', 'p', 't'],
    ['t', 'x', 'i', 'x', 't', 't']
]
word4_1 = "catnip"      # [(1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)] OR
                        # [(0, 1), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)]


All test cases:

search(grid1, word1_1) => [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]
search(grid1, word1_2) => [(0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (1, 7)]
search(grid1, word1_3) => [(4, 3), (5, 3), (5, 4)] OR 
                          [(5, 2), (5, 3), (5, 4)] OR 
                          [(5, 5), (5, 6), (5, 7)]
search(grid1, word1_4) => [(3, 4), (3, 5), (3, 6)] OR
                          [(3, 4), (3, 5), (4, 5)]                           
search(grid1, word1_5) => [(0, 0), (1, 0), (2, 0), (3, 0), (3, 1)]

search(grid2, word2_1) => [(0, 0)]

search(grid3, word3_1) => [(0, 0), (0, 1), (1, 1)]
search(grid3, word3_2) => [(2, 0), (3, 0), (4, 0)]

search(grid4, word4_1) => [(1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)] OR
                          [(0, 1), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)]

Complexity analysis variables:

r = number of rows
c = number of columns
w = length of the word
 */

const search = (grid: string[][], word: string): [number, number][] => {
  const findNext = (
    grid: string[][],
    word: string,
    index: number,
    snake: Array<[number, number]>,
    currentPosition: [number, number]
  ): Array<[number, number]> | null => {
    if (index === word.length) {
      // console.log("all letters found");
      return snake;
    }

    if (currentPosition[0] > grid[0].length) {
      // console.log("hit right edge");
      return null;
    }
    if (currentPosition[1] > grid.length) {
      // console.log("hit bottom edge");
      return null;
    }

    // Current letter found
    if (grid[currentPosition[0]][currentPosition[1]] == word[index]) {
      const down = findNext(
        grid,
        word,
        index + 1,
        [...snake, currentPosition],
        [currentPosition[0], currentPosition[1] + 1]
      );
      if (down) return down;

      const right = findNext(
        grid,
        word,
        index + 1,
        [...snake, currentPosition],
        [currentPosition[0] + 1, currentPosition[1]]
      );
      if (right) return right;
    }

    // Dead end
    // console.log("dead end");
    return null;
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const answer = findNext(grid, word, 0, [], [i, j]);
      if (answer) return answer;
    }
  }

  return [];
};

const grid1 = [
  ["b", "b", "b", "a", "l", "l", "o", "o"],
  ["b", "a", "c", "c", "e", "s", "c", "n"],
  ["a", "l", "t", "e", "w", "c", "e", "w"],
  ["a", "l", "o", "s", "s", "e", "c", "c"],
  ["w", "o", "o", "w", "a", "c", "a", "w"],
  ["i", "b", "w", "o", "w", "w", "o", "w"],
];
const word1_1 = "access"; // [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]

console.log(search(grid1, word1_1));
