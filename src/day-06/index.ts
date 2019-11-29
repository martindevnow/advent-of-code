import { readFile } from '../utils';

interface ISeed {
  val: number;
  x: number;
  y: number;
  canBloom: boolean;
  hitEdge: boolean;
  totalArea: number;
  bloomLevel: number;
  grownThisCycle: number;
}

// PURE FUNCTIONS
export const convertToPoint = (str: string, val: number): ISeed => {
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

export const getMaxXAndY = (pointsArray: ISeed[]) => {
  return pointsArray.reduce((acc: number, curr: ISeed) => {
    const { x, y } = curr;
    return Math.max(x, y, acc) + 1;
  }, 0);
};

export const getMatrixFromMaxVal = (
  max: number
): Array<Array<string | number>> => {
  return (new Array(max) as Array<any>)
    .fill('')
    .map(_ => (new Array(max) as Array<any>).fill('.'));
};

interface ICoords {
  x: number;
  y: number;
}
export const getGrowthCoords = (point: ISeed): ICoords[] => {
  const minX = point.x - (point.bloomLevel + 1);
  const maxX = point.x + (point.bloomLevel + 1);
  const minY = point.y - (point.bloomLevel + 1);
  const maxY = point.y + (point.bloomLevel + 1);
  const points: ICoords[] = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      points.push({ x, y });
    }
  }
  return points;
};

export const matrixToString = (
  _matrix: Array<Array<string | number>>
): String => {
  if (!_matrix) {
    return '_matrix is falsy';
  }
  if (!_matrix[0]) {
    return 'matrix[0] is falsy';
  }
  if (!Array.isArray(_matrix[0])) {
    return 'matrix[0] is not arra';
  }
  return '\n\n' + _matrix.map(row => row && row.join('')).join('\n');
};

const growSeeds = (_matrix: Array<Array<string | number>>) => {
  return _matrix.map(row => {
    return row.map(cell => {
      if (typeof cell === 'string' && (cell as any).includes('seed')) {
        return parseInt(cell.split('-')[0]);
      }
      return cell;
    });
  });
};

export const increaseBloomLevel = (point: ISeed): ISeed => ({
  ...point,
  bloomLevel: point.bloomLevel + 1,
  grownThisCycle: 0,
  canBloom: point.canBloom && !!point.grownThisCycle
});

// IMPURE FUNCTIONS

// console.log(convertToPoint('42, 145', 0));

// LOAD DATA
let data = readFile('../day-06/data.txt')
  .split(/\r?\n/)
  // .slice(0, 10)
  .map(convertToPoint);

// let data = `2, 2
// 4, 4
// 0, 0
// 10, 10
// 10, 0
// 0, 10`
//   .split(/\r?\n/)
//   .map(convertToPoint);

// console.log(getMaxXAndY(['12, 10', '100, 50', '1, 101'].map(convertToPoint)));

const dimensions = getMaxXAndY(data);
let matrix = getMatrixFromMaxVal(dimensions);

// Legend
// . = available space
// # = that plant has rooted
// #-seed = that plant WANTS to spread
// X = this area is over crowded, nothing can grow
const bloomMatrix = (
  _matrix: Array<Array<string | number>>,
  _data: ISeed[]
): [Array<Array<string | number>>, ISeed[]] => {
  const bloom = (point: ISeed) => {
    if (!point.canBloom) {
      return;
    }
    const growthPoints = getGrowthCoords(point);
    growthPoints.forEach(coord => {
      const { x, y } = coord;

      if (_matrix[x] === undefined || _matrix[x][y] === undefined) {
        // Hit the edge, don't grow here
        point.hitEdge = true;
      } else if (_matrix[x][y] === '.') {
        // Safe to Grow
        _matrix[x][y] = point.val + '-seed';
        point.grownThisCycle++;
        point.totalArea++;
      } else if (
        typeof _matrix[x][y] === 'string' &&
        (_matrix[x][y] as any).includes('seed')
      ) {
        // Overgrowing someone else seed
        // Reduce the area and grownThisCycle of the point overlapped
        const otherPointIndex = parseInt((_matrix[x][y] as any).split('-')[0]);
        _data[otherPointIndex].grownThisCycle--;
        _data[otherPointIndex].totalArea--;
        // Update the map to show conflict zone
        _matrix[x][y] = 'X';
      } else if (_matrix[x][y] === 'X') {
        // conflict zone
        return;
      }
    });
  };

  _data.forEach(bloom);
  _matrix = growSeeds(_matrix);

  return [_matrix, _data];
};

const plantSeeds = (point: ISeed) => {
  const { x, y, val } = point;
  matrix[x][y] = val;
};

data.forEach(plantSeeds);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);
// console.log(matrixToString(matrix));

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

data = data.map(increaseBloomLevel);
[matrix, data] = bloomMatrix(matrix, data);

console.log(matrixToString(matrix));

console.log(
  data
    .filter((point: ISeed) => {
      return point.hitEdge === false;
    })
    .reduce((acc: null | ISeed, curr: ISeed): ISeed | null => {
      if (!acc) {
        return curr;
      }
      if (curr.totalArea > acc.totalArea) {
        return curr;
      }

      return acc;
    }, null)
);
