import { getCirclePoints } from "./getCirclePoints";

describe('The getCirclePoints util', () => {
  it('returns the integer coordinates for a circle of given radius', () => {
    const radius = 10;
    const expectedPoints = [[0, 10], [1, 10], [2, 10], [3, 9], [4, 9],
      [5, 8], [6, 8], [7, 7], [8, 6], [9, 4], [10, 2], [10, 0], [10, 1], [9, 3],
      [8, 5], [0, 10], [-1, 10], [-2, 10], [-3, 9], [-4, 9], [-5, 8], [-6, 8],
      [-7, 7], [-8, 6], [-9, 4], [-10, 2], [-10, 0], [-10, 1], [-9, 3], [-8, 5],
      [0, -10], [-1, -10], [-2, -10], [-3, -9], [-4, -9], [-5, -8], [-6, -8],
      [-7, -7], [-8, -6], [-9, -4], [-10, -2], [-10, 0], [-10, -1], [-9, -3],
      [-8, -5], [0, -10], [1, -10], [2, -10], [3, -9], [4, -9], [5, -8], [6, -8],
      [7, -7], [8, -6], [9, -4], [10, -2], [10, 0], [10, -1], [9, -3], [8, -5]];
    const expectedPointSet = new Set(expectedPoints.map(JSON.stringify));
    const actualPoints = getCirclePoints(radius);
    const actualPointSet = new Set(actualPoints.map(JSON.stringify));

    expect(actualPointSet).toEqual(expectedPointSet);
  });
});
