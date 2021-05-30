import { getNumberOfSides, getAngles, getVertices } from './getVertices';

describe('The getNumberOfSides util', () => {
  it('calculates the number of sides needed for an n-gon of given radius to approximate a circle', () => {
    const radius = 20;
    const expectedNumberOfSides = 63;
    const actual = getNumberOfSides(radius);
    expect(actual).toBe(expectedNumberOfSides);
  });
});

describe('The getAngles sub-util', () => {
  it('calculates the initial angle and the angle increment for an n-gon', () => {
    // bottom side should be horizontal, so initial angle starts in third quadrant
    const numberOfSides = 4;
    const expectedAngleIncrement = 0.5 * Math.PI;
    const expectedInitialAngle = 1.5 * Math.PI - 0.5 * expectedAngleIncrement;
    const { initialAngle, angleIncrement } = getAngles(numberOfSides);
    expect(initialAngle).toBeCloseTo(expectedInitialAngle);
    expect(angleIncrement).toBeCloseTo(expectedAngleIncrement);
  });
});

describe('The getVertices sub-util', () => {
  it('takes a radius and number of sides and returns an array of vertex coordinates', () => {
    // initial point is included at both beginning and end
    const radius = 20;
    const numberOfSides = 4;
    const expectedVertices = [
      [ -14.142135623730955, -14.14213562373095 ],
      [ 14.142135623730947, -14.142135623730955 ],
      [ 14.142135623730955, 14.142135623730947 ],
      [ -14.142135623730933, 14.142135623730967 ],
      [ -14.142135623730942, -14.142135623730958 ]
    ];
    const actual = getVertices(radius, numberOfSides);
    expect(actual).toHaveLength(5);
    actual.forEach(
      (vertex, i) => {
        expect(vertex[0]).toBeCloseTo(expectedVertices[i][0]);
        expect(vertex[1]).toBeCloseTo(expectedVertices[i][1]);
      }
    )
  });
});