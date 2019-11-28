import { getGrowthCoords } from '../src/day-06';

describe('getGrowthCoords', () => {
  it('finds the coords around a point with bloom level 1', () => {
    const point = {
      x: 5,
      y: 5,
      canBloom: true,
      bloomLevel: 0
    };

    const actual = getGrowthCoords(point);
    console.log(actual);
    expect(actual).toEqual([
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 4, y: 6 },
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 6, y: 4 },
      { x: 6, y: 5 },
      { x: 6, y: 6 }
    ]);
  });
});
