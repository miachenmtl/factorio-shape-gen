// "circles" will be n-gons with n chosen so that each side has a length of about 2
function getNumberOfSides(radius) {
  const targetSideLength = 2;
  const circumference = 2 * Math.PI * radius;
  return Math.round(circumference / targetSideLength);
}

function getAngles(numberOfSides) {
  const angleIncrement =  2 * Math.PI / numberOfSides;
  // the bottom side should be horizontal, so the first vertex will be 270 degrees - 1/2 the slice angle
  const initialAngle = 1.5 * Math.PI - 0.5 * angleIncrement;
  return { initialAngle, angleIncrement };
}

function getVertices(radius, numberOfSides) {
  const { initialAngle, angleIncrement } = getAngles(numberOfSides);
  // put initialVertex at both beginning and end for ease of calculation
  const vertices = Array(numberOfSides + 1).fill(null).map(
    (_, i) => [
      radius * Math.cos(initialAngle + i * angleIncrement),
      radius * Math.sin(initialAngle + i * angleIncrement)
    ]
  );
  return vertices;
}

export { getNumberOfSides, getAngles, getVertices };