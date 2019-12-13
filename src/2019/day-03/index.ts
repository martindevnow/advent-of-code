import { readFile } from '../../utils';

// EX1
// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
// EX2
// R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135
interface Point {
  x: number;
  y: number;
}
class Line {
  public originX: number;
  public originY: number;
  public termX: number;
  public termY: number;
  constructor(originX, originY, vector: string) {
    this.originX = originX;
    this.originY = originY;
    this.termX = originX;
    this.termY = originY;
    const direction = vector.charAt(0);
    const distance = parseInt(vector.slice(1));
    switch (direction) {
      case 'R':
        this.termX += distance;
        break;
      case 'L':
        this.termX -= distance;
        break;
      case 'U':
        this.termY -= distance;
        break;
      case 'D':
        this.termY += distance;
    }
    return this;
  }
  get isHorizontal() {
    return this.originY === this.termY;
  }
  get isVertical() {
    return !this.isHorizontal;
  }
  getIntersection(otherLine: Line): undefined | Point {
    if (this.isHorizontal && otherLine.isHorizontal) {
      // Parallel Horizontal Lines
      // console.log('parallel horiz');
      return undefined;
    }
    if (this.isVertical && otherLine.isVertical) {
      // Parallel Vertical Lines
      // console.log('parallel vert');
      return undefined;
    }
    if (this.isHorizontal) {
      // find if the `otherLine` crosses this.Y (term or origin)
      if (
        otherLine.originX < Math.min(this.originX, this.termX) ||
        otherLine.originX > Math.max(this.originX, this.termX)
      ) {
        // Other line is off to the side of THIS horizontal line .. no need to check further
        // console.log('the vert OTHERLINE is off to the L or R...');
        return undefined;
      }

      if (
        this.originY < Math.min(otherLine.originY, otherLine.termY) ||
        this.originY > Math.max(otherLine.originY, otherLine.termY)
      ) {
        // console.log('the vert OTHERLINE is off to the U or D...');
        return undefined;
      }

      return { x: otherLine.originX, y: this.originY };
    }

    if (this.isVertical) {
      // find if the `otherLine` crosses this.X (term or origin)
      if (
        otherLine.originY < Math.min(this.originY, this.termY) ||
        otherLine.originY > Math.max(this.originY, this.termY)
      ) {
        // Other line is off to the side of THIS horizontal line .. no need to check further
        // console.log('the horiz OTHERLINE is off to the U or D...');
        return undefined;
      }

      if (
        this.originX < Math.min(otherLine.originX, otherLine.termX) ||
        this.originX > Math.max(otherLine.originX, otherLine.termX)
      ) {
        // console.log('the horiz OTHERLINE is off to the L or R...');
        return undefined;
      }

      return { x: this.originX, y: otherLine.originY };
    }

    // console.log('default');
    return undefined;
  }
  get distance() {
    if (this.isVertical) {
      return Math.abs(this.originY - this.termY);
    }
    return Math.abs(this.originX - this.termX);
  }
  stepsToPoint(point: Point) {
    if (this.originX === point.x) {
      return Math.abs(this.originY - point.y);
    } else if (this.originY === point.y) {
      return Math.abs(this.originX - point.x);
    }
    throw new Error('That point is not on this Line');
  }
}

const lineFactory = (acc: Line[], curr: string) => {
  if (acc.length === 0) {
    return [new Line(0, 0, curr)];
  }
  // console.log(acc);
  return [
    ...acc,
    new Line(acc[acc.length - 1].termX, acc[acc.length - 1].termY, curr)
  ];
};

// const myCoords = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
// const myCoords2 = 'U62,R66,U55,R34,D71,R55,D58,R83';

// const myCoords = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
// const myCoords2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';

let data = readFile('../2019/day-03/data.txt').split(/\r?\n/);

const myCoords = data[0];
const myCoords2 = data[1];

const lines = myCoords.split(',').reduce(lineFactory, []);
const lines2 = myCoords2.split(',').reduce(lineFactory, []);

// console.log('Lines, ', lines);
// console.log('Lines2, ', lines2);

// TEST DATA
// Off to the side
// const testLine1 = new Line(0, 5, 'R5');
// const testLine2 = new Line(10, 6, 'D5');
// testLine1.getIntersection(testLine2);

// parallel horiz
// const testLine1 = new Line(0, 5, 'R5');
// const testLine2 = new Line(1, 6, 'R5');
// testLine1.getIntersection(testLine2);

// parallel vert
// const testLine1 = new Line(0, 5, 'D5');
// const testLine2 = new Line(1, 6, 'U5');
// testLine1.getIntersection(testLine2);

// const intersections: Point[] = [];
// lines.forEach(line => {
//   lines2.forEach(line2 => {
//     const intersect = line.getIntersection(line2);
//     if (intersect) {
//       intersections.push(intersect);
//     }
//   });
// });

// const findClosestPoint = (acc, curr) => {
//   const distance = Math.abs(curr.x) + Math.abs(curr.y);
//   if (!acc) {
//     return distance;
//   }
//   return acc > distance ? distance : acc;
// };

// // console.log(intersections);

// console.log(intersections.reduce(findClosestPoint, 0));

// lines.forEach(line => {
//   lines2.forEach(line2 => {
//     const intersect = line.getIntersection(line2);
//     if (intersect) {
//       intersections.push(intersect);
//     }
//   });
// });

// PART 2
const fewestSteps = lines.reduce(
  (acc, line) => {
    const closest = lines2.reduce(
      (acc2, line2) => {
        if (acc2.found) {
          // console.log(acc2);
          return acc2;
        }
        const intersect = line.getIntersection(line2);
        if (intersect) {
          return {
            found: true,
            line2stepsSoFar:
              acc2.line2stepsSoFar + line2.stepsToPoint(intersect),
            point: intersect
          };
        }
        return {
          ...acc2,
          line2stepsSoFar: acc2.line2stepsSoFar + line2.distance
        };
      },
      { found: false, line2stepsSoFar: 0, point: undefined }
    );

    // if no intersection found
    if (!closest.found) {
      return acc;
    }

    // get total distance for line 1 so far...
    const line1totalSteps =
      acc.line1StepsSoFar + line.stepsToPoint(closest.point);
    const totalStepsToIntersection = line1totalSteps + closest.line2stepsSoFar;
    if (acc.fewestSteps === 0 || acc.fewestSteps > totalStepsToIntersection) {
      // console.log({ closest });
      return {
        ...acc,
        line1StepsSoFar: acc.line1StepsSoFar + line.distance,
        fewestSteps: totalStepsToIntersection
      };
    }
    return {
      ...acc,
      line1StepsSoFar: acc.line1StepsSoFar + line.distance
    };
  },
  { line1StepsSoFar: 0, fewestSteps: 0 }
);

console.log({ fewestSteps });
