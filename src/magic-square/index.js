const getMatrix = dim =>
  new Array(dim).fill('').map(_ => new Array(dim).fill(0));

const buildMagicSquare = dim => {
  const matrix = getMatrix(dim);
  let currX = Math.floor(dim / 2); // 5 / 2 => 2.5 => 2;
  let currY = 0;
  let newX, newY;
  matrix[currY][currX] = 1;
  for (let i = 2; i <= dim * dim; i++) {
    if (currX === dim - 1 && currY === 0) {
      newX = currX;
      newY = 1;
    } else {
      newX = (currX + 1) % dim;
      newY = currY - 1 < 0 ? dim - 1 : currY - 1;
    }
    if (matrix[newY][newX] !== 0) {
      newX = currX;
      newY = currY + 1;
    }
    matrix[newY][newX] = i;
    currX = newX;
    currY = newY;
  }
  return matrix;
};

const magicSquare = buildMagicSquare(5);
