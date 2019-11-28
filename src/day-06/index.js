import * as utils from '../utils';

export const convertToPoint = (str, val) => {
  const e = str.split(', ');
  return {
    val: val,
    x: parseInt(e[0]),
    y: parseInt(e[1]),
    canBloom: true,
    hitEdge: false,
    totalArea: 1,
    bloomLevel: 0,
    grownThisCycle: 0
  };
};
console.log(convertToPoint('42, 145'));

// LOAD DATA
const data = utils
  .readFile('../day-06/data.txt')
  .split(/\r?\n/)
  .slice(0, 10)
  .map(convertToPoint);

export const getMaxXAndY = pointsArray => {
  return pointsArray.reduce((acc, curr) => {
    if (curr.x > acc) {
      acc = curr.x;
    }
    if (curr.y > acc) {
      acc = curr.y;
    }
    return acc;
  }, 0);
};
console.log(getMaxXAndY(['12, 10', '100, 50', '1, 101'].map(convertToPoint)));

export const getMatrixFromMaxVal = max => {
  return new Array(max).fill('').map(_ => new Array(max).fill('.'));
};

const dimensions = getMaxXAndY(data);
const matrix = getMatrixFromMaxVal(dimensions);

export const getGrowthCoords = point => {
  const minX = point.x - (point.bloomLevel + 1);
  const maxX = point.x + (point.bloomLevel + 1);
  const minY = point.y - (point.bloomLevel + 1);
  const maxY = point.y + (point.bloomLevel + 1);
  const points = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      points.push({ x, y });
    }
  }
  return points;
};

// Legend
// . = available space
// # = that plant has rooted
// #-seed = that plant WANTS to spread
// X = this area is over crowded, nothing can grow

const bloom = point => {
  if (!point.canBloom) {
    return;
  }
  const growthPoints = getGrowthCoords(point);
  growthPoints.forEach(coord => {
    if (matrix[x] === undefined || matrix[x][y] === undefined) {
      // Hit the edge, don't grow here
      point.hitEdge = true;
    } else if (matrix[x][y] === '.') {
      // Safe to Grow
      matrix[x][y] = point.val + '-seed';
      point.grownThisCycle++;
      point.totalArea++;
    } else if (
      typeof matrix[x][y] === 'string' &&
      matrix[x][y].includes('seed')
    ) {
      // Overgrowing someone else seed
      // Reduce the area and grownThisCycle of the point overlapped
      const otherPointIndex = parseInt(matrix[x][y].split('-')[0]);
      data[otherPointIndex].grownThisCycle--;
      data[otherPointIndex].totalArea--;
      // Update the map to show conflict zone
      matrix[x][y] = 'X';
    } else if (matrix[x][y] === 'X') {
      // conflict zone
      return;
    }
  });
};

const growSeeds = matrixMap => {
  return matrixMap.map(row => {
    row.map(cell => {
      if (typeof cell === 'string' && cell.includes('seed')) {
        return parseInt(cell.split('-')[0]);
      }
    });
  });
};
