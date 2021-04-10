// Called by getIntermediatePoints
function sortPoints([pointA, pointB]) {
  const deltaX = Math.round(pointB[0]) - Math.round(pointA[0]);
  if (deltaX === 0) return null;
  return deltaX > 0 ? [pointA, pointB] : [pointB, pointA];
}

// Called by getIntermediatePoints to handle edge case
// the start point is not included but the end point is (if it's different)
function getVerticalPoints([x, y], height) {
  const [roundedX, roundedY] = [x, y].map(el => Math.round(el))
  return Array(height).fill(0).map(
    (_, i) => [roundedX, roundedY + 1 + i]
  )
}

// called by getNextBatchOfPoints for non-infinite slopes
function getLinearEquation(pointA, pointB) {
  // y = mx + b
  // b = y_0 - mx_0
  const deltaX = pointB[0] - pointA[0];
  const deltaY = pointB[1] - pointA[1];
  const slope = deltaY / deltaX;
  const yIntercept = pointA[1] - slope * pointA[0];
  return { slope, yIntercept };
}

// iterated in getIntermediatePoints for each increment of the x value
// the start point is not included but the end point is
function getNextBatchOfPoints([x0, y0], slope) {
  const slopeSign = slope >= 0 ? 1: -1;
  const roundedStartY = Math.round(y0);
  const roundedEndY = Math.round(y0 + slope);
  const roundedHeight = Math.abs(roundedEndY - roundedStartY);

  // points to be returned
  const nextBatchOfPoints = [];

  if (roundedHeight !== 0) {
    // there are points in between, get them
    // increment y value for positive slopes, decrement for negative slopes
    for (let i = roundedStartY + slopeSign; i !== roundedEndY; i += slopeSign) {
      // first half of points have x=x0, second half have x=x0+1
      let xValue = x0;
      if (Math.abs(i - roundedStartY) / roundedHeight > 0.5) {
        xValue += 1;
      }
      nextBatchOfPoints.push([xValue, i]);
    }
  }

  nextBatchOfPoints.push([x0 + 1, roundedEndY]);
  return nextBatchOfPoints;
}

// The main function
// It takes two Cartesian points (not necessarily integers) and returns the intermediate integer points
// the start point is not included but the end point is
function getIntermediatePoints(firstPoint, secondPoint) {
  // to make iterating simpler, sort points by increasing x, and reverse and adjust at end if swapped
  const sortedEndPoints = sortPoints([firstPoint, secondPoint]);
  const intermediatePoints = []; // integer coordinates to be returned

  if (!sortedEndPoints) {
    // vertical line / single point case
    const height = Math.round(secondPoint[1]) - Math.round(firstPoint[1]);
    const startingPoint = height > 0 ? firstPoint : secondPoint;
    const verticalPoints = getVerticalPoints(startingPoint, height)
    intermediatePoints.push(...verticalPoints);
  } else {
    // non-pathological lines
    // start at integer closest to x0, get y value, add 1 to currentX and slope to currentY
    const [[x0, y0], [x1, y1]] = sortedEndPoints;
    const { slope, yIntercept } = getLinearEquation([x0, y0], [x1, y1]);

    const startX = Math.round(x0);
    const stopX = Math.round(x1);                                                                                
    let currentY = slope * startX + yIntercept;

    for (let currentX = startX; currentX < stopX; currentX += 1) {
      const nextPoints = getNextBatchOfPoints([currentX, currentY], slope)
      intermediatePoints.push(...nextPoints);
      currentY += slope;
    }

    // hacky reverse and switching of start and end points if points were swapped when sorted
    if (firstPoint[0] !== x0 && firstPoint[1] !== y0) {
      // eliminate last element that is actually the start point, then reverse and add actual end point
      intermediatePoints.pop();
      intermediatePoints.reverse();
      const endPoint = [Math.round(x0), Math.round(y0)];
      intermediatePoints.push(endPoint);
    }
  }
  return intermediatePoints;
}

export { sortPoints, getIntermediatePoints, getLinearEquation, getNextBatchOfPoints };
