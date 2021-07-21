// Called by getIntermediatePoints
function sortPoints([pointA, pointB]) {
  const deltaX = Math.round(pointB[0]) - Math.round(pointA[0]);
  if (deltaX === 0) return null;
  return deltaX > 0 ? [pointA, pointB] : [pointB, pointA];
}

// Called by getIntermediatePoints to handle edge case
// the start point is not included but the end point is (if it's different)
function getVerticalPoints([x, y], height) {
  const [roundedX, roundedY] = [x, y].map(el => Math.round(el));
  const sign = height >= 0 ? 1 : -1;
  // console.log(`(x, y)(${x}, ${y}) height=${height}`)
  return Array(Math.abs(height)).fill(0).map(
    (_, i) => [roundedX, roundedY + sign * (1 + i)]
  );
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
    // there are point(s) in between startY and endY, get them, add endpoint after
    // increment y value for positive slopes, decrement for negative slopes
    for (
      let currentY = roundedStartY + slopeSign;
      currentY !== roundedEndY;
      currentY += slopeSign
    ) {
      // first half of points have x=x0, second half have x=x0+1
      let xValue = x0;
      if (Math.abs(currentY - roundedStartY) / roundedHeight > 0.5) {
        xValue += 1;
      }
      nextBatchOfPoints.push([xValue, currentY]);
    }
  }

  // add endpoint
  nextBatchOfPoints.push([x0 + 1, roundedEndY]);

  return nextBatchOfPoints;
}

// called by getIntermediatePoints to truncate the beginning of a batch of points
function checkIfBefore([x, y], [startX, startY], slopeSign) {
  const deltaX = x - startX;
  const deltaY = slopeSign * (y - startY)
  return (deltaX > 0) || (deltaY > 0); // must be positive, start point not included
}

// called by getIntermediatePoints to truncate the end of a batch of points
function checkIfAfter([x, y], [stopX, stopY], slopeSign) {  
  const deltaX = stopX - x;
  const deltaY = slopeSign * (stopY - y);

  return (deltaX >= 0) && (deltaY >= 0); // can include end point
}


// The main function
// It takes two Cartesian points (not necessarily integers) and returns the intermediate integer points
// the start point is not included but the end point is
function getIntermediatePoints(firstPoint, secondPoint) {
  // to make iterating simpler, sort points by increasing x, and reverse and adjust at end if swapped
  const sortedEndPoints = sortPoints([firstPoint, secondPoint]);
  let intermediatePoints = []; // integer coordinates to be returned, after truncating

  // vertical line / single point case
  if (!sortedEndPoints) {
    // NB: heights can be negative
    const height = Math.round(secondPoint[1]) - Math.round(firstPoint[1]);
    const verticalPoints = getVerticalPoints(firstPoint, height)
    intermediatePoints.push(...verticalPoints);

    return intermediatePoints;
  }
  // general case with finite slope:
  // start currentX at floor of x0, get y value
  // add 1 to currentX and slope to currentY
  // stop at ceiling of x1
  // trim beginning and end
  // reverse and adjust if points were swapped when sorted
  const [[x0, y0], [x1, y1]] = sortedEndPoints;
  const { slope, yIntercept } = getLinearEquation([x0, y0], [x1, y1]);
  const slopeSign = slope >= 0 ? 1: -1;

  const startX = Math.floor(x0);
  const startY = slope * startX + yIntercept;
  let currentY = startY;

  const [
    lineStartX,
    lineStopX,
    lineStartY,
    lineStopY
  ] = [x0, x1, y0, y1].map(Math.round);

  const stopX = Math.ceil(x1);
  // const stopY = slope * stopX + yIntercept;

  for (let currentX = startX; currentX < stopX; currentX += 1) {
    // one batch of points for every increment of x value
    const nextPoints = getNextBatchOfPoints([currentX, currentY], slope);
    intermediatePoints.push(...nextPoints);
    currentY += slope;
  }

  // truncate beginning points if before line start
  intermediatePoints = intermediatePoints.filter(
    point => checkIfBefore(point, [lineStartX, lineStartY], slopeSign)
  );
  // console.log(`post trim start: ${intermediatePoints}`);

  // truncate end if after line stop
  intermediatePoints = intermediatePoints.filter(
    point => checkIfAfter(point, [lineStopX, lineStopY], slopeSign)
  );

  // in some cases, the end point is skipped in intermediatePoints, so add it here
  // e.g. (16.4056437317593, 18.8641155039557) (17.8525399774187, 17.5010518642356)
  const lastPoint = intermediatePoints.slice(-1)[0];
  if ((lastPoint[0] !== lineStopX) || (lastPoint[1] !== lineStopY)) {
    intermediatePoints.push([lineStopX, lineStopY]);
  }

  // reverse and switch start and end points if points were swapped when sorted
  if (firstPoint[0] !== x0 && firstPoint[1] !== y0 && intermediatePoints.length > 0) {
    // drop last element that is actually the start point, then reverse and add actual end point
    intermediatePoints.pop();
    intermediatePoints.reverse();
    intermediatePoints.push([lineStartX, lineStartY]);
  }

  return intermediatePoints;
}

export { sortPoints, getIntermediatePoints, getLinearEquation, getNextBatchOfPoints };
