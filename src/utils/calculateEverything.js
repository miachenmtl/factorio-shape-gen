import { getVertices } from './getVertices';
import { getIntermediatePoints } from './getIntermediatePoints';
import { getCirclePoints } from './getCirclePoints';
import { getBlueprintString } from './getBlueprintString';

function calculateEverything(shape, numberOfSides, radius, tile) {
  let points = [];

  if (shape === 'CIRCLE') {
    points = getCirclePoints(radius);
  } else if (shape === 'POLYGON') {
    const vertices = getVertices(radius, numberOfSides);
    const polygonPoints = [];
    console.log(vertices);
    for (let i = 0; i < numberOfSides; i += 1) {
      const newPoints = getIntermediatePoints(vertices[i], vertices[i + 1]);
      polygonPoints.push(...newPoints);
    }
    points = polygonPoints;
  }

  const blueprintString = getBlueprintString(tile, points);
  return blueprintString;
}

export default calculateEverything;
