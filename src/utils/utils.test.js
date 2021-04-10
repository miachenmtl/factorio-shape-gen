import { getBlueprint, getBlueprintString } from './getBlueprintString';
import { sortPoints, getLinearEquation, getIntermediatePoints, getNextBatchOfPoints } from './interpolatePoints';

describe('The getBlueprint sub-util', () => {
  it('takes a tile name and an array of one coordinate and returns a blueprint object', () => {
    const tilename = 'stone_path';
    const coordinate = [1, 2];
    const blueprint = getBlueprint(tilename, [coordinate]);
    const actualTile =  blueprint.findTile({ x: 1, y: 2 });
    expect(actualTile.name).toBe(tilename);
    const actualEmptyPosition =  blueprint.findTile({ x: 0, y: 0 });
    expect(actualEmptyPosition).toBeNull();
  });
  it('takes a tile name and an array of several coordinates and returns a blueprint object', () => {
    const tilename = 'stone_path';
    const coordA = [1, 0];
    const coordB = [1, 1];
    const coordC = [1, 2];

    const blueprint = getBlueprint(tilename, [coordA, coordB, coordC]);
    const actualTileA =  blueprint.findTile({ x: 1, y: 0 });
    expect(actualTileA.name).toBe(tilename);
    const actualTileC =  blueprint.findTile({ x: 1, y: 2 });
    expect(actualTileC.name).toBe(tilename);
    const actualEmptyPosition =  blueprint.findTile({ x: 0, y: 0 });
    expect(actualEmptyPosition).toBeNull();
  });
});

describe('The getBlueprintString util', () => {
  it('takes a tile name and an array of one coordinate and returns a blueprint object', () => {
    const expectedString = '0eJxFjDEKwzAQBP+ytQxOyiv9DZNCNgc+kE/CugQHob9HSmF3szCzBUt4czpEDVQga9QMml8OJoE7FqjfGYRsUXlI3jY4pJjFJGqPTtDD4Qt61tpCMd6bfv86fPjIfxljW8EvHBpPl1HrDzylLUM=';
    const tilename = 'stone_path';
    const coordinate = [1, 2];
    const blueprintString = getBlueprintString(tilename, [coordinate]);
    expect(blueprintString).toBe(expectedString);
  });
});

describe('The sortPoints sub-util', () => {
  it('takes two points and orders them from left to right', () => {
    const sortedPoints = [[-2, 4], [3, 2]];
    const reversedPoints = [[3, 2], [-2, 4]];
    const actualSorted = sortPoints(sortedPoints);
    const actualReversed = sortPoints(reversedPoints);
    expect(actualSorted).toEqual(sortedPoints);
    expect(actualReversed).toEqual(actualSorted);
  });

  it('returns a null if the points have the same x-value', () => {
    const points = [[3, 5], [3, 6]];
    const actual = sortPoints(points);
    expect(actual).toBeNull();
  });
});

describe('The getLinearEquation sub-util', () => {
  it('takes two Cartesian points and returns the y-intercept and slope for the connecting line', () => {
    const pointA = [2, 4];
    const pointB = [9, 3];
    const expectedYInt = 4.285714285714286;
    const expectedSlope = -0.14285714285714285;
    const { slope, yIntercept } = getLinearEquation(pointA, pointB);
    expect(slope).toBeCloseTo(expectedSlope);
    expect(yIntercept).toBeCloseTo(expectedYInt);
  });
});

describe('The getNextBatchOfPoints sub-util', () => {
  it('takes a slope and start point and returns the integer points between x0 and x0 + 1', () => {
    // does not include start point, includes end point
    const startPoint = [2, -2.2];
    const slope = 4.6;
    const nextPoints = getNextBatchOfPoints(startPoint, slope);
    expect(nextPoints).toEqual([[2, -1], [2, 0], [3, 1], [3, 2]]);
  });
  it('handles negative slopes too', () => {
    const startPoint = [2, -2.2];
    const slope = -3.6;
    const nextPoints = getNextBatchOfPoints(startPoint, slope);
    expect(nextPoints).toEqual([[2, -3], [2, -4], [3, -5], [3, -6]])
  });
});

// It takes two Cartesian points (not necessarily integers) and returns the intermediate integer points
// the start point is not included but the end point is

describe('The getIntermediatePoints util', () => {
  it('takes two points that are close to the same lattice point and returns an empty array', () => {
    const pointA = [0.1, 0.2];
    const pointB = [0.2, 0.3]; // NB: negative values may not pass test because 0 !== -0 in toEqual
    const expectedPoints = [];
    const actual = getIntermediatePoints(pointA, pointB);
    expect(actual).toEqual(expectedPoints);
  });

  it('takes two Cartesian endpoints with slope = 0 and returns the intermediate integer points', () => {
    const pointA = [1, 1];
    const pointB = [4, 1];
    const expectedPoints = [[2, 1], [3, 1], [4, 1]];
    const actual = getIntermediatePoints(pointA, pointB);
    expect(actual).toEqual(expectedPoints);
  });

  it('takes two Cartesian endpoints with 0 < slope < 1 and returns the array of integer points in between closest to linear interpolation and includes end point', () => {
    const pointA = [0, 0];
    const pointB = [4, 2];
    // for int x, round to closest y 
    const expectedPoints = [[1, 1], [2, 1], [3, 2], [4, 2]];
    const actual = getIntermediatePoints(pointA, pointB);
    expect(actual).toEqual(expectedPoints);
  });

  it('takes two Cartesian endpoints with slope = 1 and returns an array of integer points for a linear interpolation', () => {
    const pointA = [2, 1];
    const pointB = [4, 3];
    const expectedPoints = [[3, 2], [4, 3]];
    const actual = getIntermediatePoints(pointA, pointB);
    expect(actual).toEqual(expectedPoints);
  });

  it('takes two Cartesian endpoints with 1 < slope < infinity and returns an array of integer points for a linear interpolation', () => {
    const pointA = [2, -1];
    const pointB = [4, 3];
    const expectedPoints = [[2, 0], [3, 1], [3, 2], [4, 3]];
    const actual = getIntermediatePoints(pointA, pointB);
    expect(actual).toEqual(expectedPoints);
  });

  it('takes two Cartesian endpoints with slope = infinity and returns an array of the lattice pointinteger points for a linear interpolation', () => {
    const pointA = [2, -1];
    const pointB = [2, 3];
    const expectedPoints = [[2, 0], [2, 1], [2, 2], [2, 3]];
    const actual = getIntermediatePoints(pointA, pointB);
    expect(actual).toEqual(expectedPoints);
  });

  it('can handle negative non-integers and negative slopes going from right to left', () => {
    const pointA = [3.1, -2.5];
    const pointB = [-1.9, 1.3];
    const expectedPoints = [[2, -2], [1, -1], [0, -0], [-1, 1], [-2, 1]]
    const actual = getIntermediatePoints(pointA, pointB);
    expect(actual).toEqual(expectedPoints); 
  });
});